import type { Theme } from '../types'

/**
 * The site's light colour scheme and layout tokens, passed to every styled
 * component through the styled-components `ThemeProvider`.
 *
 * @example
 * lightTheme.colors.primary
 * // => '#AA0F13'
 */
export const lightTheme: Theme = {
  mobile: {
    turnOnAt: '576px',
  },
  colors: {
    bg: '#fff',
    surface: '#FFFFFF',
    border: '#46505a',
    text: '#46505a',
    primary: '#AA0F13',
    onPrimary: '#FFFFFF',
    hoverForLinks: '#7e0f13',
    error: '#ff0000',
  },
  loading: {
    background: '#ccc',
    backgroundAfter:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
  },
  pageStyles: {
    about: {
      bg: '#46505a',
    },
    skills: {
      barColor: 'rgba(170, 15, 19, 1)',
    },
  },
}
