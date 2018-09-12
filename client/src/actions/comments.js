import * as request from 'superagent'
import { baseUrl }  from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const GOT_SELECTED_COMMENTS = 'GOT_SELECTED_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

export const GOT_ALL_COMMENTS = 'GOT_ALL_COMMENTS'
export const GOT_COMMENT = 'GOT_COMMENT'

export const getSelectedComments = (ticketId) => (dispatch) => {
  request
  .get(`${ baseUrl }/tickets/comments/${ ticketId }`)
  .then(response => dispatch({
      type: GOT_SELECTED_COMMENTS,
      payload: response.body.comments
  }))
  .catch(err => alert(err))
}

export const createComment = (comment) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
  .post(`${baseUrl}/comments`)
  .set('Authorization', `Bearer ${jwt}`)
  .send(comment)
  .then(response => dispatch({
      type: ADD_COMMENT,
      payload: response.body
  }))
  .catch(err => console.erroe(err))
}



export const getAllComments = () => (dispatch) => {
    request
    .get(`${ baseUrl }/comments`)
    .then( response => dispatch({
        type: GOT_ALL_COMMENTS,
        payload: response.body.comments
    }))
    .catch(err => alert(err))
}

export const getComment = (commentId) => (dispatch) => {
    request 
    .get(`${baseUrl}/comments/${ commentId }`)
    .then( response => dispatch({
        type: GOT_COMMENT,
        payload: response.body
    }))
    .catch(err => alert(err))
}