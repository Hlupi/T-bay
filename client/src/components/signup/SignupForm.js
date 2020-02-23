import React, { PureComponent } from 'react'
import * as Yup from 'yup'

import Form from '../../fragments/Forms'


const SignupSchema = Yup.object({
	firstName: Yup.string()
		.required("We'd like to know your name"),
	lastName: Yup.string()
		.required('For formal occasions'),
	email: Yup.string()
		.email('This looks like an invalid email')
		.required('Please fill in your email adress'),
	password: Yup.string()
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], "Passwords do not match")
		.required('Please repeat your password')
})

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: ''
}


export default class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (data) => {
		this.props.onSubmit(data)
	}

	render() {
		const fields = [
			{
				label: 'First Name',
				name: 'firstName',
				type: 'text',
			},
			{
				label: 'Last name',
				name: 'lastName',
				type: 'text',
			},
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
				autoComplete: "new-password"
			},
			{
				label: 'Confirm',
				name: 'confirmPassword',
				type: 'password',
				autoComplete: "new-password"
			},
		]

		return (
			<Form
				initialValues={initialValues}
				validationSchema={SignupSchema}
				handleSubmit={this.handleSubmit}
				fields={fields}
				formError={this.props.formError}
				title="Join us!"
				button="Signup"
			/>
		)
	}
}