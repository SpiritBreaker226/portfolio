import { screen } from '@testing-library/react'

import { render } from '../testUtil'

import { PageHeader } from './PageHeader'

const mockUseLocation = jest.fn()
let mockTitleCase = ''

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocation,
}))

jest.mock('./helpers', () => ({
  titleCase: () => mockTitleCase,
}))

describe('PageHeader', () => {
  const setUp = () => render(<PageHeader />)

  afterEach(() => {
    mockTitleCase = ''
  })

  describe('when no path is found', () => {
    it('should default to "Page Not Found"', async () => {
      mockUseLocation.mockReturnValue({ pathname: '' })
      mockTitleCase = ''

      setUp()

      await screen.findByRole('heading', { level: 1, name: 'Page Not Found' })
    })
  })

  test('GIVEN a page title from the path WHEN the header renders THEN the title is the level-1 heading', () => {
    mockTitleCase = 'Wonderwall'

    setUp()

    expect(
      screen.getByRole('heading', { level: 1, name: 'Wonderwall' })
    ).toBeInTheDocument()
  })
})
