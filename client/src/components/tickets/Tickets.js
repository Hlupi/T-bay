import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getSelectedTickets } from '../../actions/tickets'
import { Ticket, StyledLink, TicketInfo, Price } from '../../fragments/Tickets'
import { Description, Author } from '../../fragments/Content'


class Tickets extends PureComponent {
  componentDidMount() {
    this.props.getSelectedTickets(this.props.event.id)
  }

  render() {
    const { event, tickets } = this.props

    const hasTickets = tickets.length
    const renderTickets = hasTickets && tickets.map((ticket, i) => {
      const risk = ticket.risk > 35 ? 'moderate' : ticket.risk > 65 ? 'high' : 'low'
      return (
        <Ticket key={i}>
          <StyledLink to={`/events/${event.id}/tickets/${ticket.id}`}>
            <Author ticket>{ticket.user.firstName}</Author>
            <TicketInfo>{ticket.description}</TicketInfo>
            <Price risk={risk}>${ticket.price}</Price>
          </StyledLink>
        </Ticket>
      )
    })

    return (
      <React.Fragment>
        {hasTickets ? 
        <ul>{renderTickets}</ul> : 
        <Description event>No tickets yet</Description>}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  event: state.event,
  tickets: state.tickets
})

export default connect(mapStateToProps, { getSelectedTickets })(Tickets)