import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteEvent } from '../../actions/events'
import { Cards, Card, StyledLink, ThumbContainer, Thumb, Content } from '../../fragments/Events'
import { AdminControls, Button } from '../../fragments/Layout'
import { H3, Date, Description } from '../../fragments/Content'
import CrossButton from '../../fragments/Button'


class Events extends PureComponent {
  state = {
    control: null
  }

  onDelete = (id) => {
    this.props.deleteEvent(id)
  }

  showControls = i => {
    this.setState({ control: i })
  }

  hideControls = () => {
    this.setState({ control: null })
  }

  render() {
    const { control } = this.state
    const { events, isAdmin, onEdit } = this.props
 
    const renderEvents = events.length > 0 ? events.map((event, i) => {
      const displayControls = control && control === event.id
      return (
        <Card key={i} onMouseEnter={() => this.showControls(event.id)} onMouseLeave={this.hideControls}>
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
          {isAdmin && displayControls &&
            <AdminControls overlaying>
              <Button onClick={() => onEdit(event)} overlaying>edit</Button>
              <CrossButton open onClick={() => this.onDelete(event.id)} overlaying small ariaLabel="Delete event" />
            </AdminControls>}
        </Card>
      )
    }) : <Description>No events found</Description>

    return (
      <Cards>
        {renderEvents}
      </Cards>
    )
  }
}

const  mapStateToProps = state => ({
  isAdmin: state.isAdmin
})

export default connect(mapStateToProps, { deleteEvent })(Events)