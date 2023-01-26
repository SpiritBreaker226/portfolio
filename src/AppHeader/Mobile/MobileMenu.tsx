import { FC, ReactNode, useRef, useState } from 'react'
import styled from 'styled-components'
import { useCloseMobileMenuOutside } from './hooks'

import { BurgerMenu } from './BurgerMenu'

const Nav = styled.nav.attrs<{ isOpen?: boolean }>((props) => ({
  isOpen: props.isOpen || false,
}))<{ isOpen?: boolean }>`
  @media (max-width: ${({ theme }) => theme.mobile.turnOnAt}) {
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${({ theme }) => theme.colors.secondary};
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: absolute;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    width: 100%;
  }
`

export type MobileMenuProps = {
  children: ReactNode
}

export const MobileMenu: FC<MobileMenuProps> = ({ children }) => {
  const mobileMenuContainer = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useCloseMobileMenuOutside(mobileMenuContainer, () => setIsOpen(false))

  return (
    <div ref={mobileMenuContainer}>
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <Nav isOpen={isOpen}>{children}</Nav>
    </div>
  )
}
