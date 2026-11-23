import { screen } from '@testing-library/react'

import { render } from '../testUtil'

import { ErrorMessage, ErrorMessageProps } from './ErrorMessage'

describe('GIVEN using ErrorMessage', () => {
  const setUp = (props: Partial<ErrorMessageProps> = {}) =>
    render(<ErrorMessage {...props} />)

  test('WHEN there is no error THEN it renders nothing', () => {
    const { container } = setUp({ error: undefined })

    expect(container).toBeEmptyDOMElement()
  })

  test('WHEN the error is a string THEN it shows the message', async () => {
    setUp({ error: 'erroring' })

    expect(await screen.findByText('erroring')).toBeInTheDocument()
  })
})
