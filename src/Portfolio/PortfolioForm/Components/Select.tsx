import { useEffect, useState } from 'react'
import ReactDropdownSelect, {
  SelectProps as ReactDropdownSelectProps,
} from 'react-dropdown-select'
import styled, { useTheme } from 'styled-components'

import { titleCase } from '../../../AppBody/helpers'
import { fieldLabelStyle, fieldStyle } from '../../../Components'
import { useApp } from '../../../context'
import { Types } from '../../../types'

const Container = styled.div`
  display: flex;
  flex-flow: column;

  .react-dropdown-select {
    ${fieldStyle}
    padding: 4px 12px;
    border-color: ${({ theme }) => theme.colors.fieldBorder};

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:focus-within {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      box-shadow: none;
    }
  }

  .react-dropdown-select-input {
    color: ${({ theme }) => theme.colors.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.muted};
    }
  }

  .react-dropdown-select-dropdown {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  }

  .react-dropdown-select-item {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};

    &:hover,
    &.react-dropdown-select-item-active {
      background: ${({ theme }) => theme.colors.surfaceAlt};
    }

    &.react-dropdown-select-item-selected {
      border-bottom-color: ${({ theme }) => theme.colors.border};
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.onPrimary};
    }
  }

  .react-dropdown-select-no-data {
    color: ${({ theme }) => theme.colors.muted};
  }

  .react-dropdown-select-option {
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`

const FieldsetLabel = styled.span`
  ${fieldLabelStyle}
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
  const labelId = `${name}-label`

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
      {label && <FieldsetLabel id={labelId}>{label}</FieldsetLabel>}

      <ReactDropdownSelect<SelectFieldValue<T>>
        color={theme.colors.primary}
        style={{
          minWidth: '5rem',
        }}
        multi={multi}
        // The library renders a role-less `div` and hard-codes
        // `aria-label="Dropdown select"` on every dropdown. It spreads
        // `additionalProps` over both, so the control becomes a combobox
        // named by its visible label.
        additionalProps={{
          role: 'combobox',
          ...(label && { 'aria-labelledby': labelId }),
        }}
        {...rest}
        name={name}
        values={reactSelectValues}
        options={options}
        onChange={handleChange}
      />
    </Container>
  )
}
