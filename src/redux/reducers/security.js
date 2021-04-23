import { SECURITY } from "../action-types"
import { deepClone } from '../../function'

const initState = { nickName: '', email: '', phone: '', password: '' }

export default function securityReducer(preState = initState, action) {
    const { type, data } = action
    switch (type) {
      case SECURITY:
        for(let key in data) {
          if(preState.hasOwnProperty(key))
            preState[key] = data[key]
        }
        return deepClone(preState)
      default:
        return preState
    }
  }