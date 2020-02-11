import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { login } from '../../actions/users'
import LoginForm from './LoginForm'
import { Container } from '../../fragments/Layout'
import Wrapper from '../../fragments/Wrapper'



class LoginPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {
		if (this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<Container>
				<Wrapper>
					<LoginForm onSubmit={this.handleSubmit} />
					{this.props.error &&
					<span style={{color: 'red'}}>{this.props.error}</span>}
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