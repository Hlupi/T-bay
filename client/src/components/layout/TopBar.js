import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled, { css } from 'styled-components'

import Wrapper from '../../fragments/Wrapper'

const Container = styled.nav`
  padding-top: 10px;
  padding-bottom: 10px;
  background: #3C13D3;
  color: #fff;
  ${({ withHeader }) => withHeader && css`
    @media(min-width: 640px) {
      width: 100%;
      background: transparent;
      z-index: 1;
      position: absolute;
      }
  `}
`

const Nav = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  background: none;
  color: #fff;
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`


const TopBar = (props) => {
  const { location, history, user } = props

  const renderUserOptions = user ?
                            <Button onClick={() => history.push('/logout')}>Log out</Button> :
                            location.pathname.indexOf('login') > 0 ?
                            <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button> :
                            <Button onClick={() => history.push('/login')}>Login</Button>

  return (
    <Container withHeader={/events$/.test(location.pathname)}>
      <Nav>
        <p>Tbay</p>
        <ul>
          { !/events$/.test(location.pathname) && <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button> }
          { renderUserOptions }
        </ul>
      </Nav>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)