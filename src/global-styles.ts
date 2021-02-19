import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: "AdelonBook", "Times New Roman", Times, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #D2D6EF;
    color: #333333;
    font-size: 16px;
  }
`;

export default GlobalStyles;
