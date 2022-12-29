import { css, keyframes } from 'styled-components'
import { theme } from './theme'

const loading = keyframes`
  100% {
    transform: translateX(100%);
  }
`

export const loadingStyle = css`
  position: relative;
  background-color: ${theme.loading.background};

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: ${theme.loading.backgroundAfter};
    animation: ${loading} 0.8s infinite;
  }
`
