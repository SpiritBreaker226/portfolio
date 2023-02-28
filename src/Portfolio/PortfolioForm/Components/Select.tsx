import { useEffect, useState } from 'react'
import ReactDropdownSelect, {
  SelectProps as ReactDropdownSelectProps,
} from 'react-dropdown-select'
import styled, { useTheme } from 'styled-components'

import { titleCase } from '../../../AppBody/helpers'
import { useApp } from '../../../context'
import { Types } from '../../../types'

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const FieldsetLabel = styled.h4`
  padding-bottom: 0.25rem;
`

export type SelectFieldValue<T> = {
  label: string
  value: T
}

export type SelectFieldProps<T extends string | object> = {
  name: string
  values: T[]
  options: SelectFieldValue<T>[]
  onSelectChange: (value: T | Array<T>) => void
  label?: string
  multi?: boolean
} & Omit<
  ReactDropdownSelectProps<SelectFieldValue<T>>,
  'name' | 'onChange' | 'options' | 'values'
>

export const Select = <T extends string | object>({
  multi = false,
  name,
  label,
  values,
  options,
  onSelectChange,
  ...rest
}: SelectFieldProps<T>) => {
  const { dispatch } = useApp()
  const theme = useTheme()

  const [reactSelectValues, setReactSelectValues] = useState<
    SelectFieldValue<T>[]
  >([])

  useEffect(() => {
    // for the non-multi version of the component
    setReactSelectValues(
      values.map((value) => ({
        label: titleCase(value as string),
        value,
      }))
    )
  }, [values])

  const handleChange = (values: SelectFieldValue<T>[]) => {
    const currentSelectValues = multi
      ? values.map(({ value }) => value)
      : values[0].value

    onSelectChange(currentSelectValues)

    dispatch({
      type: Types.Search,
      payload: {},
    })
  }

  return (
    <Container>
      {label && <FieldsetLabel>{label}:</FieldsetLabel>}

      <ReactDropdownSelect<SelectFieldValue<T>>
        color={theme.colors.primary}
        style={{
          minWidth: '5rem',
        }}
        multi={multi}
        {...rest}
        name={name}
        values={reactSelectValues}
        options={options}
        onChange={handleChange}
      />
    </Container>
  )
}
