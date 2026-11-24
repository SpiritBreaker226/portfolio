import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../../testUtil'
import { InitialState } from '../../types'
import { Projects, ProjectsProps } from './Projects'

const mockDispatch = vi.fn()

describe('GIVEN using Projects', () => {
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

  test('WHEN there are two projects THEN it shows both', async () => {
    const companyName1 = faker.company.name()
    const companyName2 = faker.company.name()
    const projects = [
      { ...project, id: '0', name: companyName1 },
      { ...project, id: '1', name: companyName2 },
    ]

    setUp(
      { projects },
      { projects: { '0': projects[0], '1': projects[1] } }
    )

    expect(await screen.findByText(companyName1)).toBeInTheDocument()
    expect(await screen.findByText(companyName2)).toBeInTheDocument()
  })

  describe('WHEN there is one project', () => {
    const setUpOneProject = () => {
      const wonderwall = { ...project, id: 'wonderwall', name: 'Wonderwall' }

      setUp(
        { projects: [wonderwall] },
        { projects: { [wonderwall.id]: wonderwall } }
      )
    }

    test('THEN "View Details" links to the project page', async () => {
      setUpOneProject()

      expect(
        await screen.findByRole('link', { name: 'View Details' })
      ).toHaveAttribute('href', '/portfolio/wonderwall')
    })

    test('THEN the logo links to the project page', async () => {
      setUpOneProject()

      expect(
        (await screen.findByAltText('Wonderwall')).closest('a')
      ).toHaveAttribute('href', '/portfolio/wonderwall')
    })
  })
})
