import { screen } from '@testing-library/react'

import { AppProvider, initialState, post, render } from '../../../testUtil'
import { InitialState } from '../../../types'
import { Posts, PostsProps } from '../Posts'

const mockDispatch = jest.fn()

describe('Posts', () => {
  const defaultProps: PostsProps = {
    numberOfPosts: undefined,
  }
  const setUp = (
    props: Partial<PostsProps> = {},
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <Posts {...defaultProps} {...props} />
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
          { ...post, id: 3, title: 'The Lovers' },
          { ...post, id: 4, title: 'The Moon' },
        ],
      }
    )

    await screen.findByText(/world/i)
    await screen.findByText(/fool/i)
    await screen.findByText(/lovers/i)
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
            { ...post, id: 3, title: 'The Lovers' },
            { ...post, id: 4, title: 'The Moon' },
          ],
        }
      )

      await screen.findByText(/world/i)
      await screen.findByText(/fool/i)
      expect(screen.queryByText(/lovers/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/moon/i)).not.toBeInTheDocument()
    })
  })
})
