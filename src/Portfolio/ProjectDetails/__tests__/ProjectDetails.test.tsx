import { screen } from '@testing-library/react'

import { project, render } from '../../../testUtil'
import { ProjectDetails } from '../ProjectDetails'

const mockUseParams = jest.fn()
const mockGetPortfolio = jest.fn()

const Navigate = () => <div>Redirected</div>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams,
  useNavigate: () => jest.fn(),
  Navigate,
}))

jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  usePortfolio: () => ({ getPortfolio: mockGetPortfolio }),
}))

describe('ProjectDetails', () => {
  const setUp = () => render(<ProjectDetails />)

  it('should show project details', async () => {
    mockGetPortfolio.mockReturnValue(project)

    setUp()

    await screen.findByText(project.name)
  })

  describe('when no project is found', () => {
    it('should go to page not found', async () => {
      mockGetPortfolio.mockReturnValue(undefined)

      setUp()

      await screen.findByText('Redirected')
    })
  })
})
