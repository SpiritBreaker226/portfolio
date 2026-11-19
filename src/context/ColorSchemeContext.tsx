import { createContext, useContext } from 'react'

import { ColorScheme } from '../types'

export type ColorSchemeContextValue = {
  mode: ColorScheme
  toggle: () => void
}

/**
 * Shares the one `useColorScheme()` state that `ThemeProvider` owns, so
 * the toggle and the theme can't drift apart the way two separate hook
 * calls would. The default is a light page whose toggle does nothing,
 * for components rendered outside `ThemeProvider`.
 */
export const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  mode: 'light',
  toggle: () => undefined,
})

/**
 * Reads the site's colour scheme and its toggle from `ThemeProvider`.
 *
 * @example
 * const { mode, toggle } = useColorSchemeContext()
 * // => { mode: 'light', toggle: [Function] }
 */
export const useColorSchemeContext = () => useContext(ColorSchemeContext)
