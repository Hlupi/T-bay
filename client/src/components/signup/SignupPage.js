import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { signup } from '../../actions/users'
import SignupForm from './SignupForm'
import { Container } from '../../fragments/Layout'
import Wrapper from '../../fragments/Wrapper'


class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postSignup(data.firstName, data.lastName, data.email, data.password)
	}

	render() {
		if (this.props.signup.success) return (
			<Redirect to="/login" />
		)

		return (
			<Container>
				<Wrapper>
					<SignupForm onSubmit={this.handleSubmit} />
					<p style={{ color: 'red' }}>{this.props.signup.error}</p>
				</Wrapper>
			</Container>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps, { postSignup: signup })(SignupPage)