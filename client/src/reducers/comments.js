import { GOT_SELECTED_COMMENTS, ADD_COMMENT } from '../actions/comments'

export default function (state = [], action) {
    switch (action.type) {
        case GOT_SELECTED_COMMENTS:
            return action.payload

        case ADD_COMMENT:
            return [...state, action.payload]
        
        default:
        return state
    }
  }