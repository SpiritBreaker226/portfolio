import { render, screen } from '@testing-library/react'
import styled, { ThemeProvider } from 'styled-components'

import { loadingStyle } from './LoadingStyle'
import { lightTheme } from './theme'

const Skeleton = styled.div`
  ${loadingStyle}
`

describe('GIVEN using loadingStyle', () => {
  test('WHEN the theme has its own loading background THEN the component uses that background', () => {
    const background = '#123456'

    render(
      <ThemeProvider
        theme={{
          ...lightTheme,
          loading: { ...lightTheme.loading, background },
        }}
      >
        <Skeleton>Pablo Honey</Skeleton>
      </ThemeProvider>
    )

    expect(screen.getByText('Pablo Honey')).toHaveStyle(
      `background-color: ${background}`
    )
  })
})
