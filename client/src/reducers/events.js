import { GOT_ALL_EVENTS, ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from '../actions/events'

export default function (state = [], action) {
  switch (action.type) {
    case GOT_ALL_EVENTS:
      return action.payload

    case ADD_EVENT:
      return [...state, action.payload]

    case EDIT_EVENT:
      return state.map(event => {
        if (event.id === action.payload.id) {
          return action.payload
        }
        else return event
      })

    case DELETE_EVENT:
      return state.filter(event => event.id !== action.payload)

    default:
      return state
  }
}