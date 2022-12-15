import { FC } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavigationLinkContainer = styled(NavLink)`
  padding: 1rem;
  color: ${(props) => props.theme.text};

  &:hover,
  &.active {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.secondary};
  }
`

export const Navigation: FC = () => (
  <nav>
    <NavigationLinkContainer to="/">Home</NavigationLinkContainer>
  </nav>
)
