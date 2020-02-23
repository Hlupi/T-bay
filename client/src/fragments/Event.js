import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Wrapper from './Wrapper'

export const Container = styled.section`
  padding-top: 10px;
  position: relative;
`

export const StyledWrapper = styled(Wrapper)`
  padding-bottom: 10px;
`

export const Date = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  color: #514e57;
`

export const Title = styled.h1`
  font-size: 24px;
  /* margin-bottom: 40px; */
`

export const Subtitle = styled.h2`
  ${({ addSpacing }) => addSpacing && 'margin-bottom: 10px'};
  font-size: 18px;
`

export const Description = styled.p`
  font-size: 16px;
  margin-bottom: 40px;
`

export const Toolbar = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Ticket = styled.li`
  position: relative;
  padding: 15px 0;
  border-top: 1px solid #efefef;
  &:last-child {
    border-bottom: 1px solid #efefef;
  }
`

export const StyledLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  @media(min-width: 640px) {
    align-items: center;
  }
`

export const Seller = styled.div`
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  border-radius: 10px;
  margin-right: 20px;
  max-height: 20px;
  /* order: 0; */
  width: 80px;
  text-align: center;
  @media(max-width: 639px) {
    margin-bottom: 15px;;
  }
`

export const TicketInfo = styled.p`
  width: 100%;
  /* order: 2; */
  @media(min-width: 640px) {
   /* order: 1; */
   width: 80%;
  }
`

export const Price = styled.p`
  margin-left: auto;
  order: 0;
  color: ${({ risk }) => risk === 'high' ? 'red' : risk === 'moderate' ? 'orange' : 'green'};
  @media(min-width: 640px) {
   order: 3;
  }
`