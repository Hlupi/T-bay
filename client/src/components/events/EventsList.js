import React, { PureComponent } from 'react'
import { getAllEvents, createEvent } from '../../actions/events'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import AddEvent from './AddEvent';
import './Events.css'

class EventsList extends PureComponent {
    
  createEvent = (event) => {
      this.props.createEvent(event)
  }

  componentWillMount() {
      this.props.getAllEvents()
  }

  render() {
    const { events, history } = this.props
      
    return(
        <div>
            <h1>Events:</h1>

            <div className="container">
            
            { events.map(event => (<div key={event.id} className="events-list-item">
            <img src={event.picture} className="event-image" alt=''/>
            <p>{event.name}</p>
            <Button
            color="primary"
            variant="raised"
            onClick={() => history.push(`/events/${event.id}`)}
            className="explore-event"
            >
            Find tickets
            </Button>
            </div>))} 
            </div>
            
            
            {this.props.currentUser && <div className="add-event">
            <h2>Create an event:</h2>
            <AddEvent onSubmit={this.createEvent} />
            </div>}
            
        </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
      events: state.events,
      currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { getAllEvents, createEvent })(EventsList)