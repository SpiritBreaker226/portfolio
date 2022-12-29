import axios from 'axios'
import { useState } from 'react'

import { Post } from '../types'

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
        `${process.env.REACT_APP_BLOG_SERVER_URL}?username=${process.env.REACT_APP_BLOG_USERNAME}`
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
