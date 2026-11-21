import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { buttonStyle, ButtonVariant, buttonVariants } from './Button.style'

export const ButtonLink = styled(Link)<{ $variant: ButtonVariant }>`
  ${buttonStyle}
  ${({ $variant }) => buttonVariants[$variant]}
`
