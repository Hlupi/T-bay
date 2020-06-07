import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getEvent, deleteEvent } from '../../actions/events'
import { dates } from './dates'
import { Header, Container, Wrapper, Toolbar, AdminControls, Button } from '../../fragments/Layout'
import { H1, H2, When, Description } from '../../fragments/Content'
import CrossButton from '../../fragments/Button'
import EventForm from './EventForm'
import TicketForm from '../tickets/TicketForm'
import Tickets from '../tickets/Tickets'


class EventDetails extends PureComponent {
  state = {
    adding: false,
    editing: false
  }

  componentWillMount() {
    this.props.getEvent(this.props.match.params.id)

  }

  toggleEditing = () => {
    this.setState((prevState, props) => ({
      editing: !prevState.editing
    }))
  }

  toggleAdding = () => {
    this.setState((prevState, props) => ({
      adding: !prevState.adding
    }))
  }

  deleteEvent = (id) => {
    this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  render() {
    const { event, user, isAdmin, newDates } = this.props
    const { adding, editing } = this.state

    if (!event) return null

    return (
      <React.Fragment>
        {!event.id && <div>Loading...</div>}

        {event.id &&
          <React.Fragment>
            <Header style={{ backgroundImage: `url('${event.picture}')` }} />
            <Container relative spacingTop>
              <Wrapper event>
                <When>{newDates && dates(newDates.starts, newDates.ends)}</When>
                <Toolbar event>
                  <H1>{event.name}</H1>
                  {isAdmin &&
                    <AdminControls>
                      <Button onClick={this.toggleEditing}>edit</Button>
                      <CrossButton open red onClick={() => this.deleteEvent(event.id)} />
                    </AdminControls>}
                </Toolbar>
                <H2 addSpacing>Details</H2>
                <Description event>{event.description}</Description>
                <Tickets onClick={this.toggleAdding} />
              </Wrapper>

              {user && adding && <TicketForm close={this.toggleAdding} open={adding} />}

              {isAdmin && editing &&  <EventForm initialValues={event} editing close={this.toggleEditing} open={editing} title="Edit this event" /> }
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
    user: state.currentUser,
    isAdmin: state.isAdmin,
    newDates: state.event && state.events.filter(item => item.id === state.event.id)[0]
  }
}

export default connect(mapStateToProps, { getEvent, deleteEvent })(EventDetails)
