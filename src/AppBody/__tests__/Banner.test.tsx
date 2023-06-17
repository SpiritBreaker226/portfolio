import { screen } from '@testing-library/react'

import { render } from '../../testUtil'

import { Banner } from '../Banner'

const mockUseLocation = jest.fn()
let mockTitleCase = ''

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocation,
}))

jest.mock('../helpers', () => ({
  titleCase: () => mockTitleCase,
}))

describe('Banner', () => {
  const setUp = () => render(<Banner />)

  afterEach(() => {
    mockTitleCase = ''
  })

  describe('when no path is found', () => {
    it('should default to "Page Not Found"', async () => {
      mockUseLocation.mockReturnValue({ pathname: '' })
      mockTitleCase = ''

      setUp()

      await screen.findByText('Page Not Found', { exact: false })
    })
  })
})
