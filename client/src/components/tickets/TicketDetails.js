import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getEvent } from '../../actions/events'
import { getSelectedTickets, getTicket, editTicket } from '../../actions/tickets';
import { getSelectedComments, createComment } from '../../actions/comments';
import { userId } from '../../jwt'
import { Header } from '../../fragments/Header'
import { Container, StyledWrapper, Date, Title, Seller, Subtitle, Card, Thumb, Description, Price, Toolbar, Risk, Comment, Author, Content, Button } from '../../fragments/Ticket'
import AddComment from './AddComment'
import AddTicket from './AddTicket'


class TicketDetails extends PureComponent {
  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  componentWillMount() {
    this.props.getEvent(this.props.match.params.ed)
    this.props.getSelectedTickets(this.props.match.params.ed)
    this.props.getTicket(this.props.match.params.ed, this.props.match.params.id)
    this.props.getSelectedComments(this.props.match.params.id)
  }

  editTicket = (ticket) => {
    this.props.editTicket(this.props.match.params.id, ticket)
    this.toggleEdit()
  }

  addComment = (comment) => {
    comment.ticket = this.props.ticket
    this.props.createComment(comment)
  }

  render() {
    const { event, ticket, comments, isAuthor } = this.props

    if (!ticket || !event) return null

    return (
      <React.Fragment>
        <Header style={{ backgroundImage: `url('${event.picture}')` }} />
        <Container>
          <StyledWrapper>
            <Date>{event.starts} - {event.ends}</Date>
            <Title>Ticket for {event.name}</Title>
            <Seller>Sold by {ticket.user.firstName}</Seller>
            <Toolbar flex>
              <Subtitle addSpacing>Details</Subtitle>
              {this.props.currentUser && isAuthor && !this.state.edit &&
                <div>
                  <Button onClick={this.toggleEdit}>edit</Button>
                </div>}
            </Toolbar>
            <Card>
              <Thumb style={{ backgroundImage: `url('${ticket.picture}')` }} />
              <Description>{ticket.description}</Description>
              <Price>${ticket.price}</Price>
            </Card>
            <Toolbar addSpacing flex>
              <Subtitle>Estimated risk:</Subtitle>
              <Risk>{ticket.risk}%</Risk>
            </Toolbar>
            <Subtitle addSpacing>Comments</Subtitle>

            {this.props.currentUser && this.state.edit &&
              <AddTicket initialValues={ticket} onSubmit={this.editTicket} close={this.toggleEdit} open={this.state.edit} />}
            {comments.map(comment => (
              <Comment key={comment.id}>
                <Author>{comment.user.firstName}</Author>
                <Content>{comment.text}</Content>
              </Comment>
            ))}
            {this.props.currentUser && <AddComment onSubmit={this.addComment} />}
          </StyledWrapper>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    ticket: state.ticket,
    comments: state.comments,
    currentUser: state.currentUser,
    event: state.event,
    tickets: state.tickets,
    isAuthor: state.currentUser && state.ticket && userId(state.currentUser.jwt) == state.ticket.user.id,
  }
}

export default connect(mapStateToProps, { getSelectedTickets, getTicket, getEvent, getSelectedComments, createComment, editTicket })(TicketDetails)