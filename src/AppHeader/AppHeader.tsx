import { FC, useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BurgerMenu, MobileMenu, useCloseMobileMenu } from './Mobile'
import { Navigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'
import { config } from '../config'

const Container = styled.header`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.75rem;
`

const Title = styled.h1`
  font-family: 'Sacramento', cursive;
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
        <Title>
          <Link to="/">{config.developerName}</Link>
        </Title>

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
