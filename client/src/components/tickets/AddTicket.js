import React, {PureComponent} from 'react'

class AddTicket extends PureComponent {

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
              <label htmlFor="picture">Picture (url):</label>
              <input name="picture" id="picture" value={
                  this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
              } onChange={ this.handleChange } />
          </div>

          <div>
              <label htmlFor="price">Price:</label>
              <input name="price" id="price" value={
                  this.state.price !== undefined ? this.state.price : initialValues.price || ''
              } onChange={ this.handleChange } />
          </div>

          <div>
              <label htmlFor="description">Description:</label>
              <input name="description" id="description" value={
                  this.state.description !== undefined ? this.state.description : initialValues.description || ''
              } onChange={ this.handleChange } />
          </div>

          <button type="submit">Create</button>

          </form>
      )
  }
}

export default AddTicket