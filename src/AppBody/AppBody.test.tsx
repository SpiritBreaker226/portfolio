import { screen } from '@testing-library/react'

import { AppProvider } from '../context'
import { project, render } from '../testUtil'
import { AppBody } from './AppBody'

const mockGetPortfolios = vi.fn()

vi.mock('../hooks', async () => ({
  ...(await vi.importActual('../hooks')),
  usePortfolio: () => ({ getPortfolios: mockGetPortfolios }),
}))

describe('GIVEN using AppBody', () => {
  const setUp = (url: string) => {
    window.history.pushState({}, '', url)

    render(
      <AppProvider>
        <AppBody />
      </AppProvider>
    )
  }

  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  test('WHEN a project page is opened directly THEN the project is shown', async () => {
    mockGetPortfolios.mockReturnValue([
      { ...project, id: 'pablo-honey', name: 'Pablo Honey' },
    ])

    setUp('/portfolio/pablo-honey')

    expect(await screen.findByText('Pablo Honey')).toBeInTheDocument()
  })
})
