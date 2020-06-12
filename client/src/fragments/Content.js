import styled, { css } from 'styled-components'

export const H1 = styled.h1`
  font-size: 24px;
`

export const H2 = styled.h2`
  ${({ addSpacing }) => addSpacing && 'margin-bottom: 10px'};
  font-size: 18px;
  ${({ ticket }) => ticket && ' margin-right: auto'};
  `

export const H3 = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`

export const When = styled.p`
  ${({ events }) => !events && 'margin-bottom: 10px'};
  font-size: 14px;
  color: #514e57;
`

export const Description = styled.p`
  font-size: 16px;
  ${({ events }) => events && 'margin-bottom: 10px'};
  ${({ event }) => event && 'margin-bottom: 40px'};
  ${({ ticket }) => ticket && css`
    padding: 20px;
  `};
`

export const Author = styled.div`
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  border-radius: 10px;
  margin-right: 20px;
  max-height: 20px;
  width: 80px;
  text-align: center;
  ${({ comment }) => comment && 'align-self: center;'};
  ${({ ticket }) => ticket && css`
    @media(max-width: 639px) {
      margin-bottom: 15px;;
    }
  `};
`
