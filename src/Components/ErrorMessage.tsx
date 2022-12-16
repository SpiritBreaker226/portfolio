import { FC } from 'react'
import styled from 'styled-components'

const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  color: ${(props) => props.theme.colors.error};
`

export type ErrorMessageProps = {
  error?: string
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  if (!error) {
    return null
  }

  return <ErrorMessageContainer>{error}</ErrorMessageContainer>
}
