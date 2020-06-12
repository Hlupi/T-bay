import { combineReducers } from 'redux'

import signup from './signup'
import login from './login'
import currentUser from './currentUser'
import events from './events'
import event from './event'
import tickets from './tickets'
import ticket from './ticket'
import comments from './comments'
import isAdmin from './isAdmin'

export default combineReducers({
  signup,
  login,
  currentUser,
  events,
  event,
  tickets,
  ticket,
  comments,
  isAdmin
})