import { screen } from '@testing-library/react'

import { AppProvider } from '../context'
import { project, render } from '../testUtil'
import { AppBody } from './AppBody'

const mockGetPortfolios = jest.fn()

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  usePortfolio: () => ({ getPortfolios: mockGetPortfolios }),
}))

describe('AppBody', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  test('GIVEN a fresh visit to a project page WHEN the app renders THEN the project is shown', async () => {
    mockGetPortfolios.mockReturnValue([
      { ...project, id: 'pablo-honey', name: 'Pablo Honey' },
    ])
    window.history.pushState({}, '', '/portfolio/pablo-honey')

    render(
      <AppProvider>
        <AppBody />
      </AppProvider>
    )

    expect(await screen.findByText('Pablo Honey')).toBeInTheDocument()
  })
})
