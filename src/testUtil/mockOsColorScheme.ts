import { ColorScheme } from '../types'

/**
 * Stubs `window.matchMedia` so only the `prefers-color-scheme: dark` query
 * matches, and only when the OS is meant to prefer dark. jsdom has no
 * `matchMedia`, and any other query gets `matches: false`, so code that
 * asks the wrong query fails its test.
 *
 * @example
 * mockOsColorScheme('dark')
 * // => matchMedia('(prefers-color-scheme: dark)').matches === true
 */
export const mockOsColorScheme = (scheme: ColorScheme) => {
  window.matchMedia = jest.fn(
    (query: string) =>
      ({
        matches: query === '(prefers-color-scheme: dark)' && scheme === 'dark',
      }) as MediaQueryList
  )
}
