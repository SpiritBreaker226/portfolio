import { Link } from 'react-router'
import styled from 'styled-components'

import { buttonStyle, ButtonVariant, buttonVariants } from './Button.style'

export const ButtonLink = styled(Link)<{ $variant: ButtonVariant }>`
  ${buttonStyle}
  ${({ $variant }) => buttonVariants[$variant]}
`
