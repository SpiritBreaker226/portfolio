import { screen } from '@testing-library/react'

import { render } from '../testUtil'

import { PageHeader } from './PageHeader'

const mockUseLocation = vi.fn()
let mockTitleCase = ''

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useLocation: () => mockUseLocation,
}))

vi.mock('./helpers', () => ({
  titleCase: () => mockTitleCase,
}))

describe('GIVEN using PageHeader', () => {
  const setUp = (pageTitle: string) => {
    mockTitleCase = pageTitle

    render(<PageHeader />)
  }

  afterEach(() => {
    mockTitleCase = ''
  })

  test('WHEN the path has no page title THEN the heading is "Page Not Found"', async () => {
    mockUseLocation.mockReturnValue({ pathname: '' })

    setUp('')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page Not Found' })
    ).toBeInTheDocument()
  })

  test('WHEN the path has a page title THEN it is the level-1 heading', () => {
    setUp('Wonderwall')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Wonderwall' })
    ).toBeInTheDocument()
  })
})
