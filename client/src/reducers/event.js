import { GOT_EVENT, EDIT_EVENT } from "../actions/events";

export default function (state = null, action) {
  switch (action.type) {
    case GOT_EVENT:
      return action.payload

    case EDIT_EVENT:
      return action.payload

    default:
      return state
  }
}