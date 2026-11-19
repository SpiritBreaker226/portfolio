/** Design tokens the styled-components `ThemeProvider` passes to every styled component. */
export type Theme = {
  mobile: {
    turnOnAt: string
  }
  colors: {
    border: string
    text: string
    secondary: string
    primary: string
    hoverForLinks: string
    error: string
  }
  loading: {
    background: string
    backgroundAfter: string
  }
  pageStyles: {
    about: {
      bg: string
    }
    skills: {
      barColor: string
    }
  }
}

// styled-components types `props.theme` and `useTheme()` as its empty
// `DefaultTheme` interface. Only interfaces merge across declarations, so
// `DefaultTheme` extends `Theme` here to give every styled component the
// typed tokens.
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
