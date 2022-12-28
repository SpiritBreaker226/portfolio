import { useEffect, useState } from 'react'
import ReactDropdownSelect, {
  SelectProps as ReactDropdownSelectProps,
} from 'react-dropdown-select'
import styled from 'styled-components'

import { titleCase } from '../../../AppBody/helpers'
import { useApp } from '../../../context'
import { Types } from '../../../types'

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const FieldsetLabel = styled.label`
  padding-bottom: 0.25rem;
`

export type SelectFieldValue<T> = {
  label: string
  value: T
}

export type SelectFieldProps<T extends string | object> = {
  name: string
  values: T[]
  options: T[]
  onSelectChange: (value: T | Array<T>) => void
  label?: string
  multi?: boolean
} & Omit<
  ReactDropdownSelectProps<SelectFieldValue<T>>,
  'name' | 'onChange' | 'options' | 'values'
>

function Select<T extends string | object>({
  multi = false,
  name,
  label,
  values,
  options,
  onSelectChange,
  ...rest
}: SelectFieldProps<T>) {
  const { dispatch } = useApp()
  const [reactSelectValues, setReactSelectValues] = useState<
    SelectFieldValue<T>[]
  >([])
  const [reactSelectOptions, setReactSelectOptions] = useState<
    SelectFieldValue<T>[]
  >([])

  useEffect(() => {
    setReactSelectValues(
      values.map((value) => ({
        label: titleCase(value as string),
        value,
      }))
    )

    setReactSelectOptions(
      options.map((value) => ({
        label: titleCase(value as string),
        value,
      }))
    )
  }, [options, values])

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
      {label && <FieldsetLabel htmlFor={name}>{label}:</FieldsetLabel>}

      <ReactDropdownSelect<SelectFieldValue<T>>
        multi={multi}
        {...rest}
        name={name}
        values={reactSelectValues ?? []}
        options={reactSelectOptions ?? []}
        onChange={handleChange}
      />
    </Container>
  )
}

export default Select
