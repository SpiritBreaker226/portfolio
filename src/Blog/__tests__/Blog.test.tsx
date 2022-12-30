import { screen, waitFor } from '@testing-library/react'
import { FC } from 'react'

import { AppProvider, initialState, post, render } from '../../testUtil'
import { InitialState, Post, Types } from '../../types'
import { Blog } from '../Blog'

const mockDispatch = jest.fn()
const mockGetPosts = jest.fn()
let mockIsLoading = false
let mockErrorFromServer = ''

const List: FC = () => <div />

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useBlog: () => ({
    getPosts: mockGetPosts,
    isLoading: mockIsLoading,
    errorFromServer: mockErrorFromServer,
  }),
}))

describe('Blog', () => {
  const setUp = (state: Partial<InitialState> = {}, dispatch = mockDispatch) =>
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <Blog>
          <List />
        </Blog>
      </AppProvider>
    )

  afterEach(() => {
    mockIsLoading = false
    mockErrorFromServer = ''
  })

  it('should show post skeleton', async () => {
    mockIsLoading = true

    setUp()

    await screen.findByRole('tablist')
  })

  it('should show posts', async () => {
    const posts = [
      {
        ...post,
        id: 1,
        title: 'The Real World',
      },
      {
        ...post,
        id: 2,
        title: 'The Real Fake',
      },
    ]

    mockGetPosts.mockReturnValue(posts)

    setUp({ posts })

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: Types.AddPosts,
          payload: { posts: expect.arrayContaining<Post>([posts[0]]) },
        })
      )
    )
  })

  describe('when there is an error', () => {
    it('should show the error message', async () => {
      mockErrorFromServer = 'error'

      setUp()

      await screen.findByText(/error/i)
    })
  })
})
