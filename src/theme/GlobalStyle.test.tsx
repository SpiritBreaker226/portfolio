import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './GlobalStyle'
import { lightTheme } from './theme'

describe('GIVEN using GlobalStyle', () => {
  test('WHEN the theme has its own text colour THEN the body uses that colour', () => {
    const textColor = '#123456'

    render(
      <ThemeProvider
        theme={{
          ...lightTheme,
          colors: { ...lightTheme.colors, text: textColor },
        }}
      >
        <GlobalStyle />
      </ThemeProvider>
    )

    expect(document.body).toHaveStyle({ color: textColor })
  })
})
