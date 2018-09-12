import React, { PureComponent } from 'react'

export default class LoginForm extends PureComponent {
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

	render() {
		return (
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Email <br />
            <input type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </label>
          <br />

  				<label>
            Password <br />
            <input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
          </label>
          <br />

  				<button type="submit" className="btn">Login</button>
  			</form>
		  </div>)
	}
}