import { FC } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavigationLinkContainer = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
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

const Nav = styled.nav`
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    gap: 4px;
  }
`

export type NavigationLinksProps = {
  onLinkClick?: () => void
}

export const NavigationLinks: FC<NavigationLinksProps> = ({ onLinkClick }) => (
  <>
    <NavigationLinkContainer to="/" onClick={onLinkClick}>
      About
    </NavigationLinkContainer>
    <NavigationLinkContainer to="skills" onClick={onLinkClick}>
      Skills
    </NavigationLinkContainer>
    <NavigationLinkContainer to="portfolio" onClick={onLinkClick}>
      Portfolio
    </NavigationLinkContainer>
    <NavigationLinkContainer to="blog" onClick={onLinkClick}>
      Blog
    </NavigationLinkContainer>
  </>
)

export const Navigation: FC = () => (
  <Nav aria-label="Main">
    <NavigationLinks />
  </Nav>
)
