import { USER_LOGIN_SUCCESS, USER_LOGOUT, GET_USER_NAME } from '../actions/users'
import { localStorageJwtKey } from '../constants'

let initialState = null
try {
  const jwt = localStorage.getItem(localStorageJwtKey)
  if (jwt) {
    initialState = { jwt }
  }
}
catch (e) {
  console.log(`Error retrieving data from local storage`, e)
}

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case USER_LOGIN_SUCCESS:
			return {...state, ...payload}

    case USER_LOGOUT:
      return null
    
    case GET_USER_NAME:
      return { ...state, user: payload}

		default:
      return state
	}
}