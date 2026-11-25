import { fireEvent, screen, waitFor } from '@testing-library/react'

import { render } from '../../../testUtil'
import { Select, SelectFieldProps } from './Select'

const mockOnSelectChange = vi.fn()

describe('GIVEN using Select', () => {
  const defaultProps: SelectFieldProps<string> = {
    name: 'test',
    values: [],
    options: [],
    onSelectChange: mockOnSelectChange,
  }
  const setUp = (props: Partial<SelectFieldProps<string>> = {}) =>
    render(<Select<string> {...defaultProps} {...props} />)

  test('WHEN given a label THEN it shows the label', async () => {
    setUp({ name: 'test', label: 'World' })

    expect(await screen.findByText(/world/i)).toBeInTheDocument()
  })

  test('WHEN a value is selected THEN it shows the label of its option', () => {
    setUp({
      multi: true,
      values: ['ok computer'],
      options: [{ label: 'OK Computer', value: 'ok computer' }],
    })

    expect(screen.getByText('OK Computer')).toBeInTheDocument()
  })

  test('WHEN Backspace is pressed in a single select THEN it keeps its value', () => {
    setUp({
      values: ['the bends'],
      options: [{ label: 'The Bends', value: 'the bends' }],
    })

    fireEvent.keyDown(screen.getByLabelText('Dropdown select'), {
      key: 'Backspace',
    })

    expect(screen.getByText('The Bends')).toBeInTheDocument()
  })

  test('WHEN an option is picked from a single select THEN it reports that value', async () => {
    setUp({
      name: 'test',
      multi: false,
      options: [{ label: 'Omega', value: 'omega' }],
    })

    fireEvent.keyDown(screen.getByLabelText('Dropdown select'), {
      keyCode: 40,
    })
    await screen.findByText('Omega', { exact: false })
    fireEvent.click(screen.getByText('Omega', { exact: false }))

    await waitFor(() =>
      expect(mockOnSelectChange).toHaveBeenCalledWith('omega')
    )
  })

  test('WHEN an option is picked from a multi select THEN it reports the values as a list', async () => {
    setUp({
      name: 'test',
      label: 'testing',
      multi: true,
      options: [
        { label: 'Omega', value: 'omega' },
        { label: 'Alpha', value: 'alpha' },
      ],
    })

    fireEvent.keyDown(screen.getByRole('combobox', { name: 'testing' }), {
      keyCode: 40,
    })
    await screen.findByRole('option', { name: /omega/i })
    fireEvent.click(screen.getByRole('option', { name: /omega/i }))

    await waitFor(() =>
      expect(mockOnSelectChange).toHaveBeenCalledWith(['omega'])
    )
  })
})
