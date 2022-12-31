import styled, { css } from 'styled-components'

export const fieldStyle = css`
  margin-top: 0.25rem;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
`

export const Textfield = styled.input.attrs<{ isErroring?: boolean }>(
  (props) => ({
    isErroring: props.isErroring || false,
  })
)<{ isErroring?: boolean }>`
  ${fieldStyle}

  ${(props) =>
    props.isErroring &&
    `
    border: 0;
    outline-color: ${props.theme.colors.error};
    outline-style: solid;
    outline-width: 1px;`}}
`
