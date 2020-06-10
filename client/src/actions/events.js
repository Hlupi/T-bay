import * as request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const GOT_ALL_EVENTS = 'GOT_ALL_EVENTS'
export const GOT_EVENT = 'GOT_EVENT'
export const ADD_EVENT = 'ADD_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

export const getAllEvents = () => (dispatch, getState) => {
  if (getState().events.length) return

  request
  .get(`${baseUrl}/events`)
    .then(response => {
      return response.body.events.map(event => {
        const days = (ds)  => 1000 * 60 * 60 * 24 * Math.floor(Math.random() * Math.floor(ds))
        const newDate = (date, baseDate, ds) => new Date(date) < baseDate ? new Date(+baseDate + days(ds)).toISOString().split('T')[0] : date
        const newStarts = newDate(event.starts, new Date(), 15)
        const newEnds = newDate(event.ends, new Date(newStarts), 4)
        return {...event, starts: newStarts, ends: newEnds}
      }).sort((ev1, ev2) =>  new Date(ev1.starts) - new Date(ev2.starts))
    })
    .then(events => dispatch({
      type: GOT_ALL_EVENTS,
      payload: events
    }))
    .catch(err => alert(err))
}

export const getEvent = (eventId) => (dispatch, getState) => {
  const event = getState().event
  if(event && event.id === eventId) return

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
  const notQuiteAdmin = state.isAdmin === false

  if (isExpired(jwt)) return dispatch(logout())

  if(notQuiteAdmin) {
    dispatch({
      type: ADD_EVENT,
      payload: event
    })
  } else {
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
  }

export const updateEvent = (eventId, updates) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  const notQuiteAdmin = state.isAdmin === false
  
  if(notQuiteAdmin) {
    dispatch({
      type: EDIT_EVENT,
      payload: updates
    })
  } else {
    request
    .put(`${baseUrl}/events/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => 
      dispatch({
      type: EDIT_EVENT,
      payload: response.body
    })
  )
  }
}

export const deleteEvent = (eventId)  => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  const notQuiteAdmin = state.isAdmin === false

  if(notQuiteAdmin) {
    dispatch({
      type: DELETE_EVENT,
      payload: eventId
    })
  } else {
  request
  .delete(`${baseUrl}/events/${eventId}`)
  .set('Authorization', `Bearer ${jwt}`)
  .then(response => dispatch({
    type: DELETE_EVENT,
    payload: eventId
    }))
  }
}