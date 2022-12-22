import { InputHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const InputField = styled.input`
  margin-right: 0.5rem;
`

export type RadioButtonProps = {
  id: string
  label: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

export const RadioButton: FC<RadioButtonProps> = ({ label, id, ...rest }) => (
  <Container>
    <InputField type="radio" id={id} {...rest} />

    <label htmlFor={id}>{label}</label>
  </Container>
)
