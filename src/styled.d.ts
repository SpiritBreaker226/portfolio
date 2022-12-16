import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      border: string
      text: string
      secondary: string
      primary: string
      hoverForLinks: string
      error: string
    }
    pageStyles: {
      about: {
        bg: string
      }
    }
  }
}
