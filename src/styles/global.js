import { createGlobalStyle } from 'styled-components';
import { primaryColor } from './variables';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: ${primaryColor};
    -webkit-font-smoothing: antialiased !important;
  }

  button {
    cursor: pointer;
  }
  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
