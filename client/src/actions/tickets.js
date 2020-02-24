import * as request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const GOT_SELECTED_TICKETS = 'GOT_SELECTED_TICKETS'
export const GOT_TICKET = 'GOT_TICKET'
export const ADD_TICKET = 'ADD_TICKET'
export const EDIT_TICKET = 'EDIT_TICKET'
export const DELETE_TICKET = 'DELETE_TICKET'

export const getSelectedTickets = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets/`)
    .then(response => dispatch({
      type: GOT_SELECTED_TICKETS,
      payload: response.body.tickets
    }))
    .catch(err => alert(err))
}

export const getTicket = (eventId, ticketId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .then(response => dispatch({
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
  const risk = state.ticket.risk

  request
    .put(`${baseUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => dispatch({
      type: EDIT_TICKET,
      payload: { ...response.body, risk }
    }))
}

export const deleteTicket = (ticketId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
  .delete(`${baseUrl}/tickets/${ticketId}`)
  .set('Authorization', `Bearer ${jwt}`)
  .then(response => dispatch({
    type: DELETE_TICKET,
    payload: ticketId
  }))
}