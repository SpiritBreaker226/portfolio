import { FC } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 150ms ease;
  }

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`

const Icon: FC<{ path: string }> = ({ path }) => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d={path} />
  </svg>
)

const menuIconPath = 'M4 6h16M4 12h16M4 18h16'
const closeIconPath = 'M6 6l12 12M18 6L6 18'

export type BurgerMenuProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, setIsOpen }) => (
  <Button
    type="button"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    onClick={() => setIsOpen(!isOpen)}
  >
    <Icon path={isOpen ? closeIconPath : menuIconPath} />
  </Button>
)
