import { useEffect, useState } from 'react'

import {
  getSavedColorScheme,
  isColorScheme,
  resolveColorScheme,
  saveColorScheme,
} from '../helpers'
import { darkTheme, lightTheme } from '../theme/theme'
import { ColorScheme } from '../types'

/**
 * Reads the scheme the no-flash script in `index.html` already painted,
 * so React's first render matches it. Without the script (in tests, or if
 * it failed) the scheme is resolved from storage and the OS instead.
 *
 * @example
 * getInitialColorScheme()
 * // => 'dark' when <html data-theme="dark">
 */
const getInitialColorScheme = (): ColorScheme => {
  const paintedScheme = document.documentElement.dataset.theme

  return isColorScheme(paintedScheme) ? paintedScheme : resolveColorScheme()
}

/**
 * Applies a scheme to the parts of the page outside React: `data-theme`
 * (the no-flash `<style>` reads it), `color-scheme` (native controls and
 * scrollbars) and the `theme-color` meta (the mobile browser toolbar).
 *
 * @example
 * applyColorScheme('dark')
 * // => <html data-theme="dark" style="color-scheme: dark;">
 */
const applyColorScheme = (scheme: ColorScheme) => {
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  document.documentElement.dataset.theme = scheme
  document.documentElement.style.colorScheme = scheme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme.colors.bg)
}

/**
 * Tracks the site's colour scheme, starting from the scheme the browser
 * already painted, and applies every change to the page. It follows OS
 * `prefers-color-scheme` changes until the visitor overrides them: either
 * by calling `toggle`, which saves the choice, or with a choice saved on
 * an earlier visit. OS changes are never saved, so they can't become an
 * override.
 *
 * @example
 * const { mode, toggle } = useColorScheme()
 * toggle()
 * // => mode flips between 'light' and 'dark'
 */
export const useColorScheme = () => {
  const [mode, setMode] = useState(getInitialColorScheme)
  const [isOverridden, setIsOverridden] = useState(
    () => getSavedColorScheme() !== null
  )

  useEffect(() => {
    applyColorScheme(mode)
  }, [mode])

  useEffect(() => {
    if (isOverridden) {
      return
    }

    const osQuery = matchMedia('(prefers-color-scheme: dark)')
    const followOs = (event: MediaQueryListEvent) =>
      setMode(event.matches ? 'dark' : 'light')

    osQuery.addEventListener('change', followOs)

    return () => osQuery.removeEventListener('change', followOs)
  }, [isOverridden])

  const toggle = () => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'

    saveColorScheme(nextMode)
    setMode(nextMode)
    setIsOverridden(true)
  }

  return { mode, toggle }
}
