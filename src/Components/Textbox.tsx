import { Field, FieldAttributes } from 'formik'
import { InputHTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { Textfield } from './Textfield.style'

const TextboxContainer = styled.div`
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
