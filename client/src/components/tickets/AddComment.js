import React, {PureComponent} from 'react'
import styled from 'styled-components'

const Label = styled.label`
  color: #3c13d3;
  margin-right: 20px;
`

const Button = styled.button`
  padding: 0 15px;
  border-radius: 10px;
  background: rgba(60, 19, 211, 0.1);
  color: #3c13d3;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
`

const Input = styled.input`
  border: 1px solid #3c13d3;
  color: #3c13d3;
  margin-right: 20px;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
  border-radius: 20px;
`

class AddComment extends PureComponent {

    state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  render () {
    const initialValues = this.props.initialValues || {}
      return(
          <form onSubmit={this.handleSubmit}>
              <Label htmlFor="text">Comment:</Label>
              <Input name="text" id="text" value={
                  this.state.text !== undefined ? this.state.text : initialValues.text || ''
              } onChange={ this.handleChange } />

          <Button type="submit">Post</Button>

          </form>
      )
  }
}

export default AddComment