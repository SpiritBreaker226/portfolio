import axios from 'axios'
import { useState } from 'react'

import { Contact } from '../types'

export const useContact = () => {
  const [errorFromServer, setErrorFromServer] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendContact = async (contact: Contact) => {
    try {
      setIsLoading(true)

      if (errorFromServer) {
        setErrorFromServer('')
      }

      await axios.post<Contact>(
        `${process.env.REACT_APP_THIN_BACKEND_SERVER_URL}/send-contact`,
        contact
      )

      return true
    } catch (e) {
      setErrorFromServer('Something went wrong with sending contact')
    } finally {
      setIsLoading(false)
    }

    return false
  }

  return { sendContact, errorFromServer, isLoading }
}
