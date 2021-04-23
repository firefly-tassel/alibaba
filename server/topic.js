
const express = require('express')
const topicRouter = express.Router()
const model = require('./model')
const Topic = model.getModel('topic')

//获取所有话题
topicRouter.get('/initial', function (req, res) {
    Topic.find({}, function (err, doc) {
        if (doc) {
            // console.log(doc)
            return res.json({ data: doc })
        }
        else {
            console.log("获取所有话题失败")
        }

    })
})

//发布话题
topicRouter.post('/publish', function(req, res) {
    const { key, publisher, imageUrl, nickName, title, content, likeNum, eyeNum, starNum } = req.body;
    Topic.create({ key: key, publisher: publisher, imageUrl: imageUrl, nickName: nickName, title: title, content: content, likeNum: likeNum, eyeNum: eyeNum, starNum: starNum }, function (e, d) {
        if (e) {
            console.log(`${e} 后端出错了`)
            return res.json({ code: 0, msg: '发布失败' })
        }
        console.log(`${publisher}发布话题成功`)
        return res.json({ code: 1, msg: '发布成功' })
    })
})

//更新话题点赞数，收藏数
topicRouter.post('/updateNum', function (req, res) {
    const { key, likeNum, starNum } = req.body
    Topic.findOneAndUpdate({
        key: key
    }, {
        $set: {
            likeNum: likeNum,
            starNum: starNum
        }
    }, { new: true, versionKey: false }, function (err, data) {
        if (err) {
            console.log('数据库发生错误')
            return res.json({ code: 0, msg: '更新失败' })
        }
        else if (!data) {
            console.log('未查找到相关数据')
            console.log(data)
            return res.json({ code: 2, msg: '更新失败' })
        }
        else if (data) {
            console.log(`话题${key}更新成功`)
            // console.log(data)
            return res.json({ code: 1, msg: '更新成功' })
        }
    })
})


//删除话题
topicRouter.post('/delete', function (req, res) {
    const { key } = req.body 
    Topic.findOne({ key: key }, function (err, doc) {
        //如果查询到，说明话题已经存在
        if (doc) {
            Topic.findOneAndDelete({ key: key }, () => {
                console.log(`话题${key}删除成功`)
                return res.json({ code: 1, msg: '删除成功' })
            })
        }
        else {
            console.log('删除失败')
            return res.json({ code: 0, msg: '删除失败' })
        }
    })
})

//用来暴露此页面的接口（加上之后，才可以调用）
module.exports = topicRouter