import { render } from '@testing-library/react'

import { mockOsColorScheme } from '../testUtil'
import { darkTheme } from './theme'
import { ThemeProvider } from './ThemeProvider'

describe('GIVEN using ThemeProvider', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme
  })

  test('WHEN the page was painted dark and the OS prefers light THEN the body uses the dark background', () => {
    document.documentElement.dataset.theme = 'dark'
    mockOsColorScheme('light')

    render(<ThemeProvider>{null}</ThemeProvider>)

    expect(document.body).toHaveStyle(
      `background-color: ${darkTheme.colors.bg}`
    )
  })
})
