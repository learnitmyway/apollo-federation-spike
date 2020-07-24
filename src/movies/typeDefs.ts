import { gql } from 'apollo-server'

const typeDefs = gql`
  type Movie @key(fields: "id") {
    id: ID!
    title: String!
    rating: String!
  }

  type Query {
    movies: [Movie]!
    movie(id: ID!): Movie
    moviesByTerm(term: String!): [Movie]!
  }

  input NewMovie {
    title: String!
    rating: String!
  }

  type NewMovieResponse {
    movies: [Movie]!
  }

  type Mutation {
    createMovie(newMovie: NewMovie!): NewMovieResponse!
  }
`

export default typeDefs
