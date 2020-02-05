import React, { PureComponent } from 'react'

import { SForm, Title, Element, Label, Input, Submit } from '../../fragments/Forms'


export default class SignupForm extends PureComponent {
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
		return (
			<SForm onSubmit={this.handleSubmit} as="form">
				<Title>Join us!</Title>
				<Element>
					<Label htmlFor="firstName">First Name</Label>
					<Input type="text" name="firstName" id="firstName" value={this.state.firstName || ''} onChange={this.handleChange} />
				</Element>
				<Element>
					<Label htmlFor="lastName">Last name</Label>
					<Input type="text" name="lastName" id="lastName" value={this.state.lastName || ''} onChange={this.handleChange} />
				</Element>
				<Element>
					<Label htmlFor="email">Email</Label>
					<Input type="email" name="email" id="email" value={this.state.email || ''} onChange={this.handleChange} />
				</Element>
				<Element>
					<Label htmlFor="password">Password</Label>
					<Input type="password" name="password" id="password" value={this.state.password || ''} onChange={this.handleChange}  autocomplete="new-password" />
				</Element>
				<Element>
					<Label htmlFor="confirmPassword">Confirm password</Label>
					<Input type="password" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword || ''} onChange={this.handleChange}  autocomplete="new-password" />
				</Element>
				{
					this.state.password &&
					this.state.confirmPassword &&
					this.state.password !== this.state.confirmPassword &&
					<p style={{ color: 'red' }}>The passwords do not match!</p>
				}
				<Submit type="submit" center>Sign up</Submit>
			</SForm>
		)
	}
}