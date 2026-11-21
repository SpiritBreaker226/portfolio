/** Design tokens the styled-components `ThemeProvider` passes to every styled component. */
export type Theme = {
  /**
   * Mobile-first media queries. Phone styles are the base, so there is no
   * phone query: tablet starts at 576px and desktop at 1024px.
   */
  media: {
    tablet: string
    desktop: string
  }
  colors: {
    bg: string
    surface: string
    surfaceAlt: string
    border: string
    /**
     * Outline for form fields, such as text inputs and dropdowns. It is
     * darker than `border` so a field's edge keeps 3:1 contrast against
     * the page and card backgrounds.
     */
    fieldBorder: string
    /**
     * Light disc behind project logos, so logos drawn in dark colours stay
     * visible on dark cards.
     */
    iconBg: string
    text: string
    /** Secondary text, such as lead copy, dates, excerpts and the © line. */
    muted: string
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
    toggleIcon: string
    toggleTint: string
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
