import { FC } from 'react'

import { Post as PostType } from '../../types'
import { PostContainer, PostText, PostFooterText } from './Post.style'

export type PostProps = {}

export const Post: FC<PostType> = ({
  description,
  title,
  url,
  published_timestamp,
  readable_publish_date,
}) => (
  <PostContainer>
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
        <time dateTime={published_timestamp}>{readable_publish_date}</time>
      </PostFooterText>
    </footer>
  </PostContainer>
)
