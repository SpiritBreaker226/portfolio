import { act, renderHook } from '@testing-library/react'
import axios from 'axios'

import { contact } from '../../testUtil'
import { Contact as ContactType } from '../../types'
import { useContact } from '../useContact'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useContact', () => {
  describe('sendContact', () => {
    it('should send a post', async () => {
      mockedAxios.post.mockResolvedValue({ data: contact })

      const { result } = renderHook(() => useContact())

      expect(await result.current.sendContact(contact)).toBeTruthy()
    })

    describe('when there is an error from the server', () => {
      it('should throw an error', async () => {
        const { result } = renderHook(() => useContact())

        mockedAxios.post.mockRejectedValue(new Error('network error'))

        await act(async () => {
          await result.current.sendContact(contact)
        })

        expect(result.current.errorFromServer).toContain('Something went wrong')

        // Should reset the error message

        mockedAxios.post.mockResolvedValue({ data: contact })

        await act(async () => {
          await result.current.sendContact(contact)
        })

        expect(result.current.errorFromServer).toEqual('')
      })
    })
  })
})
