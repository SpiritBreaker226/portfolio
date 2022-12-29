import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    border: '#46505a',
    text: '#46505a',
    secondary: '#fff',
    primary: '#aa0f13;',
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
