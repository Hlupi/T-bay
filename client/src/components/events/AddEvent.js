import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Wrapper from '../../fragments/Wrapper'

const Container = styled.article`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Backdrop = styled.div`
  background: rgba(60, 19, 211, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  cursor: pointer;
`

const Form = styled(Wrapper)`
  margin-top: 80px;
  margin-bottom: 80px;
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  z-index: 1;
  width: 90%;
  max-width: 500px;
  background: #fff;
  border-radius: 10px;
`


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

    return (
      <Container>
      <Backdrop onClick={this.props.close} />
        <Form as='form' onSubmit={this.handleSubmit}>
          <h3>Add an event</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input name="name" id="name" value={
              this.state.name !== undefined ? this.state.name : initialValues.name || ''
            } onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <input name="description" id="description" value={
              this.state.description !== undefined ? this.state.description : initialValues.description || ''
            } onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="picture">Picture (url):</label>
            <input name="picture" id="picture" value={
              this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
            } onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="starts">Start Date:</label>
            <input name="starts" id="starts" type="date" value={
              this.state.starts !== undefined ? this.state.starts : initialValues.starts || ''
            } onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="ends">End Date:</label>
            <input name="ends" id="ends" type="date" value={
              this.state.ends !== undefined ? this.state.ends : initialValues.ends || ''
            } onChange={this.handleChange} />
          </div>
          <button type="submit">Create</button>
      </Form>
      </Container>
    )
  }
}

export default AddEvent