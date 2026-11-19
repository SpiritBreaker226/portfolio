import { css, keyframes } from 'styled-components'

const loading = keyframes`
  100% {
    transform: translateX(100%);
  }
`

/**
 * Skeleton placeholder style: a block filled with the theme's loading
 * colour and a shimmer that sweeps across it while content loads. Colours
 * come from the theme of the component that uses it, so the skeleton
 * follows whichever theme is active.
 *
 * @example
 * const Title = styled.p`${loadingStyle}`
 * // => <Title> has a theme.loading.background fill with a moving shimmer
 */
export const loadingStyle = css`
  position: relative;
  background-color: ${({ theme }) => theme.loading.background};

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: ${({ theme }) => theme.loading.backgroundAfter};
    animation: ${loading} 0.8s infinite;
  }
`
