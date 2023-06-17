import { FC } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { MobileMenu } from './Mobile'

const NavigationLinkContainer = styled(NavLink)`
  padding: 1rem;
  color: ${(props) => props.theme.colors.text};

  &:hover,
  &.active {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
  }
`

export const Navigation: FC = () => (
  <MobileMenu>
    <NavigationLinkContainer to="/">About</NavigationLinkContainer>
    <NavigationLinkContainer to="skills">Skills</NavigationLinkContainer>
    <NavigationLinkContainer to="portfolio">Portfolio</NavigationLinkContainer>
    <NavigationLinkContainer to="blog">Blog</NavigationLinkContainer>
  </MobileMenu>
)
