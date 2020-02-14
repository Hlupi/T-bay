import { combineReducers } from 'redux'
import users from './users'
import login from './login'
import currentUser from './currentUser'
import signup from './signup'
import events from './events'
import event from './event'
import tickets from './tickets'
import ticket from './ticket'
import comments from './comments'
import isAdmin from './isAdmin'

export default combineReducers({
  users,
  login,
  currentUser,
  signup,
  events,
  event,
  tickets,
  ticket,
  comments,
  isAdmin
})