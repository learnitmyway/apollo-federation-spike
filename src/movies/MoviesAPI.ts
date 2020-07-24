import { RESTDataSource } from 'apollo-datasource-rest'
import {
  Body,
  RequestOptions,
} from 'apollo-datasource-rest/dist/RESTDataSource'
import { NewMovie, Movie } from './types'

const moviesSample = [
  {
    id: '1',
    title: 'The quick yellow',
    rating: '4',
  },
  {
    id: '2',
    title: 'The quick pink',
    rating: '5',
  },
]

export default class MoviesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:5200/'
  }

  /******** Start: temporary local setup ************/
  /* eslint-disable */

  async get(path: string, params?: { id: string }): Promise<any> {
    // super.get(path, params)
    if (params?.id) {
      return moviesSample.find((movie) => movie.id === params.id)
    }
    return moviesSample as any
  }

  async post(path: string, body?: Body): Promise<any> {
    // super.post(path, body)
    const lastId = moviesSample[moviesSample.length - 1].id
    const { title, rating } = body as NewMovie
    moviesSample.push({ id: lastId + 'a', title, rating })
    return moviesSample
  }

  /* eslint-enable */
  /******** End: temporary local setup ************/

  async getMovies(): Promise<Movie[]> {
    // throw new Error('weeeeeeeee')
    return this.get('movies')
  }

  async getMovieById(id: string): Promise<Movie> {
    return this.get('movie', { id })
  }

  async createMovie(movie: NewMovie): Promise<Movie[]> {
    return this.post('movies', movie)
  }

  willSendRequest(request: RequestOptions): void {
    request.headers.set('Authorization', this.context.token)
  }
}
