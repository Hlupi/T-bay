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