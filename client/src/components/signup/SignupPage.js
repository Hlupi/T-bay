import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { signup } from '../../actions/users'
import { Container, Wrapper } from '../../fragments/Layout'
import SignupForm from './SignupForm'


class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postSignup(data.firstName, data.lastName, data.email, data.password)
	}

	render() {
		const { error, success } = this.props

		if (success) return (
			<Redirect to="/login" />
		)

		return (
			<Container styledPage>
				<SignupForm onSubmit={this.handleSubmit} formError={error} />
			</Container>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		error: state.signup.error,
		success: state.signup.success
	}
}

export default connect(mapStateToProps, { postSignup: signup })(SignupPage)