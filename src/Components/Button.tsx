import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 1rem;
  cursor: pointer;

  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.secondary};
  }
`

export type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
} & ButtonHTMLAttributes<unknown>

export const Button: FC<ButtonProps> = ({ isLoading, children, ...rest }) => (
  <ButtonContainer type="button" disabled={isLoading} {...rest}>
    {children}
  </ButtonContainer>
)
