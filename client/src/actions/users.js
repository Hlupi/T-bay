import * as request from 'superagent'
import { baseUrl } from '../constants'
import { userId } from '../jwt'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const CHECK_ADMIN = 'CHECK_ADMIN'

export const logout = () => ({
  type: USER_LOGOUT
})

const userLoginSuccess = (login) => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILED,
  payload: error || 'Unknown error'
})

const userSignupFailed = (error) => ({
  type: USER_SIGNUP_FAILED,
  payload: error || 'Unknown error'
})

const userSignupSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const checkAdmin = (admin) => ({
  type: CHECK_ADMIN,
  payload: admin
})

export const login = (email, password) => (dispatch) =>
  request
    .post(`${baseUrl}/logins`)
    .send({ email, password })
    .then(result => dispatch(userLoginSuccess(result.body)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message))
      }
      else {
        console.error(err)
      }
    })

export const signup = (firstName, lastName, email, password) => (dispatch) =>
  request
    .post(`${baseUrl}/users`)
    .send({ firstName, lastName, email, password })
    .then(result => {
      dispatch(userSignupSuccess())
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch(userSignupFailed(err.response.body.message))
      }
      else {
        console.error(err)
      }
    })

export const getAdmin = (currentUser) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return
  const jwt = state.currentUser.jwt
  const user = userId(currentUser)

  request
    .get(`${baseUrl}/users/${user}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch(checkAdmin(response.body)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(logout())
      }
      else {
        console.error(err)
      }
    })
}
    