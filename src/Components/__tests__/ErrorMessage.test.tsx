import { screen } from '@testing-library/react'

import { render } from '../../testUtil'

import { ErrorMessage, ErrorMessageProps } from '../ErrorMessage'

describe('ErrorMessage', () => {
  const setUp = (props: Partial<ErrorMessageProps> = {}) =>
    render(<ErrorMessage {...props} />)

  it('should not show error message', async () => {
    const { container } = setUp({ error: undefined })

    expect(container).toBeEmptyDOMElement()
  })

  describe('when error message is a string', () => {
    it('should display', async () => {
      setUp({ error: 'erroring' })

      await screen.findByText('erroring')
    })
  })
})
