import releaseToggles from './releaseToggles'

describe('releaseToggles', () => {
  it('has example toggle on', () => {
    process.env = {
      EXAMPLE_RELEASE_TOGGLE: 'true',
    }
    const exampleToggle = releaseToggles().example

    expect(exampleToggle).toBe(true)
  })

  it('has example toggle off', () => {
    process.env = {
      EXAMPLE_RELEASE_TOGGLE: 'false',
    }

    const exampleToggle = releaseToggles().example

    expect(exampleToggle).toBe(false)
  })
})
