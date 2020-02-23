import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../../actions/events'
import AddEvent from './AddEvent';
import Wrapper from '../../fragments/Wrapper'
import { Header } from '../../fragments/Header'
import PlusButton from '../../fragments/Button'
import { Container, Toolbar, Cards, Thumb, Card, StyledLink, ThumbContainer, Content, Title, Description, Date } from '../../fragments/Events'
import { Button } from '../../fragments/Ticket'


const AdminControls = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  & > button {
    &:first-child {
      max-height: 20px;
      margin-right: 20px;
    }
  }
`


class EventsList extends PureComponent {
  state = {
    adding: false,
    editing: false,
    eventToEdit: null
  }

  componentWillMount() {
    this.props.getAllEvents()
  }

  toggleEditing = (event) => {
    this.setState((prevState, props) => ({ 
      editing: !prevState.editing,
      eventToEdit: event 
    }))
  }

  toggleAdding = () => {
    this.setState((prevState, props) => ({ 
      adding: !prevState.adding 
    }))
  }

  addEvent = (event) => {
    this.props.createEvent(event)
  }

  editEvent = (event) => {
    this.props.updateEvent(event.id, event)
  }

  deleteEvent = (id) => {
    this.props.deleteEvent(id)
  }

  render() {
    const { events, isAdmin } = this.props
    const { adding ,editing, eventToEdit } = this.state

    const renderEvents = events.map((event, i) => {
      return (
        <React.Fragment key={i}>
          <Card>
            <StyledLink to={`/events/${event.id}`}>
              <ThumbContainer>
                <Thumb style={{ backgroundImage: `url('${event.picture}')` }} />
              </ThumbContainer>
              <Content>
                <Title>{event.name}</Title>
                <Description>{event.description}</Description>
                <Date>{event.starts} - {event.ends}</Date>
              </Content>
            </StyledLink>
            {isAdmin &&
              <AdminControls>
                <Button onClick={() => this.toggleEditing(event)} white>edit</Button>
                <PlusButton open onClick={() => this.deleteEvent(event.id)} />
              </AdminControls>}
          </Card>
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <Header main style={{ backgroundImage: "url('/img/header.svg')" }} />
        <Container>
          <Wrapper>
            <Toolbar>
              {isAdmin &&
                <PlusButton onClick={this.toggleAdding} />
              }
            </Toolbar>
            <Cards>
              {renderEvents}
            </Cards>
            {isAdmin && adding && 
              <AddEvent onSubmit={this.addEvent} close={this.toggleAdding} open={adding} />
            }
            {isAdmin && editing &&
              <AddEvent title="Edit this event" initialValues={eventToEdit} onSubmit={this.editEvent} close={this.toggleEditing} open={editing} />
            }
          </Wrapper>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    events: state.events,
    isAdmin: state.isAdmin
  }
}

export default connect(mapStateToProps, { getAllEvents, createEvent, updateEvent, deleteEvent })(EventsList)