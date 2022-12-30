import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

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

  body {
    color: ${theme.colors.text};
    background: ${theme.colors.secondary};
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    font-weight: 600;
    transition: all 0.1s ease 0s;
    color: ${theme.colors.primary};

    &:active,
    &:hover {
      color: ${theme.colors.hoverForLinks};
    }
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  #root{
    margin:0 auto;
  }
`
