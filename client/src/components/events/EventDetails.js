import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


import { getEvent } from '../../actions/events';
import { getSelectedTickets, createTicket } from '../../actions/tickets';
import AddTicket from '../tickets/AddTicket';
import { Header } from '../../fragments/Header'
import { Container, StyledWrapper, Date, Title, Subtitle, Description, Toolbar, Ticket, StyledLink, Seller, TicketInfo, Price } from '../../fragments/Event'
import PlusButton from '../../fragments/Button'


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
    this.setState((prevState, props) => ({ backdropOpen: !prevState.backdropOpen }))
  }

  render() {
    const { event, tickets, user } = this.props
    const { backdropOpen } = this.state
    const hasTickets = tickets.length
    if (!event) return null
    const renderTickets = hasTickets && tickets.map((ticket, i) => {
      const risk = ticket.risk > 35 ? 'moderate' : ticket.risk > 65 ? 'high' : 'low'
      return (
        <Ticket key={i}>
        <StyledLink to={`/events/${event.id}/tickets/${ticket.id}`}>
        <Seller>{ticket.user.firstName}</Seller>
        <TicketInfo>{ticket.description}</TicketInfo>
        <Price risk={risk}>${ticket.price}</Price>
        </StyledLink>
      </Ticket>
      )
    })


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
                  {user && <PlusButton onClick={this.toggleBackdrop} />}
                </Toolbar>
                {hasTickets ? <ul>{renderTickets}</ul> : <Description>No tickets yet</Description>}
              </StyledWrapper>
              {user && backdropOpen &&
                <AddTicket onSubmit={this.createTicket} close={this.toggleBackdrop} open={backdropOpen} />
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