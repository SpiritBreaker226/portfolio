import { render, screen } from '@testing-library/react'
import styled, { ThemeProvider } from 'styled-components'

import { loadingStyle } from './LoadingStyle'
import { lightTheme } from './theme'

const Skeleton = styled.div`
  ${loadingStyle}
`

describe('loadingStyle', () => {
  test('GIVEN a theme with its own loading background WHEN a component uses loadingStyle THEN it uses that background', () => {
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
