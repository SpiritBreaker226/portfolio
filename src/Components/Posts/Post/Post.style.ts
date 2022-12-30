import styled from 'styled-components'

export const PostContainer = styled.article`
  margin-bottom: 0.75rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 0.75rem;

  &:last-child {
    border: 0;
  }
`

export const PostText = styled.p`
  margin: 0.25rem 0;
`

export const PostFooterText = styled.p`
  font-style: italic;
`
