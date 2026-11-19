import { FC } from 'react'
import styled from 'styled-components'

import { useColorSchemeContext } from '../context'

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
  color: ${({ theme }) => theme.colors.toggleIcon};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.toggleTint};
    border-color: ${({ theme }) => theme.colors.toggleIcon};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      background-color 150ms ease,
      border-color 150ms ease;
  }
`

const MoonIcon: FC = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const SunIcon: FC = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

export const ThemeToggle: FC = () => {
  const { mode, toggle } = useColorSchemeContext()
  const label = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <Button type="button" aria-label={label} title={label} onClick={toggle}>
      {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
