import { mockOsColorScheme } from '../testUtil'
import { resolveColorScheme, saveColorScheme } from './colorScheme'

describe('resolveColorScheme', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    localStorage.clear()
  })

  test('GIVEN dark is saved and the OS prefers light WHEN resolving THEN it is dark', () => {
    localStorage.setItem('theme', 'dark')
    mockOsColorScheme('light')

    expect(resolveColorScheme()).toBe('dark')
  })

  test.each(['dark', 'light'] as const)(
    'GIVEN nothing is saved and the OS prefers %s WHEN resolving THEN it follows the OS',
    (scheme) => {
      mockOsColorScheme(scheme)

      expect(resolveColorScheme()).toBe(scheme)
    }
  )

  test('GIVEN an unknown value is saved and the OS prefers dark WHEN resolving THEN it is dark', () => {
    localStorage.setItem('theme', 'Pablo Honey')
    mockOsColorScheme('dark')

    expect(resolveColorScheme()).toBe('dark')
  })

  test('GIVEN reading storage throws and the OS prefers dark WHEN resolving THEN it is dark', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('The Bends')
    })
    mockOsColorScheme('dark')

    expect(resolveColorScheme()).toBe('dark')
  })
})

describe('saveColorScheme', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    localStorage.clear()
  })

  test('GIVEN dark WHEN saving THEN storage holds dark', () => {
    saveColorScheme('dark')

    expect(localStorage.getItem('theme')).toBe('dark')
  })

  test('GIVEN writing storage throws WHEN saving THEN it does not throw', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('OK Computer')
    })

    expect(() => saveColorScheme('dark')).not.toThrow()
  })
})
