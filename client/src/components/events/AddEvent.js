import React, { PureComponent } from 'react'

import Form from '../../fragments/Forms'


class AddEvent extends PureComponent {
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
        label: 'Name:',
        name: 'name',
        type: 'text',
        value: this.state.name !== undefined ? this.state.name : initialValues.name || ''
      },
      {
        label: 'Description:',
        name: 'description',
        type: 'text',
        value: this.state.description !== undefined ? this.state.description : initialValues.description || ''
      },
      {
        label: 'Picture (url):',
        name: 'picture',
        type: 'text',
        value: this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
      },
      {
        label: 'Start Date:',
        name: 'starts',
        type: 'date',
        value: this.state.starts !== undefined ? this.state.starts : initialValues.starts || ''
      },
      {
        label: 'End Date:',
        name: 'ends',
        type: 'date',
        value: this.state.ends !== undefined ? this.state.ends : initialValues.ends || ''
      }
    ]

    return (
      <Form 
        onClick={this.props.close}
        onSubmit={this.handleSubmit}
        title="Add event"
        fields={fields}
        onChange={this.handleChange}
        button="Create"
        open={this.props.open} />
    )
  }
}

export default AddEvent