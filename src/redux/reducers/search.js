import { TRANSMIT } from "../action-types";
export default function searchReducer(state = 1, action) {
  switch (action.type) {
    case TRANSMIT:
      return action.data
    default:
      return state
  }
}