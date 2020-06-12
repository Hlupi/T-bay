import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'

import { createComment } from '../../actions/comments'
import { Label, Input, Button, Error } from '../../fragments/Forms'


const CommentSchema = Yup.object({
  text: Yup.string()
    .min(2, 'This comment looks too short')
    .required('Type your comment above')
})

const initialValues = {
  text: ''
}

class AddComment extends PureComponent {
  addComment = (comment) => {
    comment.ticket = this.props.ticket
    this.props.createComment(comment)
  }

  render() {
    return (
      <Formik 
        initialValues={initialValues}
        validationSchema={CommentSchema} onSubmit={(values, { resetForm }) => {
        this.addComment(values)
        resetForm()
        }}>
        {props => {
          const { values, touched, errors, handleChange, handleSubmit } = props

          return (
            <form onSubmit={handleSubmit}>
              <Label htmlFor="text" auto>Comment:</Label>
              <Input name="text" id="text" value={values.text} onChange={handleChange} type="text" auto />
              <Button type="submit" onClick={handleSubmit}>Post</Button>
              {errors.text && touched.text && <Error comment visible={errors.text && touched.text}>{errors.text}</Error>}
            </form>
          )}
        }
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  ticket: state.ticket
})

export default connect(mapStateToProps, { createComment })(AddComment)