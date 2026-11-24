import styled, { css } from 'styled-components'

export const fieldStyle = css`
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.fieldBorder};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
`

export const fieldLabelStyle = css`
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
`

export const Textfield = styled.input.attrs<{ $isErroring?: boolean }>(
  (props) => ({
    $isErroring: props.$isErroring || false,
  })
)<{ $isErroring?: boolean }>`
  ${fieldStyle}
  width: 100%;
  padding: 0 12px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${(props) =>
    props.$isErroring &&
    `
    border: 0;
    outline-color: ${props.theme.colors.error};
    outline-style: solid;
    outline-width: 1px;`}}
`
