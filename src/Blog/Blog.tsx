import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ErrorMessage } from '../Components'
import { useBlog } from '../hooks'
import { Post as PostType } from '../types'
import { Post, PostSkeleton } from './Post'

const NoBlogContainer = styled.section`
  text-align: center;
`

export const Blog: FC = () => {
  const { getPosts, isLoading, errorFromServer } = useBlog()
  const dispatchBlog = useCallback(getPosts, [getPosts])
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    const loadingBlog = async () => setPosts((await dispatchBlog()) ?? [])

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

  if (!posts.length) {
    return (
      <NoBlogContainer>
        <p>No Posts Found</p>
      </NoBlogContainer>
    )
  }

  return (
    <section>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  )
}
