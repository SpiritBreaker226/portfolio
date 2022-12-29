import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ErrorMessage } from '../Components'
import { useBlog } from '../hooks'
import { Post as PostType } from '../types'

const PostContainer = styled.article`
  margin-bottom: 0.75rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 0.75rem;

  &:last-child {
    border: 0;
  }
`

const PostText = styled.p`
  margin: 0.25rem 0;
`

const PostFooterText = styled.p`
  font-style: italic;
`

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
    return <section>Loading...</section>
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
      {posts.map(
        ({
          id,
          description,
          title,
          url,
          published_timestamp,
          readable_publish_date,
        }) => (
          <PostContainer key={id}>
            <a
              href={url}
              title={`See ${title} from ${process.env.REACT_APP_DEVELOPER_NAME} blog`}
              target="_blank"
              rel="noreferrer">
              {title}
            </a>

            <PostText>{description}</PostText>

            <footer>
              <PostFooterText>
                Posted on{' '}
                <time dateTime={published_timestamp}>
                  {readable_publish_date}
                </time>
              </PostFooterText>
            </footer>
          </PostContainer>
        )
      )}
    </section>
  )
}
