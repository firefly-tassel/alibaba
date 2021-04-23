
const express = require('express')
const commentRouter = express.Router()
const model = require('./model')
const Comment = model.getModel('comment')

//获取评论
commentRouter.get('/initial', function (req, res) {
    Comment.find({}, function (err, doc) {
        if (doc) {
            // console.log(doc)
            return res.json({ data: doc })
        }
        else {
            console.log("获取评论失败")
        }

    })
})

//添加评论
commentRouter.post('/add', function(req, res) {
    const { key, commenter, imageUrl, nickName, content, to } = req.body;
    Comment.create({ key, commenter, imageUrl, nickName, content, to, likeNum: 0, dislikeNum: 0 }, function (e, d) {
        if (e) {
            console.log(`${e} 后端出错了`)
            return res.json({ code: 0, msg: '评论失败' })
        }
        console.log(`${commenter}向话题${to}添加评论成功`)
        return res.json({ code: 1, msg: '评论成功' })
    })
})

//删除一个话题下的所有评论
commentRouter.post('/delete', function (req, res) {
    const { to } = req.body 
    Comment.find({ to: to }, function (err, doc) {
        //如果查询到，说明话题已经存在
        if (doc) {
            Comment.deleteMany({ to: to }, () => {
                console.log(`话题${to}下的评论删除成功`)
                return res.json({ code: 1, msg: '删除成功' })
            })
        }
        else {
            console.log('删除失败')
            return res.json({ code: 0, msg: '删除失败' })
        }
    })
})

//更新评论
commentRouter.post('/updateComment', function (req, res) {
    const { key, likeNum, dislikeNum } = req.body
    Comment.findOneAndUpdate({
        key: key
    }, {
        $set: {
            likeNum: likeNum,
            dislikeNum: dislikeNum
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
            console.log(`评论${key}更新成功`)
            // console.log(data)
            return res.json({ code: 1, msg: '更新成功' })
        }
    })
})

//删除一个评论
commentRouter.post('/deleteOne', function (req, res) {
    const { key } = req.body 
    Comment.findOne({ key: key }, function (err, doc) {
        //如果查询到，说明话题已经存在
        if (doc) {
            Comment.deleteOne({ key: key }, () => {
                console.log(`评论${key}删除成功`)
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
module.exports = commentRouter