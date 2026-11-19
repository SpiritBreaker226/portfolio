import { ColorScheme } from '../types'

/**
 * Narrows a stored string to a `ColorScheme`, so a stale or hand-edited
 * `localStorage` value never reaches the theme.
 *
 * @example
 * isColorScheme('Pablo Honey')
 * // => false
 */
const isColorScheme = (value: string | null): value is ColorScheme =>
  value === 'light' || value === 'dark'

/**
 * Reads the scheme saved by the theme toggle. Safari private mode and
 * blocked site data throw on storage access, so any error counts as
 * nothing saved instead of breaking the page.
 *
 * @example
 * localStorage.setItem('theme', 'Pablo Honey')
 * getSavedColorScheme()
 * // => null
 */
const getSavedColorScheme = (): ColorScheme | null => {
  try {
    const savedScheme = localStorage.getItem('theme')

    return isColorScheme(savedScheme) ? savedScheme : null
  } catch (error) {
    return null
  }
}

/**
 * Picks the colour scheme the site should render in: the scheme saved by
 * the theme toggle when there is a valid one, otherwise the OS
 * `prefers-color-scheme` setting. The toggle's choice wins so a visitor's
 * override sticks across visits.
 *
 * @example
 * localStorage.setItem('theme', 'dark')
 * resolveColorScheme()
 * // => 'dark'
 */
export const resolveColorScheme = (): ColorScheme => {
  const osScheme = matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  return getSavedColorScheme() ?? osScheme
}

/**
 * Saves the scheme picked with the theme toggle, so it overrides the OS
 * setting on the next visit. When storage is blocked the toggle still
 * works for the current page; only the saved choice is lost.
 *
 * @example
 * saveColorScheme('dark')
 * // => localStorage.getItem('theme') === 'dark'
 */
export const saveColorScheme = (scheme: ColorScheme) => {
  try {
    localStorage.setItem('theme', scheme)
  } catch (error) {
    // Nothing to do: the scheme still applies until the page reloads.
  }
}
