import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { createTicket, editTicket } from '../../actions/tickets'
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


class TicketForm extends PureComponent {

  editTicket = (ticket) => {
    this.props.editTicket(this.props.ticket.id, ticket)
    this.props.close()
  }

  createTicket = (ticket) => {
    ticket.event = this.props.event
    this.props.createTicket(ticket)
    this.props.close()
  }

  render() {
    const { editing, ticket, close, open } = this.props

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
        initialValues={editing ? ticket :initialValues}
        validationSchema={TicketSchema}
        onClick={close}
        handleSubmit={editing ? this.editTicket : this.createTicket}
        fields={fields}
        open={open}
        title={editing ? "Edit this ticket" : "Add a ticket"}
        button="Post"
        overlaying
      />
    )
  }
}

const mapStateToProps = state => ({
  ticket: state.ticket,
  event: state.event
})

export default connect(mapStateToProps, { createTicket, editTicket } )(TicketForm) 