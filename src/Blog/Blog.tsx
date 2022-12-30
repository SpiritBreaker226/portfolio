import { FC, ReactNode, useCallback, useEffect } from 'react'

import { ErrorMessage, PostSkeleton } from '../Components'
import { useApp } from '../context'
import { useBlog } from '../hooks'
import { Types } from '../types'

export type BlogProps = {
  children: ReactNode
}

export const Blog: FC<BlogProps> = ({ children }) => {
  const {
    state: { posts },
    dispatch,
  } = useApp()
  const { getPosts, isLoading, errorFromServer } = useBlog()
  const dispatchBlog = useCallback(getPosts, [getPosts])

  useEffect(() => {
    const loadingBlog = async () =>
      dispatch({
        type: Types.AddPosts,
        payload: { posts: (await dispatchBlog()) ?? [] },
      })

    !posts.length && loadingBlog()
  }, [])

  if (isLoading && !posts.length) {
    return (
      <section>
        <PostSkeleton />
      </section>
    )
  }

  if (errorFromServer) {
    return (
      <section>
        <ErrorMessage error={errorFromServer} />
      </section>
    )
  }

  return <section>{children}</section>
}
