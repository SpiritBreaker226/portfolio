import { screen, waitFor } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../../testUtil'
import { InitialState, Project, ProjectObject, Types } from '../../types'
import { Portfolio } from '../Portfolio'

const mockDispatch = jest.fn()
const mockGetPortfolios = jest.fn()

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
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

  it('should add project', async () => {
    mockGetPortfolios.mockReturnValue([project])

    setUp()

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: Types.AddProject,
          payload: { projects: expect.arrayContaining<Project>([project]) },
        })
      )
    )

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: Types.Search,
          payload: {},
        })
      )
    )
  })

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
})
