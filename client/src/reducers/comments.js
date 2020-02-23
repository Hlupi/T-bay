import { GOT_SELECTED_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from '../actions/comments'

export default function (state = [], action) {
    switch (action.type) {
        case GOT_SELECTED_COMMENTS:
            return action.payload

        case ADD_COMMENT:
            return [...state, action.payload]

        case DELETE_COMMENT:
            return state.filter(comment => comment.id !== action.payload)
        
        default:
        return state
    }
  }