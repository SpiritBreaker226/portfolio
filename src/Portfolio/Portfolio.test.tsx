import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AppProvider as AppStateProvider } from '../context'
import { AppProvider, initialState, project, render } from '../testUtil'
import { InitialState, ProjectObject, Tag } from '../types'
import { Portfolio } from './Portfolio'

const mockDispatch = jest.fn()
const mockGetPortfolios = jest.fn()

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  usePortfolio: () => ({ getPortfolios: mockGetPortfolios }),
}))

describe('Portfolio', () => {
  const setUp = (
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <Portfolio />
      </AppProvider>
    )
  }

  describe('when searching are use', () => {
    it('should use filtered projects', async () => {
      const projects: ProjectObject = {}

      projects['2483795'] = {
        ...project,
        id: '2483795',
      }

      setUp({
        projects,
        filteredProjects: [{ ...project, name: 'Search Project' }],
        searchCriteria: {
          searchText: 'search',
          platforms: new Set(),
          tags: new Set(),
        },
      })

      await screen.findByText('Search Project')
    })
  })

  describe('GIVEN projects with different tags', () => {
    test('WHEN a tag chip is clicked THEN only projects with that tag are listed', async () => {
      const user = userEvent.setup()
      mockGetPortfolios.mockReturnValue([
        { ...project, id: '1', name: 'Pablo Honey', tags: new Set([Tag.Ruby]) },
        { ...project, id: '2', name: 'The Bends', tags: new Set([Tag.PHP]) },
      ])

      render(
        <AppStateProvider>
          <Portfolio />
        </AppStateProvider>
      )

      await user.click(await screen.findByRole('button', { name: Tag.Ruby }))

      expect(
        screen.getByRole('article', { name: 'Pablo Honey' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('article', { name: 'The Bends' })
      ).not.toBeInTheDocument()
    })
  })

  describe('GIVEN a SQL Server project and a PHP project', () => {
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

    afterEach(() => {
      window.history.pushState({}, '', '/')
    })

    test('WHEN the page opens with a SQL Server tag in the URL THEN only the SQL Server project is listed', async () => {
      window.history.pushState({}, '', '/portfolio?tag=SQL+Server')

      render(
        <AppStateProvider>
          <Portfolio />
        </AppStateProvider>
      )

      expect(
        await screen.findByRole('article', { name: 'OK Computer' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('article', { name: 'Kid A' })
      ).not.toBeInTheDocument()
    })

    test('WHEN the page opens with an unknown tag in the URL THEN every project is listed', async () => {
      window.history.pushState({}, '', '/portfolio?tag=Amnesiac')

      render(
        <AppStateProvider>
          <Portfolio />
        </AppStateProvider>
      )

      expect(
        await screen.findByRole('article', { name: 'OK Computer' })
      ).toBeInTheDocument()
      expect(screen.getByRole('article', { name: 'Kid A' })).toBeInTheDocument()
    })
  })
})
