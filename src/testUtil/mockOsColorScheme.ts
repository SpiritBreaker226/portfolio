import { ColorScheme } from '../types'

const darkQuery = '(prefers-color-scheme: dark)'

/**
 * Stubs `window.matchMedia` so only the `prefers-color-scheme: dark` query
 * matches, and only when the OS is meant to prefer dark. jsdom has no
 * `matchMedia`, and any other query gets `matches: false`, so code that
 * asks the wrong query fails its test. The returned `changeTo` switches
 * the OS scheme and fires `change` to the query's listeners, the way a
 * real OS switch does.
 *
 * @example
 * const os = mockOsColorScheme('light')
 * os.changeTo('dark')
 * // => listeners on '(prefers-color-scheme: dark)' get { matches: true }
 */
export const mockOsColorScheme = (scheme: ColorScheme) => {
  let currentScheme = scheme
  const listeners = new Set<(event: MediaQueryListEvent) => void>()

  window.matchMedia = jest.fn(
    (query: string) =>
      ({
        get matches() {
          return query === darkQuery && currentScheme === 'dark'
        },
        addEventListener: (
          _type: string,
          listener: (event: MediaQueryListEvent) => void
        ) => {
          listeners.add(listener)
        },
        removeEventListener: (
          _type: string,
          listener: (event: MediaQueryListEvent) => void
        ) => {
          listeners.delete(listener)
        },
      }) as MediaQueryList
  )

  return {
    changeTo: (nextScheme: ColorScheme) => {
      currentScheme = nextScheme
      listeners.forEach((listener) =>
        listener({ matches: nextScheme === 'dark' } as MediaQueryListEvent)
      )
    },
  }
}
