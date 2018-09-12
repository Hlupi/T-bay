import React, {PureComponent} from 'react'

class AddEvent extends PureComponent {

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
        <div className="addevent-form">
          <form onSubmit={this.handleSubmit}>
          <div className="form-element">
              <label htmlFor="name">Name:</label>
              <input name="name" id="name" value={
                  this.state.name !== undefined ? this.state.name : initialValues.name || ''
              } onChange={ this.handleChange } />
          </div>

          <div>
              <label htmlFor="description">Description:</label>
              <input name="description" id="description" value={
                  this.state.description !== undefined ? this.state.description : initialValues.description || ''
              } onChange={ this.handleChange } />
          </div>

          <div>
              <label htmlFor="picture">Picture (url):</label>
              <input name="picture" id="picture" value={
                  this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
              } onChange={ this.handleChange } />
          </div>

          <div>
              <label htmlFor="starts">Start Date:</label>
              <input name="starts" id="starts" type="date" value={
                  this.state.starts !== undefined ? this.state.starts : initialValues.starts || ''
              } onChange={ this.handleChange } />
          </div>

          <div>
              <label htmlFor="ends">End Date:</label>
              <input name="ends" id="ends" type="date" value={
                  this.state.ends !== undefined ? this.state.ends : initialValues.ends || ''
              } onChange={ this.handleChange } />
          </div>
          <button type="submit">Create</button>

          </form>
          </div>
      )
  }
}

export default AddEvent