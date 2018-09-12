import { GOT_ALL_EVENTS, ADD_EVENT } from '../actions/events'

export default function (state = [], action) {
    switch (action.type) {
        case GOT_ALL_EVENTS:
        return action.payload

        case ADD_EVENT:
        return [...state, action.payload]
        
        default:
        return state
    }
  }