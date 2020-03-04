import React, { PureComponent } from 'react'
import { connect } from 'react-redux';

import { getEvent } from '../../actions/events'
import { getTicket, deleteTicket } from '../../actions/tickets'
import { userId } from '../../jwt'
import { Header, Container, Wrapper, Toolbar, Button } from '../../fragments/Layout'
import { H1, H2, Date, Description } from '../../fragments/Content'
import { Seller, Card, Thumb, Price, Risk } from '../../fragments/Ticket'
import CrossButton from '../../fragments/Button'
import TicketForm from './TicketForm'
import Comments from '../comments/Comments'
import AddComment from '../comments/AddComment'


class TicketDetails extends PureComponent {
  state = {
    edit: false
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.ed)
    this.props.getTicket(this.props.match.params.ed, this.props.match.params.id)
  }
  
  toggleEdit = () => {
    this.setState((prevState, props) => ({
      edit: !prevState.edit
    }))
  }

  deleteTicket = (id) => {
    const { ed } = this.props.match.params
    this.props.deleteTicket(id)
    this.props.history.push(`/events/${ed}`)
  }

  render() {
    const { event, ticket, user, isAuthor, isAdmin } = this.props
    const { edit } = this.state

    const allowEdit = isAuthor || isAdmin

    if (!ticket || !event) return null

    return (
      <React.Fragment>
        <Header style={{ backgroundImage: `url('${event.picture}')` }} />
        <Container relative>
          <Wrapper ticket>
            <Date>{event.starts} - {event.ends}</Date>
            <Toolbar flex>
              <H1>Ticket for {event.name}</H1>
              {isAdmin &&  <CrossButton open red onClick={() => this.deleteTicket(ticket.id)} />}
            </Toolbar>
            <Seller>Sold by {ticket.user.firstName}</Seller>
            <Toolbar flex>
              <H2 ticket addSpacing>Details</H2>
              {allowEdit && <Button onClick={this.toggleEdit}>edit</Button> }
            </Toolbar>
            <Card>
              <Thumb style={{ backgroundImage: `url('${ticket.picture}')` }} />
              <Description ticket>{ticket.description}</Description>
              <Price>${ticket.price}</Price>
            </Card>
            <Toolbar addSpacing flex>
              <H2 ticket>Estimated risk:</H2>
              <Risk>{ticket.risk}%</Risk>
            </Toolbar>
            <H2 ticket addSpacing>Comments</H2>
            <Comments />
            {user && <AddComment />}
            {allowEdit && edit && <TicketForm editing close={this.toggleEdit} open={edit} />}
          </Wrapper>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    event: state.event,
    ticket: state.ticket,
    user: state.currentUser,
    isAuthor: state.currentUser && state.ticket && userId(state.currentUser.jwt) === state.ticket.user.id,
    isAdmin: state.isAdmin
  }
}

export default connect(mapStateToProps, { getTicket, getEvent, deleteTicket })(TicketDetails)