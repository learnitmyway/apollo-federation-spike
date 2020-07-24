import { Movie, Context } from './types'

const resolvers = {
  Query: {
    movies: (
      _: unknown,
      __: unknown,
      { dataSources }: Context
    ): Promise<Movie[]> => dataSources.moviesAPI.getMovies(),
    movie: (
      _: unknown,
      { id }: any,
      { dataSources }: Context
    ): Promise<Movie> => dataSources.moviesAPI.getMovieById(id),
  },
  Movie: {
    __resolveReference({ id }: any, { dataSources }: any): Promise<Movie> {
      return dataSources.moviesAPI.getMovieById(id)
    },
  },
}

export default resolvers
