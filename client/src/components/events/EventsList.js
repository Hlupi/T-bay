import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getAllEvents } from '../../actions/events'
import { Header, Container, Wrapper, Toolbar } from '../../fragments/Layout'
import CrossButton from '../../fragments/Button'
import EventForm from './EventForm'
import Events from './Events'


class EventsList extends PureComponent {
  state = {
    adding: false,
    editing: false,
    eventToEdit: null
  }

  componentDidMount() {
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

  render() {
    const { isAdmin } = this.props
    const { adding ,editing, eventToEdit } = this.state

    return (
      <React.Fragment>
        <Header main style={{ backgroundImage: "url('/img/shapes.svg')" }} />
        <Container relative as="section">
          <Wrapper>
            <Toolbar events>
              { isAdmin && <CrossButton onClick={this.toggleAdding} /> }
            </Toolbar>
            <Events onEdit={this.toggleEditing} />
              { isAdmin && adding && 
                <EventForm close={this.toggleAdding} open={adding} /> }
              { isAdmin && editing && 
                <EventForm editing initialValues={eventToEdit} close={this.toggleEditing} open={editing} /> }
          </Wrapper>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    isAdmin: state.isAdmin
  }
}

export default connect(mapStateToProps, { getAllEvents })(EventsList)