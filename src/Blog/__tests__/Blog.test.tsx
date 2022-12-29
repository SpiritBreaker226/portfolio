import { screen } from '@testing-library/react'

import { post, render } from '../../testUtil'
import { Blog } from '../Blog'

const mockGetPosts = jest.fn()
let mockIsLoading = false
let mockErrorFromServer = ''

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useBlog: () => ({
    getPosts: mockGetPosts,
    isLoading: mockIsLoading,
    errorFromServer: mockErrorFromServer,
  }),
}))

describe('Blog', () => {
  const setUp = () => render(<Blog />)

  afterEach(() => {
    mockIsLoading = false
    mockErrorFromServer = ''
  })

  it('should show loading', async () => {
    mockIsLoading = true

    setUp()

    await screen.findByText(/loading/i)
  })

  it('should show posts', async () => {
    mockGetPosts.mockReturnValue([
      {
        ...post,
        id: '1',
        title: 'The Real World',
      },
      {
        ...post,
        id: '2',
        title: 'The Real Fake',
      },
    ])

    setUp()

    await screen.findByText(/world/i)
    await screen.findByText(/fake/i)
  })

  describe('when no post is found', () => {
    it('should show the no posts message', async () => {
      mockGetPosts.mockReturnValue([])

      setUp()

      await screen.findByText(/no posts/i)
    })
  })

  describe('when there is an error', () => {
    it('should show the error message', async () => {
      mockErrorFromServer = 'error'

      setUp()

      await screen.findByText(/error/i)
    })
  })
})
