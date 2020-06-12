import { GOT_SELECTED_TICKETS, ADD_TICKET, EDIT_TICKET, DELETE_TICKET } from '../actions/tickets'

export default function (state = [], action) {
  switch (action.type) {
    case GOT_SELECTED_TICKETS:
      return action.payload

    case ADD_TICKET:
      return [...state, action.payload]

    case EDIT_TICKET:
      return state.map(ticket => {
        if (ticket.id === action.payload.id) {
          return action.payload
        }
        else return ticket
      })

    case DELETE_TICKET:
      return state.filter(ticket => ticket.id !== action.payload)

    default:
      return state
  }
}