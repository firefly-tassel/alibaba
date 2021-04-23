import { TOPIC} from "../action-types"
import { deepClone } from '../../function'

const initState = {
    topicList: [
        { key: 1, publisher: '', imageUrl:'', nickName:'', title: '教你如何制作剁椒鱼头', content: 'hello', likeNum: 10, eyeNum: '2k', starNum: 20},
        { key: 2, publisher: '', imageUrl:'', nickName:'', title: '论香菇滑鸡的重要性', content: 'nice', likeNum: 12, eyeNum: '2.2k', starNum: 10}
    ]
}

export default function topicReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case TOPIC:
      for(let key in data) {
        if(preState.hasOwnProperty(key))
          preState[key] = data[key]
      }
      return deepClone(preState)
    default:
      return preState
  }
}