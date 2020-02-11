import styled, { css } from 'styled-components'

export const Header = styled.header`
  background-size:cover;
  background-repeat: no-repeat;
  ${({ main }) => main ? css`
    background-position: center bottom -4px;
    height: 250px;
    @media(min-width: 640px) {
      transform: rotate(180deg);
      height: 400px;
  }
  ` : css`
    background-position: center;
    border-bottom-right-radius: 50px;
    height: 200px;
    @media(min-width: 640px) {
      height: 250px;
    }
    @media(min-width: 1024px) {
      height: 300px;
    }
  `};
`
