import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AppProvider as AppStateProvider } from '../context'
import { AppProvider, initialState, project, render } from '../testUtil'
import { InitialState, Tag } from '../types'
import { Portfolio } from './Portfolio'

const mockDispatch = jest.fn()
const mockGetPortfolios = jest.fn()

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  usePortfolio: () => ({ getPortfolios: mockGetPortfolios }),
}))

describe('GIVEN using Portfolio', () => {
  const setUpWithState = (
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <Portfolio />
      </AppProvider>
    )
  }

  const setUp = (url = '/') => {
    const user = userEvent.setup()
    window.history.pushState({}, '', url)

    render(
      <AppStateProvider>
        <Portfolio />
      </AppStateProvider>
    )

    return user
  }

  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  test('WHEN there are filtered projects THEN it lists them', async () => {
    setUpWithState({
      projects: { '2483795': { ...project, id: '2483795' } },
      filteredProjects: [{ ...project, name: 'Search Project' }],
      searchCriteria: {
        searchText: 'search',
        platforms: new Set(),
        tags: new Set(),
      },
    })

    expect(await screen.findByText('Search Project')).toBeInTheDocument()
  })

  test('WHEN a tag chip is clicked THEN only projects with that tag are listed', async () => {
    mockGetPortfolios.mockReturnValue([
      { ...project, id: '1', name: 'Pablo Honey', tags: new Set([Tag.Ruby]) },
      { ...project, id: '2', name: 'The Bends', tags: new Set([Tag.PHP]) },
    ])
    const user = setUp()

    await user.click(await screen.findByRole('button', { name: Tag.Ruby }))

    expect(
      screen.getByRole('article', { name: 'Pablo Honey' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('article', { name: 'The Bends' })
    ).not.toBeInTheDocument()
  })

  describe('WHEN there is a SQL Server project and a PHP project', () => {
    beforeEach(() => {
      mockGetPortfolios.mockReturnValue([
        {
          ...project,
          id: '3',
          name: 'OK Computer',
          tags: new Set([Tag.SQLServer]),
        },
        { ...project, id: '4', name: 'Kid A', tags: new Set([Tag.PHP]) },
      ])
    })

    test('AND the URL has a SQL Server tag THEN only the SQL Server project is listed', async () => {
      setUp('/portfolio?tag=SQL+Server')

      expect(
        await screen.findByRole('article', { name: 'OK Computer' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('article', { name: 'Kid A' })
      ).not.toBeInTheDocument()
    })

    test('AND the URL has an unknown tag THEN every project is listed', async () => {
      setUp('/portfolio?tag=Amnesiac')

      expect(
        await screen.findByRole('article', { name: 'OK Computer' })
      ).toBeInTheDocument()
      expect(screen.getByRole('article', { name: 'Kid A' })).toBeInTheDocument()
    })
  })
})
