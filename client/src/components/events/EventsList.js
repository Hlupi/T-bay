import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getAllEvents, createEvent } from '../../actions/events'
import AddEvent from './AddEvent';
import Wrapper from '../../fragments/Wrapper'
import Header from '../../fragments/Header'

const Container = styled(Wrapper)`
  position: relative;
`

const Toolbar = styled.div`
  padding: 10px 0;
`

const Button = styled.button`
  margin-left: auto;
  display: block;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ open }) => open ? 'rgba(255, 255, 255, 0.9)' : 'rgba(60, 19, 211, 0.1)'} ;
  position: relative;
  z-index: 3;
  transition: background .25s linear;
  & > img {
    width: 40%;
    height: 40%;
    position: relative;
    top: 50%;
    transition: transform .25s linear;
    ${({ open }) => open && 'transform: rotate(45deg)'};
  }
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
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  &:hover {
    & ${Thumb} {
      transform: scale(1.2);
    }
  }
  @media(min-width: 640px) {
    flex-wrap: wrap;    
    &:not(:nth-child(3n)) {
      margin-bottom: 40px;
      margin-right: 20px;
      width: calc(33.3333% - 20px);
    }
    &:nth-child(3n) {
      width: 33.3333%;
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
        <Container as="section">
          <Toolbar>
            <Button onClick={this.toggleBackdrop} open={backdropOpen}><img src="img/plus.svg" alt="Plus sign" /></Button>
          </Toolbar>
          <Cards>
            {renderEvents}
          </Cards>
          {user && backdropOpen && 
            <AddEvent onSubmit={this.createEvent} close={this.toggleBackdrop} />
          }
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