import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getEvent, deleteEvent } from '../../actions/events'
import { Header, Container, Wrapper, Toolbar, AdminControls, Button } from '../../fragments/Layout'
import { H1, H2, Date, Description } from '../../fragments/Content'
import CrossButton from '../../fragments/Button'
import EventForm from './EventForm'
import TicketForm from '../tickets/TicketForm'
import Tickets from '../tickets/Tickets'


class EventDetails extends PureComponent {
  state = {
    adding: false,
    editing: false
  }

  componentDidMount() {
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
    const { event, user, isAdmin } = this.props
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
                <Date>{event.starts} - {event.ends}</Date>
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
                <Toolbar event>
                  <H2>Tickets</H2>
                  {user && <CrossButton onClick={this.toggleAdding} />}
                </Toolbar>
                <Tickets />
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
    isAdmin: state.isAdmin
  }
}

export default connect(mapStateToProps, { getEvent, deleteEvent })(EventDetails)
