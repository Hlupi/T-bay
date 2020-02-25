import React from 'react'
import { connect } from 'react-redux'

import { deleteEvent } from '../../actions/events'
import { Cards, Card, StyledLink, ThumbContainer, Thumb, Content } from '../../fragments/Events'
import { AdminControls, Button } from '../../fragments/Layout'
import { H3, Date, Description } from '../../fragments/Content'
import CrossButton from '../../fragments/Button'


const Events = ({ deleteEvent, events, isAdmin, onEdit }) => {
  const onDelete = (id) => {
    deleteEvent(id)
  }

  const renderEvents = events.length && events.map((event, i) => {
    return (
      <Card key={i}>
        <StyledLink to={`/events/${event.id}`}>
          <ThumbContainer>
            <Thumb style={{ backgroundImage: `url('${event.picture}')` }} />
          </ThumbContainer>
          <Content>
            <H3>{event.name}</H3>
            <Description events>{event.description}</Description>
            <Date events>{event.starts} - {event.ends}</Date>
          </Content>
        </StyledLink>
        {isAdmin &&
          <AdminControls overlaying>
            <Button onClick={() => onEdit(event)} overlaying>edit</Button>
            <CrossButton open onClick={() => onDelete(event.id)} overlaying small />
          </AdminControls>}
      </Card>
    )
  })

  return (
    <Cards>
      {renderEvents}
    </Cards>
  )
}

const  mapStateToProps = state => ({
  events: state.events,
  isAdmin: state.isAdmin
})

export default connect(mapStateToProps, { deleteEvent })(Events)