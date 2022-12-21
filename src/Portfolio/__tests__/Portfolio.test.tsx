import { waitFor } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../../testUtil'
import { InitialState, Project, Types } from '../../types'
import { Portfolio } from '../Portfolio'
import { ProjectListProps } from '../ProjectList'

const mockDispatch = jest.fn()
const mockGetPortfolios = jest.fn()

const ProjectList = ({ projects }: ProjectListProps) => (
  <div>
    {projects.map(({ name }) => (
      <span>{name}</span>
    ))}
  </div>
)

jest.mock('../ProjectList', () => ({
  ...jest.requireActual('../ProjectList'),
  ProjectList,
}))

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
  })
})
