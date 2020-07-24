import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const context = async ({ req }: any): Promise<{ token: string }> => {
  const token = req.headers.authorization || ''
  console.log('token: ', token)
  return { token }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context,
})

const port = process.env.PORT || 4002

server.listen({ port }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`)
})
