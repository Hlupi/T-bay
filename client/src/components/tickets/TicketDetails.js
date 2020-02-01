import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import { getEvent } from '../../actions/events'
import { getTicket, editTicket, getAllTickets } from '../../actions/tickets';
import { getSelectedComments, createComment } from '../../actions/comments';
import Wrapper from '../../fragments/Wrapper'
import AddComment from './AddComment'
import AddTicket from './AddTicket'

const Header = styled.header`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  @media(min-width: 640px) {
    height: 250px;
  }
  @media(min-width: 1024px) {
    height: 300px;
  }
`

const Container = styled.div`
  position: relative;
`

const StyledWrapper = styled(Wrapper)`
  padding-bottom: 20px;
  max-width: 800px;
`

const Date = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  color: #514e57;
`

const Title = styled.h1`
  font-size: 24px;
   & > span {
    color: #FD5359;
   }
`

const Seller = styled.p`
  margin-bottom: 20px;
  font-size: 13px;
  color: #514e57;
`

const Subtitle = styled.h2`
  ${({ addSpacing }) => addSpacing && 'margin-bottom: 10px'};
  font-size: 18px;
  margin-right: auto;
`

const Card = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  max-width: 600px;
`

const Thumb = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 35%;
  flex-grow: 0;
  flex-shrink: 0;
  min-height: 100px;
  @media(max-width: 639px) {
    max-width: 150px;
  }
`

const Description = styled.p`
  padding: 5px;
  font-size: 16px;
`

const Price = styled.p`
  margin-left: auto;
  margin-right: 5px;
  align-self: center;
`

const Toolbar = styled.div`
  ${({ addSpacing }) => addSpacing && 'margin-bottom: 40px'};
  max-width: 600px;
  ${({ flex }) => flex && 'display: flex'};
`

const Risk = styled.p`
  margin-left: auto;
  color: ${({ risk }) => risk && risk};
`

const Comment = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: baseline;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  &:last-child {
    margin-bottom: 15px;
  }
`


const Author = styled.div`
  padding: 0 15px;
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  border-radius: 10px;
  margin-right: 20px;
  max-height: 20px;
`

const Content = styled.p`
  width: 80%;
`

const Button = styled.button`
  padding: 0 15px;
  border-radius: 10px;
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
`

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
    this.props.getTicket(this.props.match.params.id)
    this.props.getAllTickets()
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

  commentsRisk() {
    const comments = this.props.ticket.comments.length
    if (comments > 3) return 5
    else return 0
  }

  priceRisk() {
    const ticketPrice = this.props.ticket.price
    const allPrices = this.props.tickets.map(ticket => ticket.price)
    const totalPrices = allPrices.reduce((a, b) => a + b, 0)
    const averagePrice = totalPrices / this.props.tickets.length
    const risk = ((averagePrice - ticketPrice) / averagePrice) * 100
    if (risk < -10) return -10
    else return risk
  }

  userRisk() {
    const userIds = this.props.tickets.map(ticket => ticket.user.id)
    const ticketAuthor = this.props.ticket.user.id
    const count = userIds.filter(x => x === ticketAuthor).length
    if (count === 1) return 10
    else return 0
  }

  timeRsik() {
    const time = this.props.ticket.postedAt.slice(11, 13)
    if (time > 8 && time < 17) return -10
    else return 0
  }


  totalRisk() {
    const minRisk = 5
    const maxRisk = 95
    const risk = this.commentsRisk() + this.priceRisk() + this.userRisk() + this.timeRsik()
    if (risk < minRisk) return minRisk
    if (risk > maxRisk) return maxRisk
    else return parseFloat(risk).toFixed(0)
  }

  render() {
    const { event, ticket, comments } = this.props
    // const color = risk < 6 ? 'green' : risk < 11 ? 'orange' : 'red'
    if (!ticket) return null

    return (
      <React.Fragment>
        <Container>

     
        <StyledWrapper>
          {!ticket.id && <div>Loading...</div>}
          {ticket.id && (
            <React.Fragment>
              {/* <Header style={{ backgroundImage: `url('${event.picture}')` }} /> */}
              {/* <Date>{event.starts} - {event.ends}</Date> */}
              {/* <Title>Ticket for {event.name}</Title> */}
              <Seller>Sold by {ticket.user.firstName}</Seller>
              <Toolbar flex>

                <Subtitle addSpacing>Details</Subtitle>
                {
                  this.props.currentUser &&
                  !this.state.edit &&
                  <div>

                    <Button onClick={this.toggleEdit}>edit</Button>
                  </div>
                }
              </Toolbar>
              <Card>
                <Thumb style={{ backgroundImage: `url('${ticket.picture}')` }} />
                <Description>{ticket.description}</Description>
                <Price>${ticket.price}</Price>
              </Card>
              <Toolbar addSpacing flex>
                <Subtitle>Estimated risk:</Subtitle>
                <Risk>{this.totalRisk()}%</Risk>
              </Toolbar>
              <Subtitle addSpacing>Comments</Subtitle>
            </React.Fragment>)}

          {
            this.props.currentUser &&
            this.state.edit &&
            <AddTicket initialValues={ticket} onSubmit={this.editTicket} />
          }
          <div>
            {comments.map(comment => (
              <Comment key={comment.id}>
                <Author>{comment.user.firstName}</Author>
                <Content>{comment.text}</Content>
              </Comment>
            ))}
          </div>

          {this.props.currentUser && <div>
            <AddComment onSubmit={this.addComment} />
          </div>}
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
    tickets: state.tickets
  }
}

export default connect(mapStateToProps, { getTicket, getAllTickets, getSelectedComments, createComment, editTicket })(TicketDetails)