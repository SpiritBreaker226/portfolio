import { faker } from '@faker-js/faker'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { contact, render } from '../../testUtil'
import { ContactForm } from '../ContactForm'

const mockSendContact = jest.fn()
let mockErrorFromServer = ''
let mockIsLoading = false

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useContact: () => ({
    sendContact: mockSendContact,
    errorFromServer: mockErrorFromServer,
    isLoading: mockIsLoading,
  }),
}))

describe('ContactForm', () => {
  const setUp = () => render(<ContactForm />)
  const fillForm = () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'First Name' }), {
      target: { value: faker.name.firstName() },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last Name' }), {
      target: { value: faker.name.lastName() },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: faker.internet.email() },
    })
    // needs a delay so that the phone can enter in the phone number
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone' }), {
      target: { value: '+1 (321) 921-5555' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Question' }), {
      target: { value: faker.hacker.abbreviation() },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
  }

  beforeEach(() => {
    mockErrorFromServer = ''
    mockIsLoading = false
  })

  it('should submit a valid contact form', async () => {
    mockSendContact.mockResolvedValue(true)

    setUp()

    fillForm()

    expect(screen.getByRole('textbox', { name: 'First Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Last Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Phone' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Question' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()

    await waitFor(() => expect(mockSendContact).toHaveBeenCalled())

    await screen.findByText(/thank you/i)
  })

  describe('when there is an error', () => {
    it('should display error from useContact', async () => {
      mockSendContact.mockResolvedValue(false)

      mockErrorFromServer = 'something want wrong'

      setUp()

      await screen.findByText(/something want wrong/i)
    })
  })
})
