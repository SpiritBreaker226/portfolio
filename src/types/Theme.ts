/** Design tokens the styled-components `ThemeProvider` passes to every styled component. */
export type Theme = {
  mobile: {
    turnOnAt: string
  }
  colors: {
    bg: string
    surface: string
    border: string
    text: string
    primary: string
    /**
     * Colour for text, icons and borders drawn on a `primary` background,
     * such as the banner title, active nav link, button label and tags.
     * It isn't a shade of `primary`; it's whichever colour reads clearly
     * against it, so it can be light in one theme and dark in another
     * (white on the light theme's dark red, near-black on the dark theme's
     * pink).
     */
    onPrimary: string
    hoverForLinks: string
    error: string
  }
  loading: {
    background: string
    backgroundAfter: string
  }
  pageStyles: {
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
