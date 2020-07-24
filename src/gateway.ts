import { ApolloServer } from 'apollo-server'
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request: req, context }: any): any {
    const authorization = context?.authorization
    req.http.headers.set('authorization', authorization)
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'movies', url: 'http://localhost:4001' },
    { name: 'ui-settings', url: 'http://localhost:4002' },
  ],
  buildService({ name, url }): any {
    return new AuthenticatedDataSource({ url })
  },
})

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
  context: ({ req }) => {
    return { authorization: req.headers.authorization }
  },
})

const port = process.env.PORT || 4000

server.listen({ port }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`)
})
