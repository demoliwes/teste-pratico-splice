import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }


  button, p, span, h1, h2, h3, h4, h5, h6, nav, div {
    font-family: Montserrat, sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: #fff;

    font-family: Montserrat, sans-serif;
    font-weight: 500;
    color: #606060;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  html {
    font-size: 87.5%;
  }

  @media(max-width: 1024px) {
    html {
      font-size: 77.5%;
    }
  }
  `
    ;