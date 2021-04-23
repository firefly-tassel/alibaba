const express = require('express')
const userRouter = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

//当前用户用户名
var tempUser = ''


//获取所有用户数据
userRouter.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json({ data: doc })
    })
})

//获取当前用户数据
userRouter.get('/initial', function (req, res) {
    User.find({ username: tempUser }, function (err, doc) {
        if (doc) {
            // console.log(doc)
            return res.json({ data: doc[0] })
        }
        else {
            console.log("获取当前用户信息失败")
        }

    })
})

//获取指定用户数据
userRouter.post('/getUserInfo', function (req, res) {
    const { username } = req.body;
    User.find({ username: username }, function (err, doc) {
        if (doc) {
            // console.log(doc)
            return res.json({ data: doc[0] })
        }
        else {
            console.log(`获取用户${username}信息失败`)
        }

    })
})

//登录功能
userRouter.post('/login', function (req, res) {
    const { username, password } = req.body
    User.findOne({ username: username }, function (err, doc) {
        if (!doc) {
            console.log('该用户不存在')
            return res.json({ code: 0, msg: '该用户不存在，请前往注册' })
        }
        else {
            if (md5password(password) === doc.password) {
                tempUser = username
                console.log(`${tempUser}登录成功`)
                return res.json({ code: 1, msg: '登录成功' })
            }
            else {
                console.log('密码错误')
                return res.json({ code: 2, msg: '密码错误' })
            }
        }
    })

})

//注册功能
userRouter.post('/register', function (req, res) {
    const { username, password, email } = req.body

    User.findOne({ username: username }, function (err, doc) {
        //如果查询到，说明当前用户已经存在
        if (doc) {
            console.log('该用户已存在')
            return res.json({ code: 2, msg: '该用户已存在' })
        }
        //如果不存在，就创建一个新的
        User.create({ username: username, password: md5password(password), email: email }, function (e, d) {
            if (e) {
                console.log('后端出错了')
                return res.json({ code: 0, msg: '注册失败' })
            }
            console.log(`${username}注册成功`)
            return res.json({ code: 1, msg: '注册成功' })
        })
    })
})

//注销功能
userRouter.get('/delete', function (req, res) {
    User.findOne({ username: tempUser }, function (err, doc) {
        //如果查询到，说明当前用户已经存在
        if (doc) {
            User.findOneAndDelete({ username: tempUser }, () => {
                console.log(`用户${tempUser}注销成功`)
                tempUser = ''
                return res.json({ code: 1, msg: '注销成功' })
            })
        }
        else {
            console.log('未获取当前登录账号，注销失败')
            return res.json({ code: 0, msg: '注销失败' })
        }
    })
})


// 更新用户信息
userRouter.post('/update', function (req, res) {
    const { avatar, imageUrl, nickName, sex, province, city, birthday, introduction, labels } = req.body
    User.findOneAndUpdate({
        username: tempUser
    }, {
        $set: {
            avatar: avatar,
            nickName: nickName,
            sex: sex,
            province: province,
            city: city,
            birthday: birthday,
            introduction: introduction,
            labels: labels,
            imageUrl: imageUrl
        }
    }, { new: true, versionKey: false }, function (err, data) {
        if (err) {
            console.log('数据库发生错误')
            return res.json({ code: 0, msg: '保存失败' })
        }
        else if (!data) {
            console.log('未查找到相关数据')
            console.log(data)
            return res.json({ code: 2, msg: '保存失败' })
        }
        else if (data) {
            console.log(`用户${tempUser}数据修改成功`)
            // console.log(data)
            return res.json({ code: 1, msg: '保存成功' })
        }
    })
})

// 更新用户名
userRouter.post('/updateName', function (req, res) {
    const { nickName } = req.body
    User.findOneAndUpdate({
        username: tempUser
    }, {
        $set: {
            nickName: nickName
        }
    }, { new: true, versionKey: false }, function (err, data) {
        if (err) {
            console.log('数据库发生错误')
            return res.json({ code: 0, msg: '保存失败' })
        }
        else if (!data) {
            console.log('未查找到相关数据')
            console.log(data)
            return res.json({ code: 2, msg: '保存失败' })
        }
        else if (data) {
            console.log(`用户${tempUser}数据修改成功`)
            // console.log(data)
            return res.json({ code: 1, msg: '保存成功' })
        }
    })
})

// 更新邮箱
userRouter.post('/updateEmail', function (req, res) {
    const { email } = req.body
    User.findOneAndUpdate({
        username: tempUser
    }, {
        $set: {
            email: email
        }
    }, { new: true, versionKey: false }, function (err, data) {
        if (err) {
            console.log('数据库发生错误')
            return res.json({ code: 0, msg: '保存失败' })
        }
        else if (!data) {
            console.log('未查找到相关数据')
            console.log(data)
            return res.json({ code: 2, msg: '保存失败' })
        }
        else if (data) {
            console.log(`用户${tempUser}数据修改成功`)
            // console.log(data)
            return res.json({ code: 1, msg: '保存成功' })
        }
    })
})

//发送反馈意见
userRouter.post('/feedback', function (req, res) {
    const { email, suggestion } = req.body;
    const transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.qq.com', // 服务
        port: 465, // smtp端口
        secure: true,
        auth: {
            user: '1941816504@qq.com', //用户名
            pass: 'cnwpucxebuucjgjh' // SMTP授权码
        }
    }));
    transport.sendMail({
        from: email, // 发件邮箱
        to: ['1941816504@qq.com'], // 收件列表
        subject: '反馈意见', // 标题
        html: 
        `<p>小帮厨用户<strong>${tempUser}</strong>给你提出的反馈意见是:<br/>${suggestion}</p>` // html 内容
    },
        function (err, data) {
            if(err){
                console.log(err+' 发送失败')
                transport.close(); // 如果没用，关闭连接池
                return res.json({ code: 0, msg: '发送失败' })
            }    
            else{
                console.log('发送成功', data)
                transport.close(); // 如果没用，关闭连接池
                return res.json({ code: 1, msg: '发送成功' })   
            }
        }
    )
})


//密码加盐，让密码更加复杂，不易被破解
function md5password(password) {
    const salt = 'th_is_good_5555dsd54567!2##~!ww'
    return utils.md5(utils.md5(password + salt))
}

//用来暴露此页面的接口（加上之后，才可以调用）
module.exports = userRouter
