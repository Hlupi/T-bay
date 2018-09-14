import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getTicket, editTicket, getAllTickets } from '../../actions/tickets';
import { getSelectedComments, createComment } from '../../actions/comments';
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

  commentsRisk(){
      const comments = this.props.ticket.comments.length
      if (comments > 3) return 5 
      else return 0
  }

  priceRisk(){
      const ticketPrice = this.props.ticket.price
      const allPrices = this.props.tickets.map(ticket => ticket.price)
      const totalPrices = allPrices.reduce((a, b) => a+ b, 0)
      const averagePrice = totalPrices/this.props.tickets.length
      const risk = ((averagePrice - ticketPrice) / averagePrice) * 100
      if( risk < -10) return -10
      else return risk
  }
              
  userRisk(){
      const userIds = this.props.tickets.map(ticket => ticket.user.id)
      const ticketAuthor = this.props.ticket.user.id
      const count = userIds.filter(x => x === ticketAuthor).length
      if(count === 1) return 10
      else return 0
  }   
  
  timeRsik(){
      const time = this.props.ticket.postedAt.slice(11, 13)
      if(time > 8 && time < 17) return -10
      else return 0
  }
      
  
  totalRisk() {
    const minRisk = 5
    const maxRisk = 95
    const risk = this.commentsRisk() + this.priceRisk() + this.userRisk() + this.timeRsik()
    if(risk < minRisk) return minRisk
    if(risk > maxRisk) return maxRisk
    else return parseFloat(risk).toFixed(0)
  }

  render() {
      const {ticket, comments} = this.props
      if(!ticket) return null
        
      return(
            <div className="ticket-details">
                {!ticket.id && <div>Loading...</div>}
                {ticket.id && (<div>
                    <h2>Ticket from {ticket.user.firstName}</h2>
                    <p>FRAUDULENCE RISK: {this.totalRisk()}%</p>
                    <p>EUR {ticket.price}</p>
                  <img src={ticket.picture} alt='' className="ticket-image"/>                        
                  <p>{ticket.description}</p>
              </div>)} 

              {
                  this.props.currentUser &&
                  this.state.edit &&
                  <AddTicket initialValues={ticket} onSubmit={this.editTicket} />
              }

              {
                  this.props.currentUser && 
                  !this.state.edit &&
                  <div>
                      <button onClick={ this.toggleEdit }>edit</button>
                  </div>
              }

              <div>
                  <h3>Comments</h3>
                  {comments.map(comment => (
                      <p key={comment.id}><b>{comment.user.firstName}:</b> {comment.text}</p>
                  ))}
              </div>

              {this.props.currentUser && <div className="add-comment">
              <AddComment onSubmit={this.addComment} />
              </div>}

            </div>
        )
  }
}

const mapStateToProps = function(state) {
  return {
      ticket: state.ticket,
      comments: state.comments,
      currentUser: state.currentUser,
      event: state.event, 
      tickets: state.tickets
  }
}

export default connect(mapStateToProps, { getTicket, getAllTickets, getSelectedComments, createComment, editTicket })(TicketDetails)