import { CHECK_ADMIN, USER_LOGOUT } from '../actions/users'

export default function (state = null, action) {
  switch (action.type) {
    case CHECK_ADMIN:
      return action.payload
    case USER_LOGOUT:
      return null
    default:
      return state
  }
}