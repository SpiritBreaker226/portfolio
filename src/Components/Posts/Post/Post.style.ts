import styled from 'styled-components'

import { Card } from '../../Card'

export const PostContainer = styled(Card)``

export const PostDate = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
`

export const PostTitle = styled.h3`
  a {
    color: ${({ theme }) => theme.colors.text};
  }

  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const PostText = styled.p`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.muted};
`

export const PostLink = styled.a`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  min-height: 44px;
`
