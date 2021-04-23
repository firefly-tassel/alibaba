import { COMMENT } from "../action-types"
import { deepClone } from '../../function'

const initState = {
  commentList: []
}

export default function commentReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case COMMENT:
      for(let key in data) {
        if(preState.hasOwnProperty(key))
          preState[key] = data[key]
      }
      return deepClone(preState)
    default:
      return preState
  }
}