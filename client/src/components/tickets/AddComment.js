import React, { PureComponent } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

import { Label, Input, Submit, Error } from '../../fragments/Forms'


const CommentSchema = Yup.object({
  text: Yup.string()
    .min(2, 'This comment looks too short')
    .required('Type your comment above')
})

const initialValues = {
  text: ''
}

class AddComment extends PureComponent {
  handleSubmit = (data) => {
    this.props.onSubmit(data)
  }


  render() {
    const fields = [
      {
        label: 'Comment:',
        name: 'text',
        type: 'text'
      }
    ]
    return (
      <Formik initialValues={initialValues}
      validationSchema={CommentSchema} onSubmit={(values, { resetForm }) => {
        this.handleSubmit(values)
        resetForm()
       }}>
        {props => {
        const {
       values,
       touched,
       errors,
       handleChange,
       handleSubmit
    } = props
      return (
        <form onSubmit={handleSubmit}>
        <Label htmlFor="text" auto>Comment:</Label>
        <Input auto name="text" id="text" 
        value={values.text || ''} 
        onChange={handleChange} type="text"
         />
        <Submit type="submit" onClick={handleSubmit}>Post</Submit>
         {errors.text && touched.text && <Error comment visible={errors.text && touched.text}>{errors.text}</Error>}
        </form>
      )}
}
      </Formik>

    )
  }
}

export default AddComment