import { FC } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { MobileMenu } from './Mobile'

const NavigationLinkContainer = styled(NavLink)`
  padding: 1rem;
  color: ${(props) => props.theme.colors.text};

  &:hover,
  &:focus-visible {
    background-color: ${(props) => props.theme.colors.surfaceAlt};
    color: ${(props) => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &[aria-current='page'] {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.onPrimary};
  }

  &[aria-current='page']:hover,
  &[aria-current='page']:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px ${(props) => props.theme.colors.bg},
      0 0 0 4px ${(props) => props.theme.colors.primary};
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      background-color 150ms ease,
      color 150ms ease,
      box-shadow 150ms ease;
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
