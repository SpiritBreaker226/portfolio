import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../../testUtil'
import { InitialState, Project } from '../../types'
import { ProjectDetails } from './ProjectDetails'

const mockDispatch = vi.fn()

// `vi.mock` runs before the file's own code, so `Navigate` is hoisted
// with it.
const { Navigate } = vi.hoisted(() => ({
  Navigate: () => <div>Redirected</div>,
}))

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => ({ id: 'testId' }),
  useNavigate: () => vi.fn(),
  Navigate,
}))

describe('GIVEN using ProjectDetails', () => {
  const setUp = (state: Partial<InitialState> = {}, dispatch = mockDispatch) =>
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <ProjectDetails />
      </AppProvider>
    )

  const setUpWithProject = (overrides: Partial<Project> = {}) =>
    setUp({ projects: { testId: { ...project, id: 'testId', ...overrides } } })

  test('WHEN the project exists THEN it shows the project', async () => {
    setUpWithProject()

    expect(await screen.findByText(project.name)).toBeInTheDocument()
  })

  test('WHEN no project matches the id THEN it redirects to Page Not Found', async () => {
    setUp()

    expect(await screen.findByText('Redirected')).toBeInTheDocument()
  })

  test('WHEN the project has no links THEN it shows no links footer', () => {
    setUpWithProject({ sampleCodeUrl: undefined, url: undefined })

    expect(screen.queryByRole('footer')).not.toBeInTheDocument()
  })

  describe('WHEN the project has one link', () => {
    test('AND it is the sample code THEN it links to the sample code', async () => {
      setUpWithProject({ sampleCodeUrl: faker.internet.url(), url: undefined })

      expect(
        await screen.findByRole('link', { name: 'View Sample Code' })
      ).toBeInTheDocument()
    })

    test('AND it is the project site THEN it links to the project', async () => {
      setUpWithProject({ sampleCodeUrl: undefined, url: faker.internet.url() })

      expect(
        await screen.findByRole('link', { name: `View ${project.name}` })
      ).toBeInTheDocument()
    })
  })
})
