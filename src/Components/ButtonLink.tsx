import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    border: 1px solid transparent;

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => theme.colors.onPrimary};
      filter: brightness(1.08);
    }

    html[data-theme='dark'] &:hover,
    html[data-theme='dark'] &:focus-visible {
      filter: brightness(0.92);
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
}

export type ButtonLinkVariant = keyof typeof variants

export const ButtonLink = styled(Link)<{ $variant: ButtonLinkVariant }>`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 10px;
  font-weight: 600;

  ${({ $variant }) => variants[$variant]}

  @media (prefers-reduced-motion: no-preference) {
    transition:
      filter 150ms ease,
      border-color 150ms ease;
  }
`
