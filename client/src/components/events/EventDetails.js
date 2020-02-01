import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import { getEvent } from '../../actions/events';
import { getSelectedTickets, createTicket } from '../../actions/tickets';
import AddTicket from '../tickets/AddTicket';
import Wrapper from '../../fragments/Wrapper';
import PlusButton from '../../fragments/Button'

const Header = styled.header`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  @media(min-width: 640px) {
    height: 250px;
  }
  @media(min-width: 1024px) {
    height: 300px;
  }
`

const Container = styled.section`
  padding-top: 10px;
  position: relative;
`

const StyledWrapper = styled(Wrapper)`
  margin-bottom: 10px;
`

const Date = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  color: #514e57;
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  color: #FD5359;
`

const Subtitle = styled.h2`
  ${({addSpacing}) => addSpacing && 'margin-bottom: 10px'};
  font-size: 18px;
`

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 40px;
`

const Toolbar = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`

const Ticket = styled.div`
  padding: 15px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  @media(min-width: 640px) {
    align-items: center;
  }
`

const Seller = styled.div`
  padding: 0 15px;
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  border-radius: 10px;
  margin-right: 20px;
  max-height: 20px;
  order: 1;
  @media(max-width: 639px) {
    margin-bottom: 15px;;
  }
`

const TicketInfo = styled.p`
  width: 100%;
  order: 3;
  @media(min-width: 640px) {
   order: 2;
   width: 80%;
  }
`

const Price = styled.p`
  margin-left: auto;
  order: 2;
  @media(min-width: 640px) {
   order: 3;
  }
`

class EventDetails extends PureComponent {
  state = {
    backdropOpen: false
  }

  componentWillMount() {
    this.props.getEvent(this.props.match.params.id)
    this.props.getSelectedTickets(this.props.match.params.id)
  }

  createTicket = (ticket) => {
    ticket.event = this.props.event
    this.props.createTicket(ticket)
  }

  toggleBackdrop = () => {
    this.setState((prevState, props) => ({backdropOpen: !prevState.backdropOpen}))
  }

  render() {
    const { event, tickets, history, user } = this.props
    const { backdropOpen } = this.state

    if (!event) return null
    const hasTickets = tickets.length
    const renderTickets = hasTickets && tickets.map((ticket, i) => (
      <Ticket key={i} onClick={() => history.push(`/tickets/${ticket.id}`)}>
          <Seller>{ticket.user.firstName}</Seller>
        <TicketInfo>{ticket.description}</TicketInfo>
        <Price>${ticket.price}</Price>
      </Ticket>
    ))

    return (
      <React.Fragment>
        {!event.id && <div>Loading...</div>}
        {event.id && 
        <React.Fragment>
          <Header style={{ backgroundImage: `url('${event.picture}')` }} />
          <Container>
            <StyledWrapper>
              <Date>{event.starts} - {event.ends}</Date>
              <Title>{event.name}</Title>
              <Subtitle addSpacing>Details</Subtitle>
              <Description>{event.description}</Description>
              <Toolbar>
              <Subtitle>Tickets</Subtitle>
              <PlusButton onClick={this.toggleBackdrop} open={backdropOpen} />
              </Toolbar>
              {hasTickets ? renderTickets : <Description>No tickets yet</Description>}
            </StyledWrapper>
            {user && backdropOpen &&
            <AddTicket onSubmit={this.createTicket} close={this.toggleBackdrop} />
            }
          </Container>
        </React.Fragment>
        }
      </React.Fragment>
    )
  }

}

const mapStateToProps = function (state) {
  return {
    event: state.event,
    tickets: state.tickets,
    user: state.currentUser
  }
}

export default connect(mapStateToProps, {
  getEvent
  , getSelectedTickets, createTicket
})(EventDetails)