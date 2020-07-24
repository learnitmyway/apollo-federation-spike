import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server'
import resolvers from '../movies/resolvers'
import typeDefs from '../movies/typeDefs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function testServer(dataSources: any): ApolloServerTestClient {
  return createTestClient(
    new ApolloServer({ typeDefs, resolvers, dataSources })
  )
}
