import { act, renderHook } from '@testing-library/react'

import { mockOsColorScheme } from '../testUtil'
import { darkTheme, lightTheme } from '../theme/theme'
import { useColorScheme } from './useColorScheme'

describe('useColorScheme', () => {
  afterEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
    document.documentElement.removeAttribute('style')
    document.head.innerHTML = ''
  })

  test('GIVEN the no-flash script chose dark and the OS prefers light WHEN the hook mounts THEN the mode is dark', () => {
    document.documentElement.dataset.theme = 'dark'
    mockOsColorScheme('light')

    const { result } = renderHook(() => useColorScheme())

    expect(result.current.mode).toBe('dark')
  })

  test('GIVEN no data-theme is set and the OS prefers dark WHEN the hook mounts THEN the mode is dark', () => {
    mockOsColorScheme('dark')

    const { result } = renderHook(() => useColorScheme())

    expect(result.current.mode).toBe('dark')
  })

  test('GIVEN light mode WHEN toggling THEN the page switches to dark and remembers it', () => {
    document.head.innerHTML = `<meta name="theme-color" content="${lightTheme.colors.bg}" />`
    document.documentElement.dataset.theme = 'light'
    mockOsColorScheme('light')

    const { result } = renderHook(() => useColorScheme())

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

  test('GIVEN nothing is saved WHEN the OS switches to dark THEN the page follows without saving it', () => {
    document.documentElement.dataset.theme = 'light'
    const os = mockOsColorScheme('light')

    const { result } = renderHook(() => useColorScheme())

    act(() => os.changeTo('dark'))

    expect(result.current.mode).toBe('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('theme')).toBeNull()
  })

  test('GIVEN the visitor toggled to dark WHEN the OS switches to light THEN the page stays dark', () => {
    document.documentElement.dataset.theme = 'light'
    const os = mockOsColorScheme('light')

    const { result } = renderHook(() => useColorScheme())

    act(() => result.current.toggle())
    act(() => os.changeTo('light'))

    expect(result.current.mode).toBe('dark')
  })

  test('GIVEN dark was saved on an earlier visit WHEN the OS switches to light THEN the page stays dark', () => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.dataset.theme = 'dark'
    const os = mockOsColorScheme('dark')

    const { result } = renderHook(() => useColorScheme())

    act(() => os.changeTo('light'))

    expect(result.current.mode).toBe('dark')
  })
})
