import { InputHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const InputField = styled.input`
  margin-right: 0.5rem;
`

export type CheckboxProps = {
  id: string
  label: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

export const Checkbox: FC<CheckboxProps> = ({ label, id, ...rest }) => (
  <Container>
    <InputField type="checkbox" id={id} {...rest} />

    <label htmlFor={id}>{label}</label>
  </Container>
)
