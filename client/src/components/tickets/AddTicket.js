import React, { PureComponent } from 'react'
import * as Yup from 'yup'

import Form from '../../fragments/Forms'


const TicketSchema = Yup.object({
  picture: Yup.string()
    .url('This looks like an invalid url')
    .required('Please fill in the image url'),
    description: Yup.string()
    .required('Please provide a small description'),
    price: Yup.number()
    .required('Please indicate the asking price')
})

const initialValues = {
  picture: '',
  description: '',
  price: ''
}


class AddTicket extends PureComponent {
  state = {}

  handleSubmit = (data) => {
    this.props.onSubmit(data)
    this.props.close()
  }

  render() {
    const fields = [
      {
        label: 'Picture (url):',
        name: 'picture',
        type: 'text'
      },
      {
        label: 'Description:',
        name: 'description',
        type: 'text'
      },
      {
        label: 'Price:',
        name: 'price',
        type: 'number'
      },
    ]

    return (
      <Form
        initialValues={this.props.initialValues ? this.props.initialValues :initialValues}
        validationSchema={TicketSchema}
        onClick={this.props.close}
        handleSubmit={this.handleSubmit}
        fields={fields}
        open={this.props.open}
        title={this.props.title ? this.props.title : "Add a ticket"}
        button="Post"
        overlaying
      />
    )
  }
}

export default AddTicket