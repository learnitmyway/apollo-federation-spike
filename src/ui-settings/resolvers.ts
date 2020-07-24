import { UISettings } from './types'
import releaseToggles from './releaseToggles'

const resolvers = {
  Query: {
    uiSettings: async (): Promise<UISettings> => ({
      auth: {
        audience: 'foo',
        clientId: 'bar',
        domain: 'baz',
      },
      releaseToggles: releaseToggles(),
    }),
  },
  UISettings: {
    movie(_: unknown, { id }: any): any {
      return { __typename: 'Movie', id }
    },
  },
}

export default resolvers
