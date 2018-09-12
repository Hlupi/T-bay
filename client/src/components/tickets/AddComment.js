import React, {PureComponent} from 'react'

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
          <div>
              <label htmlFor="text">Add a comment</label>
              <input name="text" id="text" value={
                  this.state.text !== undefined ? this.state.text : initialValues.text || ''
              } onChange={ this.handleChange } />
          </div>

          <button type="submit">Say it</button>

          </form>
      )
  }
}

export default AddComment