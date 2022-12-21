import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../../../testUtil'
import { InitialState, ProjectObject } from '../../../types'
import { ProjectDetails } from '../ProjectDetails'

const mockDispatch = jest.fn()

const Navigate = () => <div>Redirected</div>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'testId' }),
  useNavigate: () => jest.fn(),
  Navigate,
}))

describe('ProjectDetails', () => {
  const setUp = (state: Partial<InitialState> = {}, dispatch = mockDispatch) =>
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <ProjectDetails />
      </AppProvider>
    )

  it('should show project details', async () => {
    const projectTest: ProjectObject = {}

    projectTest['testId'] = { ...project, id: 'testId' }

    setUp({ projects: projectTest })

    await screen.findByText(project.name)
  })

  describe('when no project is found', () => {
    it('should go to page not found', async () => {
      setUp()

      await screen.findByText('Redirected')
    })
  })

  describe('when project has no links', () => {
    it('should not show urls', async () => {
      const projectTest: ProjectObject = {}

      projectTest['testId'] = {
        ...project,
        id: 'testId',
        sampleCodeUrl: undefined,
        url: undefined,
      }

      setUp({ projects: projectTest })

      expect(screen.queryByRole('footer')).not.toBeInTheDocument()
    })
  })

  describe('when project has links', () => {
    it('should show sampleCodeUrl url', async () => {
      const projectTest: ProjectObject = {}

      projectTest['testId'] = {
        ...project,
        id: 'testId',
        sampleCodeUrl: faker.internet.url(),
        url: undefined,
      }

      setUp({ projects: projectTest })

      await screen.findByRole('link', { name: 'View Sample Code' })
    })

    it('should show project url', async () => {
      const projectTest: ProjectObject = {}

      projectTest['testId'] = {
        ...project,
        id: 'testId',
        sampleCodeUrl: undefined,
        url: faker.internet.url(),
      }

      setUp({ projects: projectTest })

      await screen.findByRole('link', { name: `View ${project.name}` })
    })
  })
})
