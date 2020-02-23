import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import { getEvent, updateEvent, deleteEvent } from '../../actions/events';
import { getSelectedTickets, createTicket, editTicket, deleteTicket } from '../../actions/tickets';
import AddTicket from '../tickets/AddTicket';
import { Header } from '../../fragments/Header'
import { Container, StyledWrapper, Date, Title, Subtitle, Description, Toolbar, Ticket, StyledLink, Seller, TicketInfo, Price } from '../../fragments/Event'
import { Button } from '../../fragments/Ticket'
import PlusButton from '../../fragments/Button'
import AddEvent from './AddEvent';


const EventControls = styled.div`
  display: flex;
  align-items: center;
  & > button {
    &:first-of-type {
      margin-right: 20px;
    }
  }
  @media(min-width: 640px) {
    right: 40px;
  }
`

const TicketControls = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  & > button {
      width: 40px;
      height: 40px;
  }
  @media(min-width: 640px) {
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
`


class EventDetails extends PureComponent {
  state = {
    adding: false,
    editing: false,
    event: null
  }

  componentWillMount() {
    this.props.getEvent(this.props.match.params.id)
    this.props.getSelectedTickets(this.props.match.params.id)
  }

  createTicket = (ticket) => {
    ticket.event = this.props.event
    this.props.createTicket(ticket)
  }

  toggleEditingEvent = () => {
    this.setState((prevState, props) => ({
      editing: !prevState.editing
    }))
  }

  toggleAdding = () => {
    this.setState((prevState, props) => ({
      adding: !prevState.adding
    }))
  }

  editEvent = (event) => {
    this.props.updateEvent(event.id, event)
  }

  deleteEvent = (id) => {
    this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  render() {
    const { event, tickets, user, isAdmin } = this.props
    const { adding, editing } = this.state
    if (!event) return null

    const hasTickets = tickets.length

    const renderTickets = hasTickets && tickets.map((ticket, i) => {
      const risk = ticket.risk > 35 ? 'moderate' : ticket.risk > 65 ? 'high' : 'low'
      return (
        <React.Fragment key={i}>
        <Ticket>
          <StyledLink to={`/events/${event.id}/tickets/${ticket.id}`}>
            <Seller>{ticket.user.firstName}</Seller>
            <TicketInfo>{ticket.description}</TicketInfo>
            <Price risk={risk}>${ticket.price}</Price>
          </StyledLink>
        </Ticket>
      </React.Fragment>
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
                <Toolbar>
                  <Title>{event.name}</Title>
                  {isAdmin &&
                    <EventControls>
                      <Button onClick={this.toggleEditingEvent}>edit</Button>
                      <PlusButton open red onClick={() => this.deleteEvent(event.id)} />
                    </EventControls>}
                </Toolbar>
                <Subtitle addSpacing>Details</Subtitle>
                <Description>{event.description}</Description>
                <Toolbar>
                  <Subtitle>Tickets</Subtitle>
                  {user && <PlusButton onClick={this.toggleAdding} />}
                </Toolbar>
                {hasTickets ? <ul>{renderTickets}</ul> : <Description>No tickets yet</Description>}
              </StyledWrapper>
              {user && adding &&
                <AddTicket onSubmit={this.createTicket} close={this.toggleAdding} open={adding} />}
              {isAdmin && editing &&  <AddEvent initialValues={event} onSubmit={this.editEvent} close={this.toggleEditingEvent} open={editing} title="Edit this event" /> }

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
    user: state.currentUser,
    isAdmin: state.isAdmin
  }
}

export default connect(mapStateToProps, { getEvent, updateEvent , deleteEvent, getSelectedTickets, createTicket, editTicket, deleteTicket })(EventDetails)
