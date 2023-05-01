import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button, ErrorMessage, Textarea, Textbox } from '../Components'
import { useContact } from '../hooks'
import { Contact } from '../types'
import { ContactSchema } from './ContactSchema'

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`

const LinkContainer = styled.p`
  margin-top: 1rem;
`

export const ContactForm: FC = () => {
  const { sendContact, errorFromServer } = useContact()
  const [showThankYou, setShowThankYou] = useState(false)

  if (showThankYou) {
    return (
      <section>
        <h2>Thank You</h2>

        <p>Your contact has been sent</p>

        <LinkContainer>
          <Link to="/">Click here</Link> to go back to homepage
        </LinkContainer>
      </section>
    )
  }

  const handleSubmit = async (contact: Contact) => {
    const wasItSent = await sendContact(contact)

    if (wasItSent) {
      setShowThankYou(true)
    }
  }

  return (
    <section>
      <ErrorMessage error={errorFromServer} />

      <Formik<Contact>
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          question: '',
        }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Textbox
              name="firstName"
              label="First Name"
              placeholder="John"
              disabled={isSubmitting}
            />

            <Textbox
              name="lastName"
              label="Last Name"
              placeholder="Smith"
              disabled={isSubmitting}
            />

            <Textbox
              name="phone"
              label="Phone"
              placeholder="(321) 921-5555"
              type="phone"
              disabled={isSubmitting}
            />

            <Textbox
              name="email"
              label="Email"
              placeholder="john.smith@somedomain.com"
              type="email"
              disabled={isSubmitting}
            />

            <Textarea
              name="question"
              label="Question"
              placeholder="questions or comments"
              disabled={isSubmitting}
              rows={6}
            />

            <ButtonContainer>
              <Button type="submit" isLoading={isSubmitting}>
                Send
              </Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </section>
  )
}
