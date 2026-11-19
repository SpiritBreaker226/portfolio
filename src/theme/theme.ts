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
    surfaceAlt: '#F1EFEC',
    border: '#E3E1DD',
    text: '#22282F',
    primary: '#AA0F13',
    onPrimary: '#FFFFFF',
    hoverForLinks: '#7e0f13',
    error: '#ff0000',
    toggleIcon: '#2563EB',
    toggleTint: '#E8EFFD',
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

/**
 * The site's dark colour scheme, with the same keys as `lightTheme`. Text
 * colours keep at least 4.5:1 contrast on `bg` and `surface`. The
 * no-flash script in `index.html` repeats `colors.bg`, since it runs
 * before any module loads.
 *
 * @example
 * darkTheme.colors.bg
 * // => '#111417'
 */
export const darkTheme: Theme = {
  mobile: lightTheme.mobile,
  colors: {
    bg: '#111417',
    surface: '#181C21',
    surfaceAlt: '#222830',
    border: '#2B323B',
    text: '#E9ECEF',
    primary: '#F2666A',
    onPrimary: '#111417',
    hoverForLinks: '#F79A9C',
    error: '#FF8080',
    toggleIcon: '#FACC15',
    toggleTint: 'rgba(250, 204, 21, 0.14)',
  },
  loading: {
    background: '#2B323B',
    backgroundAfter:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)',
  },
  pageStyles: {
    skills: {
      barColor: '#F2666A',
    },
  },
}
