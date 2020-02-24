import React, { PureComponent } from 'react'
import * as Yup from 'yup'

import Form from '../../fragments/Forms'

const LoginSchema = Yup.object({
	email: Yup.string()
		.email('This looks like an invalid email')
		.required('Please fill in your email adress'),
	password: Yup.string()
		.required('Password is required')
})

const initialValues = {
	email: '',
	password: ''
}


export default class LoginForm extends PureComponent {

	handleSubmit = (data) => {
		this.props.onSubmit(data)
	}

	render() {
		const fields = [
			{
				label: 'Email',
				name: 'email',
				type: 'email',
				autoComplete: "username"
			},
			{
				label: 'Password',
				name: 'password',
				type: 'password',
				autoComplete: "current-password"
			},
		]

		return (
			<Form
				initialValues={initialValues}
				validationSchema={LoginSchema}
				handleSubmit={this.handleSubmit}
				fields={fields}
				formError={this.props.formError}
				title="Welcome back"
				button="Login"
			/>
		)
	}
}