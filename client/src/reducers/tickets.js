import { GOT_ALL_TICKETS, GOT_SELECTED_TICKETS,  ADD_TICKET, EDIT_TICKET } from '../actions/tickets'

export default function (state = [], action) {
    switch (action.type) {
        case GOT_ALL_TICKETS:
            return action.payload

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
        
        default:
        return state
    }
  }