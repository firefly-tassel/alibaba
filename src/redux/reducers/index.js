/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'

//引入为Search组件服务的reducer
import search from './search'

//引入为Personal组件服务的reducer
import personal from './personal'

//引入为Security组件服务的reducer
import security from './security'

//引入为Topic组件服务的reducer
import topic from './topic'

//引入为CommentItem组件服务的reducer
import comment from './comment'


//汇总所有的reducer变为一个总的reducer
export default  combineReducers({
	search,
	personal,
	security,
	topic,
	comment
})