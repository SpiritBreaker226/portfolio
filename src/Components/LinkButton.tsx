import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled from 'styled-components'

import { Button } from './Button'

const Container = styled(Button)`
  color: ${(props) => props.theme.colors.primary};
  background: none;
  border: none;
  font-weight: normal;
  padding: 0;
  border-radius: 0;
  cursor: pointer;

  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.hoverForLinks};
    border: none;
    background: none;
  }
`

export type LinkButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<unknown>

export const LinkButton: FC<LinkButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
)
