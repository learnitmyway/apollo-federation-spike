import { gql } from 'apollo-server'

const typeDefs = gql`
  extend type Movie @key(fields: "id") {
    id: ID! @external
  }

  type UISettings {
    auth: Auth
    releaseToggles: ReleaseToggles
    movie(id: ID!): Movie
  }

  type Auth {
    audience: String
    clientId: String
    domain: String
  }

  type ReleaseToggles {
    example: Boolean
  }

  type Query {
    uiSettings: UISettings!
  }
`

export default typeDefs
