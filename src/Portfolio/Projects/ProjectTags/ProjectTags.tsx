import { FC, useCallback } from 'react'
import styled from 'styled-components'

import { Button } from '../../../Components'
import { useApp } from '../../../context'
import { Tag, UpdateSearchTypes } from '../../../types'

export type ProjectTagsProps = {
  tags: Set<Tag>
}

const Tags = styled.section`
  margin-bottom 1rem;
  min-height: 8rem;
`

const TagButton = styled(Button)`
  margin-right 1rem;
  padding: 0.5rem 1rem;

  &:last-child {
    margin-right 0;
  }
`

export const ProjectTags: FC<ProjectTagsProps> = ({ tags }) => {
  const { dispatch } = useApp()

  const handleTagButton = useCallback(
    (tag: Tag) =>
      dispatch({
        type: UpdateSearchTypes.Tag,
        payload: { tags: new Set<Tag>([tag]) },
      }),
    []
  )

  return (
    <Tags>
      {Array.from(tags).map((tag) => (
        <TagButton onClick={() => handleTagButton(tag)} key={tag}>
          {tag}
        </TagButton>
      ))}
    </Tags>
  )
}
