import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './GlobalStyle'
import { theme } from './theme'

describe('GlobalStyle', () => {
  test('GIVEN a theme with its own text colour WHEN GlobalStyle renders THEN the body uses that colour', () => {
    const textColor = '#123456'

    render(
      <ThemeProvider
        theme={{ ...theme, colors: { ...theme.colors, text: textColor } }}
      >
        <GlobalStyle />
      </ThemeProvider>
    )

    expect(document.body).toHaveStyle({ color: textColor })
  })
})
