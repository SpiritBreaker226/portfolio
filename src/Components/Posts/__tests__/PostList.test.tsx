import { screen } from '@testing-library/react'

import { AppProvider, initialState, post, render } from '../../../testUtil'
import { InitialState } from '../../../types'
import { PostList, PostListProps } from '../PostList'

const mockDispatch = jest.fn()

describe('PostList', () => {
  const defaultProps: PostListProps = {
    numberOfPosts: undefined,
  }
  const setUp = (
    props: Partial<PostListProps> = {},
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <PostList {...defaultProps} {...props} />
      </AppProvider>
    )
  }

  it('should show all posts', async () => {
    setUp(
      {},
      {
        posts: [
          { ...post, id: 1, title: 'The World' },
          { ...post, id: 2, title: 'The Fool' },
          { ...post, id: 3, title: 'The Sun' },
          { ...post, id: 4, title: 'The Moon' },
        ],
      }
    )

    await screen.findByText(/world/i)
    await screen.findByText(/fool/i)
    await screen.findByText(/sun/i)
    await screen.findByText(/moon/i)
  })

  describe('when no post is found', () => {
    it('should show the no posts message', async () => {
      setUp({}, { posts: [] })

      await screen.findByText(/no posts/i)
    })
  })

  describe('when limiting number of post', () => {
    it('should some of the posts', async () => {
      setUp(
        { numberOfPosts: 2 },
        {
          posts: [
            { ...post, id: 1, title: 'The World' },
            { ...post, id: 2, title: 'The Fool' },
            { ...post, id: 3, title: 'The Sun' },
            { ...post, id: 4, title: 'The Moon' },
          ],
        }
      )

      await screen.findByText(/world/i)
      await screen.findByText(/fool/i)
      expect(screen.queryByText(/sun/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/moon/i)).not.toBeInTheDocument()
    })
  })
})
