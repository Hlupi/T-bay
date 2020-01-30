import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEvent } from '../../actions/events';
import { getSelectedTickets, createTicket } from '../../actions/tickets';
import AddTicket from '../tickets/AddTicket';

class EventDetails extends PureComponent{

  componentWillMount() {
      this.props.getEvent(this.props.match.params.id)
      this.props.getSelectedTickets(this.props.match.params.id) 
  }

  createTicket = (ticket) => {
      ticket.event = this.props.event
      this.props.createTicket(ticket)   
  }
  
  render() {
      const {event, tickets} = this.props
      if (!event) return null

      return (
          <div className="event-details">
              {!event.id && <div>Loading...</div>}
              {event.id && (<div>
                  <img src={event.picture} alt=''className="event-image" />                        
                  <h2>{event.name}</h2>
                  <p>{event.description}</p>
                  <p>When: {event.starts} - {event.ends}</p>
              </div>)}  

              <div>
                  {tickets.map(ticket => (
                      <div key={ticket.id}>
                      <p>{ticket.user.firstName} {ticket.price} : <Link to={`/tickets/${ticket.id}`}>{ticket.description}</Link></p>
                      </div>
                  ))}
              </div>

              {this.props.currentUser && <div className="add-ticket">
              <h2>Add a ticket:</h2>
              <AddTicket onSubmit={this.createTicket} />
              </div>}
          </div>       
      )
  }

}

const mapStateToProps = function(state) {
  return {
      event: state.event,
      tickets: state.tickets,
      currentUser: state.currentUser 
  }
}

export default connect(mapStateToProps, { getEvent
  , getSelectedTickets, createTicket 
})(EventDetails)