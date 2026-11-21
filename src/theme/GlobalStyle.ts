import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @font-face {font-family: 'Sacramento';
    src: url("/fonts/Sacramento/Sacramento.woff2") format("woff2"),
    url("/fonts/Sacramento/Sacramento.woff") format("woff"),
    url("/fonts/Sacramento/Sacramento.ttf") format("truetype"),
    url("/fonts/Sacramento/Sacramento.svg#Sacramento") format("svg");
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("/fonts/Inter/Inter-Regular.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("/fonts/Inter/Inter-Medium.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("/fonts/Inter/Inter-SemiBold.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("/fonts/Inter/Inter-Bold.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  body {
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg};
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};

    &:active,
    &:hover {
      color: ${({ theme }) => theme.colors.hoverForLinks};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  h1 {
    font-size: 34px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;

    ${({ theme }) => theme.media.tablet} {
      font-size: 40px;
    }

    ${({ theme }) => theme.media.desktop} {
      font-size: 48px;
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;

    ${({ theme }) => theme.media.tablet} {
      font-size: 28px;
    }
  }

  h3 {
    font-size: 19px;
    font-weight: 600;
    line-height: 1.35;
  }

  @media (prefers-reduced-motion: no-preference) {
    html,
    body {
      transition:
        background-color 200ms ease,
        color 200ms ease;
    }

    a {
      transition: color 150ms ease;
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0 auto;
  }
`
