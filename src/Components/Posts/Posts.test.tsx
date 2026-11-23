import { screen, within } from '@testing-library/react'

import { AppProvider, initialState, post, render } from '../../testUtil'
import { InitialState } from '../../types'
import { Posts, PostsProps } from './Posts'

const mockDispatch = jest.fn()

const fourPosts = [
  { ...post, id: 1, title: 'The World' },
  { ...post, id: 2, title: 'The Fool' },
  { ...post, id: 3, title: 'The Lovers' },
  { ...post, id: 4, title: 'The Moon' },
]

describe('GIVEN using Posts', () => {
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

  test('WHEN there are four posts THEN it shows them all', async () => {
    setUp({}, { posts: fourPosts })

    expect(await screen.findByText(/world/i)).toBeInTheDocument()
    expect(await screen.findByText(/fool/i)).toBeInTheDocument()
    expect(await screen.findByText(/lovers/i)).toBeInTheDocument()
    expect(await screen.findByText(/moon/i)).toBeInTheDocument()
  })

  test('WHEN there are no posts THEN it shows the no posts message', async () => {
    setUp({}, { posts: [] })

    expect(await screen.findByText(/no posts/i)).toBeInTheDocument()
  })

  test('WHEN there are four posts and a limit of two THEN it shows only the first two', async () => {
    setUp({ numberOfPosts: 2 }, { posts: fourPosts })

    expect(await screen.findByText(/world/i)).toBeInTheDocument()
    expect(await screen.findByText(/fool/i)).toBeInTheDocument()
    expect(screen.queryByText(/lovers/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/moon/i)).not.toBeInTheDocument()
  })

  describe('WHEN there is one post', () => {
    const postTitle = 'Let It Be'
    const postUrl = 'https://example.com/songs/let-it-be'
    const setUpOnePost = () =>
      setUp({}, { posts: [{ ...post, title: postTitle, url: postUrl }] })

    test('THEN its title is a level-3 heading linking to the post', () => {
      setUpOnePost()

      expect(
        within(
          screen.getByRole('heading', { level: 3, name: postTitle })
        ).getByRole('link')
      ).toHaveAttribute('href', postUrl)
    })

    test('THEN "Read on DEV" links to the post', () => {
      setUpOnePost()

      expect(
        screen.getByRole('link', { name: 'Read on DEV' })
      ).toHaveAttribute('href', postUrl)
    })
  })
})
