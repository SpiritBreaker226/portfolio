/// <reference types="node" />
import { readFileSync } from 'fs'
import { join } from 'path'

import { mockOsColorScheme } from '../testUtil'
import { darkTheme, lightTheme } from './theme'

const indexHtml = readFileSync(join(__dirname, '../../index.html'), 'utf8')

/**
 * Runs the inline (no `src`) `<script>` from `index.html` in jsdom, so the
 * test exercises the exact code the browser runs before first paint. The
 * page's `<head>` is copied in first so the script finds the same tags,
 * such as `<meta name="theme-color">`, it finds in the browser. Scripts
 * inserted through `innerHTML` don't run, so the copy doesn't run it twice.
 *
 * @example
 * runNoFlashScript()
 * // => document.documentElement has data-theme set by the script
 */
const runNoFlashScript = () => {
  const page = new DOMParser().parseFromString(indexHtml, 'text/html')
  const script = page.querySelector('script:not([src])')

  document.head.innerHTML = page.head.innerHTML
  new Function(script?.textContent ?? '')()
}

describe('GIVEN using the no-flash script', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
    delete document.documentElement.dataset.theme
    document.documentElement.removeAttribute('style')
    document.head.innerHTML = ''
  })

  describe('WHEN the script runs', () => {
    test('AND dark is saved while the OS prefers light THEN the page is dark', () => {
      localStorage.setItem('theme', 'dark')
      mockOsColorScheme('light')

      runNoFlashScript()

      expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    })

    test.each(['dark', 'light'] as const)(
      'AND nothing is saved while the OS prefers %s THEN the page follows the OS',
      (scheme) => {
        mockOsColorScheme(scheme)

        runNoFlashScript()

        expect(document.documentElement).toHaveAttribute('data-theme', scheme)
      }
    )

    test('AND an unknown value is saved while the OS prefers dark THEN the page is dark', () => {
      localStorage.setItem('theme', 'Pablo Honey')
      mockOsColorScheme('dark')

      runNoFlashScript()

      expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    })

    test('AND reading storage throws while the OS prefers dark THEN the page is dark', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('The Bends')
      })
      mockOsColorScheme('dark')

      runNoFlashScript()

      expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    })

    test.each([
      ['dark', darkTheme.colors.bg],
      ['light', lightTheme.colors.bg],
    ] as const)(
      'AND the OS prefers %s THEN the browser UI follows it and the theme colour is %s',
      (scheme, themeColor) => {
        mockOsColorScheme(scheme)

        runNoFlashScript()

        expect(document.documentElement).toHaveStyle(`color-scheme: ${scheme}`)
        expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
          'content',
          themeColor
        )
      }
    )

    test.each([
      ['dark', darkTheme.colors.bg],
      ['light', lightTheme.colors.bg],
    ] as const)(
      'AND the OS prefers %s THEN the page background is %s before the app styles load',
      (scheme, background) => {
        mockOsColorScheme(scheme)

        runNoFlashScript()

        expect(document.documentElement).toHaveStyle(
          `background-color: ${background}`
        )
      }
    )
  })
})
