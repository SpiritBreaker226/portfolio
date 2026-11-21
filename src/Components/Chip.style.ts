import { css } from 'styled-components'

export const chipStyle = css`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
`
