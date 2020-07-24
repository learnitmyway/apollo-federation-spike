import { ApolloServer } from 'apollo-server-lambda'
import resolvers from './movies/resolvers'
import typeDefs from './movies/typeDefs'
import dataSources from './movies/dataSources'
import context from './context'

const server = new ApolloServer({ typeDefs, resolvers, context, dataSources })

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})
