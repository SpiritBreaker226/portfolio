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
})
