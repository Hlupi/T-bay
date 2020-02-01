import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getAllEvents, createEvent } from '../../actions/events'
import AddEvent from './AddEvent';
import Wrapper from '../../fragments/Wrapper'
import Header from '../../fragments/Header'
import PlusButton from '../../fragments/Button'

const Container = styled.section`
  position: relative;
`

const Toolbar = styled.div`
  padding: 10px 0;
`

const Cards = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media(min-width: 640px) {
    justify-content: flex-start;
  }
`

const Thumb = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: transform .3s linear;
`

const Card = styled.div`
  margin-bottom: 20px;
  flex-basis: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    & ${Thumb} {
      transform: scale(1.2);
    }
  }
  @media(min-width: 640px) {
    margin-bottom: 40px;
    flex-wrap: wrap;    
    &:not(:nth-child(3n)) {
      margin-right: 20px;
      flex-basis: calc(33.3333% - 20px);
    }
    &:nth-child(3n) {
      flex-basis: 33.3333%;
    }
  }
`

const ThumbContainer = styled.div`
  width: 35%;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  @media(max-width: 639px) {
    max-width: 150px;
  }
  @media(min-width: 640px) {
    width: 100%;
    height: 150px;
  }
  @media(min-width: 1024px) {
    height: 200px;
  }
`

const Content = styled.div`
  padding: 10px;
  width: 65%;
  flex-grow: 1;
  flex-shrink: 0;
  @media(min-width: 640px) {
    width: 100%;
  }
`

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`

const Date = styled.p`
  font-size: 14px;
  color: #514e57;
`


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
    const { events, history, user } = this.props
    const { backdropOpen } = this.state
    const renderEvents = events.map((event, i) => {
      return (
        <Card key={i} onClick={() => history.push(`/events/${event.id}`)}>
          <ThumbContainer>
            <Thumb style={{ backgroundImage: `url('${event.picture}')` }} />
          </ThumbContainer>
          <Content>
            <Title>{event.name}</Title>
            <Description>{event.description}</Description>
            <Date>{event.starts} - {event.ends}</Date>
          </Content>
        </Card>
      )
    })

    return (
      <React.Fragment>
        <Header />
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