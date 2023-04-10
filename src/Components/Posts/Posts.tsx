import { FC } from 'react'
import styled from 'styled-components'

import { useApp } from '../../context'
import { Post } from './Post'

const NoBlogContainer = styled.section`
  text-align: center;
`

export type PostsProps = {
  numberOfPosts?: number
}

export const Posts: FC<PostsProps> = ({ numberOfPosts }) => {
  const {
    state: { posts },
  } = useApp()

  if (!posts.length) {
    return (
      <NoBlogContainer>
        <p>No Posts Found</p>
      </NoBlogContainer>
    )
  }

  return (
    <>
      {posts.slice(0, numberOfPosts).map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  )
}
