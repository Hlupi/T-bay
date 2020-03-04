import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

export const Select = styled.select`
  ${({ notAlone }) => notAlone && 'margin-right: 20px'};
  padding: 2px 10px;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
  background: rgba(60,19,211,0.1);
  color: #3c13d3;
  border-radius: 30px;
  border: 1px solid transparent;
  transition: border-color .25s linear;
  border: none;
  outline: none;
  appearance: none;
  &:focus {
    border-color: #3c13d3;
  }
`