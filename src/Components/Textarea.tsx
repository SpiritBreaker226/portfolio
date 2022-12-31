import { Field, FieldAttributes } from 'formik'
import { InputHTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { fieldStyle } from './Textfield.style'

const Container = styled.div`
  text-align: left;
  min-height: 88px;
  display: flex;
  flex-flow: column;
  flex: 1;
`

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.error};
  margin: 0.5rem 0;
`

export const TextareaField = styled.textarea.attrs<{ isErroring?: boolean }>(
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

export type TextareaProps = {
  name: string
  label: string
} & Omit<InputHTMLAttributes<HTMLInputElement> & FieldAttributes<any>, 'id'>

export const Textarea: FC<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => {
        const isErroring = meta.touched && meta.error

        return (
          <Container>
            <label htmlFor={name}>{label}</label>

            <TextareaField
              id={name}
              isErroring={isErroring}
              {...rest}
              {...field}
            />

            {isErroring && <ErrorMessage>{meta.error}</ErrorMessage>}
          </Container>
        )
      }}
    </Field>
  )
}
