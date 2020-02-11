import styled from 'styled-components'
import Wrapper from './Wrapper'

export const Container = styled.div`
  position: relative;
`

export const StyledWrapper = styled(Wrapper)`
  padding-bottom: 20px;
  max-width: 800px;
`

export const Date = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  color: #514e57;
`

export const Title = styled.h1`
  font-size: 24px;
`

export const Seller = styled.p`
  margin-bottom: 20px;
  font-size: 13px;
  color: #514e57;
`

export const Subtitle = styled.h2`
  ${({ addSpacing }) => addSpacing && 'margin-bottom: 10px'};
  font-size: 18px;
  margin-right: auto;
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
  background-size: cover;
  width: 35%;
  flex-grow: 0;
  flex-shrink: 0;
  min-height: 100px;
  @media(max-width: 639px) {
    max-width: 150px;
  }
`

export const Description = styled.p`
  padding: 20px;
  font-size: 16px;
`

export const Price = styled.p`
  margin-left: auto;
  margin-right: 5px;
  align-self: center;
`

export const Toolbar = styled.div`
  ${({ addSpacing }) => addSpacing && 'margin-bottom: 40px'};
  ${({ flex }) => flex && 'display: flex'};
`

export const Risk = styled.p`
  margin-left: auto;
  color: ${({ risk }) => risk && risk};
`

export const Comment = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: baseline;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  &:last-child {
    margin-bottom: 15px;
  }
`

export const Author = styled.div`
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  border-radius: 10px;
  margin-right: 20px;
  max-height: 20px;
  width: 80px;
  text-align: center;
  align-self: center;
`

export const Content = styled.p`
  width: 80%;
`

export const Button = styled.button`
  padding: 0 15px;
  border-radius: 10px;
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
`