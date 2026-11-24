import { screen, within } from '@testing-library/react'

import { config } from '../config'
import { render } from '../testUtil'
import { AppFooter } from './AppFooter'

describe('GIVEN using AppFooter', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  test('WHEN the year is 1979 THEN the copyright shows 1979', () => {
    vi.useFakeTimers({ now: new Date(1979, 5, 1) })

    render(<AppFooter />)

    expect(
      screen.getByText(`© 1979 ${config.developerName}`)
    ).toBeInTheDocument()
  })

  test('THEN the Social nav links only GitHub, LinkedIn and DEV, in that order', () => {
    render(<AppFooter />)

    expect(
      within(screen.getByRole('navigation', { name: 'Social' }))
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')])
    ).toEqual([
      ['GitHub', 'https://github.com/SpiritBreaker226'],
      ['LinkedIn', 'https://www.linkedin.com/in/jasonstathopulos'],
      ['DEV', 'https://dev.to/jstats'],
    ])
  })
})
