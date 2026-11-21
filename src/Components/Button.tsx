import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled from 'styled-components'

import { buttonStyle, buttonVariants } from './Button.style'

const ButtonContainer = styled.button`
  ${buttonStyle}
  ${buttonVariants.secondary}
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
