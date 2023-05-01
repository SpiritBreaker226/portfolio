import { faker } from '@faker-js/faker'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { contact, render } from '../../testUtil'
import { ContactForm } from '../ContactForm'
import { Contact } from '../../types'

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
  const fillForm = (contactFill: Contact) => {
    fireEvent.change(screen.getByRole('textbox', { name: 'First Name' }), {
      target: { value: contactFill.firstName },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last Name' }), {
      target: { value: contactFill.lastName },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: contactFill.email },
    })

    if (contactFill.phone) {
      // needs a delay so that the phone can enter in the phone number
      fireEvent.change(screen.getByRole('textbox', { name: 'Phone' }), {
        target: { value: contactFill.phone },
      })
    }

    fireEvent.change(screen.getByRole('textbox', { name: 'Question' }), {
      target: { value: contactFill.question },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
  }

  beforeEach(() => {
    mockErrorFromServer = ''
    mockIsLoading = false
  })

  it('should submit a valid contact form', async () => {
    const contactData = { ...contact, phone: '(321) 921-5555' }

    mockSendContact.mockResolvedValue(true)

    setUp()

    fillForm(contactData)

    expect(screen.getByRole('textbox', { name: 'First Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Last Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Phone' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Question' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()

    await waitFor(() =>
      expect(mockSendContact).toHaveBeenCalledWith(contactData)
    )

    await screen.findByText(/thank you/i)
  })

  it('should submit a valid contact form without phone number', async () => {
    const contactData = { ...contact, phone: '' }

    mockSendContact.mockResolvedValue(true)

    setUp()

    fillForm(contactData)

    await waitFor(() =>
      expect(mockSendContact).toHaveBeenCalledWith({
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        question: contactData.question,
      })
    )

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

  describe('when testing phone number', () => {
    it('should not show error on 3219215555', async () => {
      setUp()

      // needs a delay so that the phone can enter in the phone number
      fireEvent.change(screen.getByRole('textbox', { name: 'Phone' }), {
        target: { value: '3219215555' },
      })

      expect(
        screen.queryByText('Phone number is an invalid')
      ).not.toBeInTheDocument()
    })
  })
})
