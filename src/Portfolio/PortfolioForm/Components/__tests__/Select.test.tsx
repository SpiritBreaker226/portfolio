import { fireEvent, screen, waitFor } from '@testing-library/react'

import { render } from '../../../../testUtil'
import Select, { SelectFieldProps } from '../Select'

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

  describe('when selecting an element', () => {
    it('should call a single element', async () => {
      setUp({
        name: 'test',
        multi: false,
        options: ['Omega'],
      })

      fireEvent.keyDown(screen.getByLabelText('Dropdown select'), {
        keyCode: 40,
      })
      await screen.findByText('Omega', { exact: false })
      fireEvent.click(screen.getByText('Omega', { exact: false }))

      await waitFor(() =>
        expect(mockOnSelectChange).toHaveBeenCalledWith('Omega')
      )
    })
  })

  describe('when multiple elements', () => {
    it('should call an array of elements', async () => {
      setUp({
        name: 'test',
        label: 'testing',
        multi: true,
        options: ['Omega', 'Alpha'],
      })

      fireEvent.keyDown(screen.getByLabelText('Dropdown select'), {
        keyCode: 40,
      })
      await screen.findByRole('option', { name: /omega/i })
      fireEvent.click(screen.getByRole('option', { name: /omega/i }))

      await waitFor(() =>
        expect(mockOnSelectChange).toHaveBeenCalledWith(['Omega'])
      )
    })
  })
})
