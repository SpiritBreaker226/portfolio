import { mockOsColorScheme } from '../testUtil'
import { resolveColorScheme, saveColorScheme } from './colorScheme'

describe('GIVEN using colorScheme', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    localStorage.clear()
  })

  describe('WHEN resolving the colour scheme', () => {
    test('AND dark is saved while the OS prefers light THEN it is dark', () => {
      localStorage.setItem('theme', 'dark')
      mockOsColorScheme('light')

      expect(resolveColorScheme()).toBe('dark')
    })

    test.each(['dark', 'light'] as const)(
      'AND nothing is saved while the OS prefers %s THEN it follows the OS',
      (scheme) => {
        mockOsColorScheme(scheme)

        expect(resolveColorScheme()).toBe(scheme)
      }
    )

    test('AND an unknown value is saved while the OS prefers dark THEN it is dark', () => {
      localStorage.setItem('theme', 'Pablo Honey')
      mockOsColorScheme('dark')

      expect(resolveColorScheme()).toBe('dark')
    })

    test('AND reading storage throws while the OS prefers dark THEN it is dark', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('The Bends')
      })
      mockOsColorScheme('dark')

      expect(resolveColorScheme()).toBe('dark')
    })
  })

  describe('WHEN saving dark', () => {
    test('AND storage works THEN storage holds dark', () => {
      saveColorScheme('dark')

      expect(localStorage.getItem('theme')).toBe('dark')
    })

    test('AND writing storage throws THEN it does not throw', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('OK Computer')
      })

      expect(() => saveColorScheme('dark')).not.toThrow()
    })
  })
})
