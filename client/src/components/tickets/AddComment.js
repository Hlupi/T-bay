import React, { PureComponent } from 'react'

import { Label, Input, Submit } from '../../fragments/Forms'


class AddComment extends PureComponent {
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
    return (
      <form onSubmit={this.handleSubmit}>
        <Label htmlFor="text" auto>Comment:</Label>
        <Input auto name="text" id="text" value={
          this.state.text !== undefined ? this.state.text : initialValues.text || ''
        } onChange={this.handleChange} />
        <Submit type="submit">Post</Submit>
      </form>
    )
  }
}

export default AddComment