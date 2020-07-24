import { Movie } from '../movies/types'

export function moviesSample(): Movie[] {
  return [
    {
      id: '1',
      title: 'The quick blue',
      rating: '1',
    },
    {
      id: '2',
      title: 'The quick green',
      rating: '2',
    },
  ]
}
