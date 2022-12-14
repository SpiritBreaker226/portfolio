import { screen } from '@testing-library/react'

import { render } from '../../testUtil'
import { Textbox, TextBoxProps } from '../Textbox'

describe('Textbox', () => {
  const defaultProps: TextBoxProps = {
    name: 'test',
    label: 'Testing the Test',
  }

  const setUp = (props: Partial<TextBoxProps> = {}) =>
    render(<Textbox {...defaultProps} {...props} />)

  it('should show label', async () => {
    setUp({ label: 'testing' })

    await screen.findByText('testing')
  })
})
