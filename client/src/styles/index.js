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
    text-decoration: none;
    color: inherit;
  }

  button {
    font-size: 16px;
    font-family: 'Quicksand', sans-serif;
    opacity: 0.8;
    transition: opacity .25s linear;
    border: none;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
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

  ul, ol, li {
    margin: 0;
    padding: 0;
  }
`

const colors = {
  error: '#FD5359',
  base:' #3c13d3',
  grey: '#f7f7f7'
}