import React, { PureComponent } from 'react'

import Form from '../../fragments/Forms'


class AddTicket extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const initialValues = this.props.initialValues || {}
    const fields = [
      {
        label: 'Picture (url):',
        name: 'picture',
        type: 'text',
        value: this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
      },
      {
        label: 'Description:',
        name: 'description',
        type: 'text',
        value: this.state.description !== undefined ? this.state.description : initialValues.description || ''
      },
      {
        label: 'Price:',
        name: 'price',
        type: 'text',
        value: this.state.price !== undefined ? this.state.price : initialValues.price || ''
      },
    ]
    return (
      <Form
        onClick={this.props.close}
        onSubmit={this.handleSubmit}
        title="Add a ticket"
        fields={fields}
        onChange={this.handleChange}
        button="Post"
        open={this.props.open} />
    )
  }
}

export default AddTicket