import { fireEvent, screen, waitFor } from '@testing-library/react'

import { render } from '../../../testUtil'
import { Select, SelectFieldProps } from './Select'

const mockOnSelectChange = jest.fn()

describe('Select', () => {
  const defaultProps: SelectFieldProps<string> = {
    name: 'test',
    values: [],
    options: [],
    onSelectChange: mockOnSelectChange,
  }
  const setUp = (props: Partial<SelectFieldProps<string>> = {}) =>
    render(<Select<string> {...defaultProps} {...props} />)

  it('should show label', async () => {
    setUp({ name: 'test', label: 'World' })

    await screen.findByText(/world/i)
  })

  test('GIVEN a selected value WHEN the select renders THEN it shows the label of its option', () => {
    setUp({
      multi: true,
      values: ['ok computer'],
      options: [{ label: 'OK Computer', value: 'ok computer' }],
    })

    expect(screen.getByText('OK Computer')).toBeInTheDocument()
  })

  describe('when selecting an element', () => {
    it('should call a single element', async () => {
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
  })

  describe('when multiple elements', () => {
    it('should call an array of elements', async () => {
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
})
