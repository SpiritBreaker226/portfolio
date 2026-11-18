import axios from 'axios'
import { useState } from 'react'

import { Post } from '../types'
import { config } from '../config'

export const useBlog = () => {
  const [errorFromServer, setErrorFromServer] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const getPosts = async () => {
    try {
      setIsLoading(true)

      if (errorFromServer) {
        setErrorFromServer('')
      }

      const res = await axios.get<Post[]>(
        `${config.blogServerUrl}?username=${config.blogUsername}`
      )

      return await res.data
    } catch (e) {
      setErrorFromServer('Something went wrong with getting Blog')
    } finally {
      setIsLoading(false)
    }
  }

  return { errorFromServer, isLoading, getPosts }
}
