import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getSelectedTickets } from '../../actions/tickets'
import { Toolbar, AdminControls } from '../../fragments/Layout'
import { Ticket, StyledLink, TicketInfo, Price, Select } from '../../fragments/Tickets'
import { H2, Description, Author } from '../../fragments/Content'
import CrossButton from '../../fragments/Button'


class Tickets extends PureComponent {
  state = {
    value: ''
  }

  componentDidMount() {
    this.props.getSelectedTickets(this.props.event.id)
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state
    const { event, tickets, user } = this.props

    const hasTickets = tickets.length > 0
    const sortedTickets = hasTickets &&  tickets.sort((t1, t2) => value === 'user' ? t1[value].firstName.localeCompare(t2[value].firstName) : t1[value] - t2[value])
    const renderTickets = hasTickets && sortedTickets.map((ticket, i) => {
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
        <Toolbar event>
          <H2>Tickets</H2>
          <AdminControls>
          {hasTickets && <Select value={value} onChange={this.handleChange} notAlone={user}>
            <option value="">Sort by</option>
            <option value="user">Seller</option>
            <option value="price">Price</option>
          </Select> }
          {user && <CrossButton onClick={this.toggleAdding} />}
          </AdminControls>
        </Toolbar>
        {hasTickets ?
          <ul>{renderTickets}</ul> : 
        <Description event>No tickets yet</Description>}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  event: state.event,
  tickets: state.tickets,
  user: state.currentUser
})

export default connect(mapStateToProps, { getSelectedTickets })(Tickets)