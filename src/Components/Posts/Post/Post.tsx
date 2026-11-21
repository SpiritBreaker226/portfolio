import { FC } from 'react'

import { Post as PostType } from '../../../types'
import {
  PostContainer,
  PostDate,
  PostLink,
  PostText,
  PostTitle,
} from './Post.style'

export type PostProps = {}

export const Post: FC<PostType> = ({
  description,
  title,
  url,
  published_timestamp,
  readable_publish_date,
}) => (
  <PostContainer>
    <PostDate>
      <time dateTime={published_timestamp}>{readable_publish_date}</time>
    </PostDate>

    <PostTitle>
      <a href={url} target="_blank" rel="noreferrer">
        {title}
      </a>
    </PostTitle>

    <PostText>{description}</PostText>

    <PostLink href={url} target="_blank" rel="noreferrer">
      Read on DEV <span aria-hidden="true">→</span>
    </PostLink>
  </PostContainer>
)
