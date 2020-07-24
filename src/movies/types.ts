import MoviesAPI from './MoviesAPI'

export interface ReleaseToggles {
  [index: string]: boolean
}

export interface UISettings {
  auth: {
    audience?: string
    clientId?: string
    domain?: string
  }
  releaseToggles: ReleaseToggles
}

export interface Movie {
  id: string
  title: string
  rating: string
}

export interface MovieById {
  id: string
}

export interface NewMovie {
  title: string
  rating: string
}

export interface CreateMovieResponse {
  movies: Promise<Movie[]>
}

export interface DataSources {
  moviesAPI: MoviesAPI
}

export interface Context {
  dataSources: DataSources
}
