import { act, renderHook } from '@testing-library/react'
import axios from 'axios'

import { post } from '../testUtil'
import { Post as PostType } from '../types'
import { useBlog } from './useBlog'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('GIVEN using useBlog', () => {
  const setUp = () => renderHook(() => useBlog()).result

  test('WHEN posts are fetched THEN it returns them', async () => {
    mockedAxios.get.mockResolvedValue({ data: [post] })
    const result = setUp()

    const posts = (await result.current.getPosts()) as PostType[]

    expect(posts[0].id).toEqual(post.id)
  })

  test('WHEN the server fails and then recovers THEN the error message shows and then clears', async () => {
    const result = setUp()

    mockedAxios.get.mockRejectedValue(new Error('network error'))
    await act(async () => {
      await result.current.getPosts()
    })

    expect(result.current.errorFromServer).toContain('Something went wrong')

    mockedAxios.get.mockResolvedValue({ data: [post] })
    await act(async () => {
      await result.current.getPosts()
    })

    expect(result.current.errorFromServer).toEqual('')
  })
})
