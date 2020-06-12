import styled from 'styled-components'


export const Seller = styled.p`
  margin-bottom: 20px;
  font-size: 13px;
  color: #514e57;
`

export const Card = styled.div`
  margin-bottom: 10px;
  display: flex;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
`

export const Thumb = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 35%;
  flex-grow: 0;
  flex-shrink: 0;
  min-height: 100px;
  @media(max-width: 639px) {
    max-width: 150px;
  }
`

export const Price = styled.p`
  margin-left: auto;
  margin-right: 5px;
  align-self: center;
`

export const Risk = styled.p`
  margin-left: auto;
  color: ${({ risk }) => risk && risk};
`