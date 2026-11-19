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
    bg: '#FAFAF9',
    surface: '#FFFFFF',
    border: '#E3E1DD',
    text: '#22282F',
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
    skills: {
      barColor: 'rgba(170, 15, 19, 1)',
    },
  },
}
