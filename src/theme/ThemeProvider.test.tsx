import { render } from '@testing-library/react'

import { mockOsColorScheme } from '../testUtil'
import { darkTheme } from './theme'
import { ThemeProvider } from './ThemeProvider'

describe('ThemeProvider', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme
  })

  test('GIVEN the page was painted dark and the OS prefers light WHEN the provider renders THEN the body uses the dark background', () => {
    document.documentElement.dataset.theme = 'dark'
    mockOsColorScheme('light')

    render(<ThemeProvider>{null}</ThemeProvider>)

    expect(document.body).toHaveStyle(
      `background-color: ${darkTheme.colors.bg}`
    )
  })
})
