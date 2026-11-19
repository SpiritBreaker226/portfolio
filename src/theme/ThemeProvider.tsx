import { FC, ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

// Not the `../hooks` barrel: it reaches `Components`, whose `PostSkeleton`
// imports this folder's barrel, which would make an import cycle.
import { useColorScheme } from '../hooks/useColorScheme'
import GlobalStyle from './GlobalStyle'
import { darkTheme, lightTheme } from './theme'

export type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { mode } = useColorScheme()

  return (
    <StyledThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  )
}
