import { act, renderHook } from '@testing-library/react'

import { mockOsColorScheme } from '../testUtil'
import { darkTheme, lightTheme } from '../theme/theme'
import { useColorScheme } from './useColorScheme'

describe('GIVEN using useColorScheme', () => {
  const setUp = () => renderHook(() => useColorScheme()).result

  afterEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
    document.documentElement.removeAttribute('style')
    document.head.innerHTML = ''
  })

  test('WHEN the no-flash script chose dark and the OS prefers light THEN the mode is dark', () => {
    document.documentElement.dataset.theme = 'dark'
    mockOsColorScheme('light')

    const result = setUp()

    expect(result.current.mode).toBe('dark')
  })

  test('WHEN no data-theme is set and the OS prefers dark THEN the mode is dark', () => {
    mockOsColorScheme('dark')

    const result = setUp()

    expect(result.current.mode).toBe('dark')
  })

  test('WHEN toggled from light mode THEN the page switches to dark and remembers it', () => {
    document.head.innerHTML = `<meta name="theme-color" content="${lightTheme.colors.bg}" />`
    document.documentElement.dataset.theme = 'light'
    mockOsColorScheme('light')
    const result = setUp()

    act(() => result.current.toggle())

    expect(result.current.mode).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(document.documentElement).toHaveStyle('color-scheme: dark')
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      'content',
      darkTheme.colors.bg
    )
  })

  describe('WHEN the OS changes colour scheme', () => {
    test('AND nothing is saved THEN the page follows it without saving', () => {
      document.documentElement.dataset.theme = 'light'
      const os = mockOsColorScheme('light')
      const result = setUp()

      act(() => os.changeTo('dark'))

      expect(result.current.mode).toBe('dark')
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
      expect(localStorage.getItem('theme')).toBeNull()
    })

    test('AND the visitor toggled to dark THEN the page stays dark', () => {
      document.documentElement.dataset.theme = 'light'
      const os = mockOsColorScheme('light')
      const result = setUp()

      act(() => result.current.toggle())
      act(() => os.changeTo('light'))

      expect(result.current.mode).toBe('dark')
    })

    test('AND dark was saved on an earlier visit THEN the page stays dark', () => {
      localStorage.setItem('theme', 'dark')
      document.documentElement.dataset.theme = 'dark'
      const os = mockOsColorScheme('dark')
      const result = setUp()

      act(() => os.changeTo('light'))

      expect(result.current.mode).toBe('dark')
    })
  })
})
