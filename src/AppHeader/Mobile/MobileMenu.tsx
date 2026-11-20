import { FC } from 'react'
import styled from 'styled-components'

import { NavigationLinks } from '../Navigation'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 20px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`

export type MobileMenuProps = {
  onLinkClick: () => void
}

export const MobileMenu: FC<MobileMenuProps> = ({ onLinkClick }) => (
  <Nav id="mobile-menu" aria-label="Mobile">
    <NavigationLinks onLinkClick={onLinkClick} />
  </Nav>
)
