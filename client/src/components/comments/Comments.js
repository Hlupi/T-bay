import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getSelectedComments, deleteComment } from '../../actions/comments'
import { Description, Author } from '../../fragments/Content'
import { Comment, Content } from '../../fragments/Comments'
import CrossButton from '../../fragments/Button'

class Comments extends PureComponent {
  componentWillMount() {
    this.props.getSelectedComments(this.props.ticket)
  }

  onDelete = (id) => {
    this.props.deleteComment(id)
  }

  render() {
    const { comments, isAdmin } = this.props
     
    const hasComments = comments.length
    const renderComments = hasComments && comments.map((comment, i) => (
      <Comment key={i}>
        <Author comment>{comment.user.firstName}</Author>
        <Content admin={isAdmin}>{comment.text}</Content>
        {isAdmin &&  <CrossButton open red onClick={() => this.onDelete(comment.id)} small />}
      </Comment>
    ))

    return (
      <React.Fragment>
        {hasComments ? 
        <ul>{renderComments}</ul> : 
        <Description event>No comments yet</Description>}
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  ticket: state.ticket.id,
  comments: state.comments,
  isAdmin: state.isAdmin
})

export default connect(mapStateToProps, { getSelectedComments, deleteComment })(Comments)