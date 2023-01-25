import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.button.attrs<{ isOpen?: boolean }>((props) => ({
  isOpen: props.isOpen || false,
}))<{ isOpen?: boolean }>`
  position: absolute;
  top: 3%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  display: none;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    margin-bottom: 0.3rem;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 0.2rem;

    :first-child {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
      transform: ${({ isOpen }) =>
        isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  @media (max-width: ${({ theme }) => theme.mobile.turnOnAt}) {
    display: block;
  }
`

export type BurgerMenuProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, setIsOpen }) => (
  <Container isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
    <div />
    <div />
    <div />
  </Container>
)
