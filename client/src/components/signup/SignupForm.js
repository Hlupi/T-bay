import React, { PureComponent } from 'react'

export default class SignupForm extends PureComponent {
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
      <div className="signup-form">
  			<form onSubmit={this.handleSubmit}>
				  <label>
            First name <br />
            <input type="firstName" name="firstName" value={
  						this.state.firstName || ''
  					} onChange={ this.handleChange } />
          </label>
					<br />

					<label>
            Last Name <br />
            <input type="lastName" name="lastName" value={
  						this.state.lastName || ''
  					} onChange={ this.handleChange } />
          </label>
					<br />

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

  				<label>
            Confirm password <br />
  					<input type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
					}
					<br />

  				<button type="submit" className="btn">Sign up</button>
  			</form>
      </div>
		)
	}
}