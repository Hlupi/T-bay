import * as request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const GOT_ALL_EVENTS = 'GOT_ALL_EVENTS'
export const GOT_EVENT = 'GOT_EVENT'
export const ADD_EVENT = 'ADD_EVENT'

export const getAllEvents = () => (dispatch, getState) => {
  if (getState().events.length) return

  request
    .get(`${baseUrl}/events`)
    .then(response => dispatch({
      type: GOT_ALL_EVENTS,
      payload: response.body.events
    }))
    .catch(err => alert(err))
}

export const getEvent = (eventId) => (dispatch, getState) => {
  if (getState().event && getState().event.id == eventId) return

  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response => dispatch({
      type: GOT_EVENT,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(response => dispatch({
      type: ADD_EVENT,
      payload: response.body
    }))
    .catch(err => console.error(err))
}