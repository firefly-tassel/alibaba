const express = require('express')
const userRouter = require('./user')
const topicRouter = require('./topic')
const commentRouter = require('./comment')
const bodyParser = require('body-parser')

//新建app
const app = express()

//使用bodyParser
app.use(bodyParser.json({limit : "2100000kb"})) //数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })) //解析post请求数据

app.use('/user', userRouter)
app.use('/topic', topicRouter)
app.use('/comment', commentRouter)


app.listen(5000, 'localhost',  (err) => {
    if (!err){
        console.log("服务器启动成功")
        console.log("请访问：http://localhost:5000")
    } 
    else 
        console.log(err);
})
