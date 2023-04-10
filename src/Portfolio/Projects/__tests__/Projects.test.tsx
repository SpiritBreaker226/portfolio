import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../../../testUtil'
import { InitialState } from '../../../types'
import { Projects, ProjectsProps } from '../Projects'

const mockDispatch = jest.fn()

describe('Projects', () => {
  const defaultProps: ProjectsProps = {
    projects: [],
  }
  const setUp = (
    props: Partial<ProjectsProps> = {},
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <Projects {...defaultProps} {...props} />
      </AppProvider>
    )
  }

  it('should show projects', async () => {
    const companyName1 = faker.company.name()
    const companyName2 = faker.company.name()

    const projects = [
      {
        ...project,
        id: '0',
        name: companyName1,
      },
      {
        ...project,
        id: '1',
        name: companyName2,
      },
    ]

    setUp(
      { projects },
      {
        ...initialState,
        projects: {
          '0': projects[0],
          '1': projects[1],
        },
      }
    )

    await screen.findByText(companyName1)
    await screen.findByText(companyName2)
  })
})
