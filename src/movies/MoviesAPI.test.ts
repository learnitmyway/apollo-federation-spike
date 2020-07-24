/* eslint-disable @typescript-eslint/no-explicit-any */
import MoviesAPI from './MoviesAPI'

describe('MoviesAPI', () => {
  it('sets auth header', () => {
    const service: any = new MoviesAPI()
    const token = 'Bearer eyalsdfjjVlasfd...'
    service.context = { token }

    const set = jest.fn()
    const request = { headers: { set } }

    service.willSendRequest(request)

    expect(set).toHaveBeenCalledWith('Authorization', token)
  })
})
