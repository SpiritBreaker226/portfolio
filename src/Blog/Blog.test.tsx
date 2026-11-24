import { screen, waitFor } from '@testing-library/react'
import { FC } from 'react'

import { AppProvider, initialState, post, render } from '../testUtil'
import { InitialState, Post, Types } from '../types'
import { Blog } from './Blog'

const mockDispatch = vi.fn()
const mockGetPosts = vi.fn()
let mockIsLoading = false
let mockErrorFromServer = ''

const List: FC = () => <div>List all posts</div>

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

vi.mock('../hooks', async () => ({
  ...(await vi.importActual('../hooks')),
  useBlog: () => ({
    getPosts: mockGetPosts,
    isLoading: mockIsLoading,
    errorFromServer: mockErrorFromServer,
  }),
}))

describe('GIVEN using Blog', () => {
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

  test('WHEN posts are loading THEN it shows the post skeleton', async () => {
    mockIsLoading = true

    setUp()

    expect(await screen.findByRole('tablist')).toBeInTheDocument()
  })

  test('WHEN the server returns posts THEN it adds them to the state and shows the list', async () => {
    mockGetPosts.mockReturnValue(posts)

    setUp()

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: Types.AddPosts,
          payload: { posts: expect.arrayContaining<Post>([posts[0]]) },
        })
      )
    )
    expect(await screen.findByText(/list all posts/i)).toBeInTheDocument()
  })

  test('WHEN the server returns an error THEN it shows the error message', async () => {
    mockErrorFromServer = 'error'

    setUp()

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
  })

  test('WHEN posts are already in the state THEN it does not add them again', async () => {
    setUp({ posts })

    await waitFor(() =>
      expect(mockDispatch).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: Types.AddPosts,
          payload: { posts: expect.arrayContaining<Post>([posts[0]]) },
        })
      )
    )
  })
})
