import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body,
  html {
    text-rendering: optimizeLegibility;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0 auto;
    min-width: 320px;
    overflow-x: hidden;
    font-family: 'Quicksand', sans-serif;
    background: #f7f7f7;
  }
  * {
    box-sizing: border-box;
  }
  *:before, *:after {
    box-sizing: inherit;
  }

  li {
    list-style-type: none;
  }

  a {
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  span,
  strong {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Exo', sans-serif;
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: none;
  }

   input {
    margin: 0;
  }

  ul, ol {
    margin: 0;
    padding: 0;
  }
`
