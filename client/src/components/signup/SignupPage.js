import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { signup } from '../../actions/users'
import SignupForm from './SignupForm'

const Container = styled.div``


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
				<SignupForm onSubmit={this.handleSubmit} />
				<p style={{ color: 'red' }}>{this.props.signup.error}</p>
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