import { Field, FieldAttributes } from 'formik'
import { InputHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

const TextboxContainer = styled.div`
  text-align: left;
  min-height: 88px;
  display: flex;
  flex-flow: column;
  flex: 1;
`

const Textfield = styled.input.attrs<{ isErroring: boolean }>((props) => ({
  isErroring: props.isErroring || false,
}))<{ isErroring: boolean }>`
  margin-top: 0.25rem;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;

  ${(props) =>
    props.isErroring &&
    `
    border: 0;
    outline-color: ${props.theme.error};
    outline-style: solid;
    outline-width: 1px;`}}
`

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.error};
  margin: 0.5rem 0;
`

export type TextBoxProps = {
  name: string
  label: string
} & Omit<InputHTMLAttributes<HTMLInputElement> & FieldAttributes<any>, 'id'>

export const Textbox: FC<TextBoxProps> = ({ label, name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => {
        const isErroring = meta.touched && meta.error

        return (
          <TextboxContainer>
            <label htmlFor={name}>{label}</label>

            <Textfield
              type="text"
              id={name}
              isErroring={isErroring}
              {...rest}
              {...field}
            />
            {isErroring && <ErrorMessage>{meta.error}</ErrorMessage>}
          </TextboxContainer>
        )
      }}
    </Field>
  )
}
