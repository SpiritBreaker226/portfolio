import { FC, useCallback } from 'react'
import styled from 'styled-components'

import { chipStyle } from '../../../Components'
import { useApp } from '../../../context'
import { Tag, UpdateSearchTypes } from '../../../types'

export type ProjectTagsProps = {
  tags: Set<Tag>
}

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const TagButton = styled.button.attrs({ type: 'button' })`
  ${chipStyle}
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
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
