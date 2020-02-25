import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { createEvent, updateEvent } from '../../actions/events'
import Form from '../../fragments/Forms'

const EventSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Event name should be at least 2 letters long')
    .required('Please fill in the name'),
  description: Yup.string()
    .required('Please provide a small description'),
  picture: Yup.string()
    .url('This looks like an invalid url')
    .required('Please fill in the image url'),
  starts: Yup.date()
    .required('Please indicate starting date'),
  ends: Yup.date()
    .required('Please indicate ending date')
})

const initialValues = {
  name: '',
  description: '',
  picture: '',
  starts: '',
  ends: ''
}


class EventForm extends PureComponent {

  addEvent = (event) => {
    this.props.createEvent(event)
    this.props.close()
  }

  editEvent = (event) => {
    this.props.updateEvent(event.id, event)
    this.props.close()
  }

  render() {
    const { editing, close, open } = this.props
    const fields = [
      {
        label: 'Name:',
        name: 'name',
        type: 'text'
      },
      {
        label: 'Description:',
        name: 'description',
        type: 'text'
      },
      {
        label: 'Picture (url):',
        name: 'picture',
        type: 'text'
      },
      {
        label: 'Start Date:',
        name: 'starts',
        type: 'date'
      },
      {
        label: 'End Date:',
        name: 'ends',
        type: 'date'
      }
    ]

    return (
      <Form
        initialValues={editing ? this.props.initialValues : initialValues}
        validationSchema={EventSchema}
        onClick={close}
        handleSubmit={editing? this.editEvent : this.addEvent}
        fields={fields}
        open={open}
        title={editing ? "Edit this event": "Add an event"}
        button="Post"
        overlaying
      />
    )
  }
}

export default connect(null, { createEvent, updateEvent })(EventForm)