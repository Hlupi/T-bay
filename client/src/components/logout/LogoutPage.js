import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logout } from '../../actions/users'


class LogoutPage extends PureComponent {
	componentWillMount() {
		this.props.logout()
	}

	render() {
		if (!this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<div>
				<h1>Logging out...</h1>
			</div>
		)
	}
}

export default connect(null, { logout })(LogoutPage)