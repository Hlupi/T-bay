import React, { PureComponent } from 'react'

import { SForm, Title, Element, Label, Input, Submit } from '../../fragments/Forms'


export default class LoginForm extends PureComponent {
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
				<Title>Welcome back</Title>
				<Element>
					<Label htmlFor="email">Email</Label>
					<Input type="email" name="email" value={this.state.email || ''} onChange={this.handleChange} />
				</Element>
				<Element>
					<Label htmlFor="password">Password</Label>
					<Input type="password" name="password" value={this.state.password || ''} onChange={this.handleChange} />
				</Element>
				<Submit type="submit" center>Login</Submit>
			</SForm>
		)
	}
}