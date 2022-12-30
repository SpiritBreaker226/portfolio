import { FC, ReactNode, useCallback, useEffect } from 'react'

import { ErrorMessage, PostSkeleton } from '../Components'
import { useApp } from '../context'
import { useBlog } from '../hooks'
import { Types } from '../types'

export type BlogProps = {
  children: ReactNode
}

export const Blog: FC<BlogProps> = ({ children }) => {
  const { getPosts, isLoading, errorFromServer } = useBlog()
  const dispatchBlog = useCallback(getPosts, [getPosts])
  const { dispatch } = useApp()

  useEffect(() => {
    const loadingBlog = async () =>
      dispatch({
        type: Types.AddPosts,
        payload: { posts: (await dispatchBlog()) ?? [] },
      })

    loadingBlog()
  }, [])

  if (isLoading) {
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
