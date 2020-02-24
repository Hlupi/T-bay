import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../actions/users'
import { Container } from '../../fragments/Layout'
import Wrapper from '../../fragments/Wrapper'
import LoginForm from './LoginForm'



class LoginPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {
		const { error } = this.props

		if (this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<Container>
				<Wrapper>
					<LoginForm onSubmit={this.handleSubmit} formError={error} />
				</Wrapper>
			</Container>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
		error: state.login.error
	}
}

export default connect(mapStateToProps, { login })(LoginPage)