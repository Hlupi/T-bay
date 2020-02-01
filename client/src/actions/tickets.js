import * as request from 'superagent'
import { baseUrl }  from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const GOT_ALL_TICKETS = 'GOT_ALL_TICKETS'
export const GOT_SELECTED_TICKETS = 'GOT_SELECTED_TICKETS'
export const GOT_TICKET = 'GOT_TICKET'
export const ADD_TICKET = 'ADD_TICKET'
export const EDIT_TICKET = 'EDIT_TICKET'

export const getAllTickets = () => (dispatch) => {
    request
    .get(`${ baseUrl }/tickets-all`)
    .then( response => dispatch({
        type: GOT_ALL_TICKETS,
        payload: response.body.allTickets
    }))
    .catch(err => alert(err))
}

// const addRiskToTickets = (tickets, ) => {
    
// }

export const getSelectedTickets = (eventId) => (dispatch, getState) => {
  request
  .get(`${ baseUrl }/events/tickets/${ eventId }`)
//   .then(response => response.body.tickets)
//   .then(tickets => {
//       // do your stuff
//         return dispatch({
//             type: GOT_SELECTED_TICKETS,
//             payload: your_stuff
//         })
//   })
// //   .then(response => dispatch({
// //       type: GOT_SELECTED_TICKETS,
// //       payload: response.body.tickets
// //   }))
.then(response => dispatch({
    type: GOT_SELECTED_TICKETS,
    payload: response.body.tickets
}))
  .catch(err => alert(err))
}

export const getTicket = (ticketId) => (dispatch) => {
    request 
    .get(`${baseUrl}/tickets/${ ticketId }`)
    .then( response => dispatch({
        type: GOT_TICKET,
        payload: response.body
    }))
    .catch(err => alert(err))
}

export const createTicket = (ticket) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    if (isExpired(jwt)) return dispatch(logout())

    request
    .post(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(response => dispatch({
        type: ADD_TICKET,
        payload: response.body
    }))
    .catch(err => alert(err))
}

export const editTicket = (ticketId, updates) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
    
    request
    .put(`${baseUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => dispatch({
      type: EDIT_TICKET,
      payload: response.body
    }))
}