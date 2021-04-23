import { PERSONAL} from "../action-types"
import { deepClone } from '../../function'

const initState = { username: '', avatar: '', imageUrl: '', nickName: '', province: '', birthday: '', introduction: '', labels: [], sex: '', city: '' }

export default function personalReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case PERSONAL:
      for(let key in data) {
        if(preState.hasOwnProperty(key))
          preState[key] = data[key]
      }
      return deepClone(preState)
    default:
      return preState
  }
}