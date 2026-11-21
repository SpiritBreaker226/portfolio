import type { Theme } from '../types'

const lightColors: Theme['colors'] = {
  bg: '#FAFAF9',
  surface: '#FFFFFF',
  surfaceAlt: '#F1EFEC',
  border: '#E3E1DD',
  fieldBorder: '#868E96',
  iconBg: '#FFFFFF',
  text: '#22282F',
  muted: '#58626D',
  primary: '#AA0F13',
  onPrimary: '#FFFFFF',
  hoverForLinks: '#7e0f13',
  error: '#CC0000',
  toggleIcon: '#2563EB',
  toggleTint: '#E8EFFD',
}

const darkColors: Theme['colors'] = {
  bg: '#111417',
  surface: '#181C21',
  surfaceAlt: '#222830',
  border: '#2B323B',
  fieldBorder: '#69737E',
  iconBg: '#E9ECEF',
  text: '#E9ECEF',
  muted: '#A7B0BA',
  primary: '#F2666A',
  onPrimary: '#111417',
  hoverForLinks: '#F79A9C',
  error: '#FF8080',
  toggleIcon: '#FACC15',
  toggleTint: 'rgba(250, 204, 21, 0.14)',
}

/**
 * The site's light colour scheme and layout tokens, passed to every styled
 * component through the styled-components `ThemeProvider`. The no-flash
 * script and `<style>` in `index.html` repeat `colors.bg`, since they run
 * before any module loads.
 *
 * @example
 * lightTheme.colors.primary
 * // => '#AA0F13'
 */
export const lightTheme: Theme = {
  media: {
    tablet: '@media (min-width: 576px)',
    desktop: '@media (min-width: 1024px)',
  },
  colors: lightColors,
  loading: {
    background: lightColors.surfaceAlt,
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
 * no-flash script and `<style>` in `index.html` repeat `colors.bg`, since
 * they run before any module loads.
 *
 * @example
 * darkTheme.colors.bg
 * // => '#111417'
 */
export const darkTheme: Theme = {
  media: lightTheme.media,
  colors: darkColors,
  loading: {
    background: darkColors.surfaceAlt,
    backgroundAfter:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)',
  },
  pageStyles: {
    skills: {
      barColor: '#F2666A',
    },
  },
}
