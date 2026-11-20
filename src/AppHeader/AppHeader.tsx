import { FC, useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BurgerMenu, MobileMenu, useCloseMobileMenu } from './Mobile'
import { Navigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'
import { config } from '../config'
import { containerStyle } from '../theme'

const Container = styled.header`
  background: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const Row = styled.div`
  ${containerStyle}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 12px;
`

const Logo = styled(Link)`
  font-family: 'Sacramento', cursive;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.2;
  white-space: nowrap;

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: 38px;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const AppHeader: FC = () => {
  const header = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  useCloseMobileMenu(header, closeMenu)

  return (
    <Container ref={header}>
      <Row>
        <Logo to="/">{config.developerName}</Logo>

        <Actions>
          <Navigation />
          <ThemeToggle />
          <BurgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </Actions>
      </Row>

      {isMenuOpen && <MobileMenu onLinkClick={closeMenu} />}
    </Container>
  )
}
