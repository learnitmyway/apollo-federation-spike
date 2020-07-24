import { ReleaseToggles } from '../movies/types'

function isOn(envVar: string): boolean {
  return envVar === 'true'
}

export default function releaseToggles(): ReleaseToggles {
  return {
    example: isOn(process.env.EXAMPLE_RELEASE_TOGGLE || 'blah'),
  }
}
