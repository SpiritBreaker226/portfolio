import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: "Boycott";
    src: url("../theme/fonts/Boycott.ttf");
  }

  @font-face {
    font-family: 'Sacramento', cursive;
    src: url("../theme/fonts/Sacramento-Regular.ttf");
  }

  body {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color: ${theme.text};
    background: ${theme.secondary};
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    font-weight: 600;
    transition: all 0.1s ease 0s;
    color: ${theme.primary};

    &:active,
    &:hover {
      color: ${theme.hoverForLinks};
    }
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  #root{
    margin:0 auto;
  }
`
