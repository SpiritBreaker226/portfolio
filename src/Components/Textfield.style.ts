import styled from 'styled-components'

export const Textfield = styled.input.attrs<{ isErroring?: boolean }>(
  (props) => ({
    isErroring: props.isErroring || false,
  })
)<{ isErroring?: boolean }>`
  margin-top: 0.25rem;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;

  ${(props) =>
    props.isErroring &&
    `
    border: 0;
    outline-color: ${props.theme.colors.error};
    outline-style: solid;
    outline-width: 1px;`}}
`
