import { act, renderHook } from '@testing-library/react'
import axios from 'axios'

import { post } from '../../testUtil'
import { Post as PostType } from '../../types'
import { useBlog } from '../useBlog'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useBlog', () => {
  describe('getPosts', () => {
    it('should get posts', async () => {
      mockedAxios.get.mockResolvedValue({ data: [post] })

      const { result } = renderHook(() => useBlog())

      const posts = (await result.current.getPosts()) as PostType[]

      expect(posts[0].id).toEqual(post.id)
    })

    describe('when there is an error from the server', () => {
      it('should throw an error', async () => {
        const { result } = renderHook(() => useBlog())

        mockedAxios.get.mockRejectedValue(new Error('network error'))

        await act(async () => {
          await result.current.getPosts()
        })

        expect(result.current.errorFromServer).toContain('Something went wrong')

        // Should reset the error message

        mockedAxios.get.mockResolvedValue({ data: [post] })

        await act(async () => {
          await result.current.getPosts()
        })

        expect(result.current.errorFromServer).toEqual('')
      })
    })
  })
})
