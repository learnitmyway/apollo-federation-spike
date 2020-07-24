provider "aws" {
  region = "us-east-1"
}

resource "aws_lambda_function" "my_movies_prod" {
  function_name = "MyMoviesGraphqlProd"

  s3_bucket = "my-movies-graphql-prod"
  s3_key    = "function.zip"

  handler = "built/graphql.handler"
  runtime = "nodejs12.x"

  role = aws_iam_role.lambda_exec.arn
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "my_movies_prod_graphql_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

resource "aws_api_gateway_rest_api" "my_movies_prod" {
  name        = "MyMoviesGraphqlProd"
  description = "My Movies GraphQL Production"
}

# all routes (except root) 
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.my_movies_prod.id
  parent_id   = aws_api_gateway_rest_api.my_movies_prod.root_resource_id
  path_part   = "{proxy+}"
}

# all methods for all resources (except root)
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.my_movies_prod.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

# forward requests to my_movies_prod lambda
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.my_movies_prod.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.my_movies_prod.invoke_arn
}

# all methods for root route
resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.my_movies_prod.id
  resource_id   = aws_api_gateway_rest_api.my_movies_prod.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

# forward root requests to my_movies_prod lambda
resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.my_movies_prod.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.my_movies_prod.invoke_arn
}

resource "aws_api_gateway_deployment" "my_movies_prod" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]

  rest_api_id = aws_api_gateway_rest_api.my_movies_prod.id
  stage_name  = "prod"
}

# give gateway permission to invoke lambda
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.my_movies_prod.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.my_movies_prod.execution_arn}/*/*"
}

output "base_url" {
  value = aws_api_gateway_deployment.my_movies_prod.invoke_url
}

module "api-gateway-enable-cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.1"
  api_id          = aws_api_gateway_rest_api.my_movies_prod.id
  api_resource_id = aws_api_gateway_rest_api.my_movies_prod.root_resource_id
}