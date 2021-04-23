const mongoose = require('mongoose')
//连接mongo 并且使用react这个数据库
const DB_URL = 'mongodb://localhost:27017/react'
var db = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false    
})
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');

})

const models = {
    user: {
        'username': { 'type': String, 'require': true }, // 用户名
        'password': { 'type': String, 'require': true }, // 密码
        'avatar': { 'type': String }, // 头像
        'imageUrl': { 'type': String }, //头像源
        'email': { 'type': String, 'required': true}, // 邮箱
        'nickName': { 'type': String, }, // 昵称
        'sex': { 'type': String }, // 性别
        'province': { 'type': String, }, // 省
        'city': { 'type': String }, // 城市
        'birthday': { 'type': String }, // 出生日期
        'introduction': { 'type': String }, // 个人简介
        'labels': { 'type': Array }, // 标签
    },
    topic: {
        'key': { 'type': Number }, //话题号
        'publisher': { 'type': String, 'require': true }, // 发布者用户名
        'imageUrl': { 'type': String, 'require': true }, //发布者头像源
        'nickName': { 'type': String, 'require': true }, //发布者昵称
        'title': { 'type': String }, // 标题
        'content': { 'type': String }, // 内容
        'likeNum': { 'type': Number }, // 喜欢人数
        'eyeNum': { 'type': String }, // 查看人数
        'starNum': { 'type': Number }, // 收藏人数
        'commentList': { 'type': Array }, // 评论列表
    },
    comment: {
        'key': { 'type': Number }, // 评论号
        'commenter': { 'type': String }, // 评论者用户名
        'imageUrl': { 'type': String, 'require': true }, //评论者头像源
        'nickName': { 'type': String, 'require': true }, //评论者昵称
        'content': { 'type': String }, // 评论内容
        'to': { 'type': Number },  //评论对象
        'likeNum': { 'type': Number }, // 喜欢人数
        'dislikeNum': { 'type': Number }, // 不喜欢人数
    }
}

//创建所有对象的数据映射
for (let m in models) {
    //m为模型的名字，类似于表名，后边的参数类似于表中的字段
    mongoose.model(m, new mongoose.Schema(models[m]))
}

//暴露出接口
module.exports = {
    getModel: function (name) {
        //获取名字为name参数 所代表的数据
        return mongoose.model(name)
    }
}
