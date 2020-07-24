import context from './context'

describe('context', () => {
  it('retrieves token', async () => {
    const token = 'Bearer ey...'
    const event = {
      headers: { authorization: token },
    }
    const actual = await context({ event })

    expect(actual).toEqual({ token })
  })
})
