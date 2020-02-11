import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getAllEvents, createEvent } from '../../actions/events'
import AddEvent from './AddEvent';
import Wrapper from '../../fragments/Wrapper'
import { Header } from '../../fragments/Header'
import PlusButton from '../../fragments/Button'
import { Container, Toolbar, Cards, Thumb, Card, StyledLink, ThumbContainer, Content, Title, Description, Date } from '../../fragments/Events'


class EventsList extends PureComponent {
  state = {
    backdropOpen: false
  }

  createEvent = (event) => {
    this.props.createEvent(event)
  }

  toggleBackdrop = () => {
    this.setState((prevState, props) => ({backdropOpen: !prevState.backdropOpen}))
  }

  componentWillMount() {
    this.props.getAllEvents()
  }

  render() {
    const { events, user } = this.props
    const { backdropOpen } = this.state
    const renderEvents = events.map((event, i) => {
      return (
        <Card key={i}>
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
        </Card>
      )
    })

    return (
      <React.Fragment>
        <Header main style={{ backgroundImage: "url('/img/header.svg')"}} />
        <Container>
          <Wrapper>
            <Toolbar>
              {user && 
              <PlusButton onClick={this.toggleBackdrop} />
              }
            </Toolbar>
            <Cards>
              {renderEvents}
            </Cards>
            {user && backdropOpen && 
              <AddEvent onSubmit={this.createEvent} close={this.toggleBackdrop} open={backdropOpen} />
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
    user: state.currentUser
  }
}

export default connect(mapStateToProps, { getAllEvents, createEvent })(EventsList)