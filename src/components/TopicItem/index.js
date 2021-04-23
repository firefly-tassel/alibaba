import React, { Component } from 'react'
import { Avatar, Button, Icon, Input, message } from 'antd'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { connect } from 'react-redux'
import CommentItem from '../../components/CommentItem'
import { changeComment} from '../../redux/actions/comment'
import { changeTopic} from '../../redux/actions/topic'
import './index.less'

const { TextArea } = Input;

class TopicItem extends Component {
    state = {
        showComment: false,
        isLike: false,
        isStar: false,
        tempComment: ''
    }

    showCommentMsg = () => {
        this.setState({showComment: !this.state.showComment});
    }

    handleChangeLikeNum = () => {
        const { isLike } = this.state;
        const p = this.props;
        let { key, likeNum, starNum } = p.topicItem;
        this.setState({isLike: !isLike});
        if(isLike) 
            likeNum -= 1; 
        else
            likeNum += 1;
        axios.post('http://localhost:3000/api1/topic/updateNum', {key, likeNum, starNum}).then(
            response => {
                if (response.status === 200 && response.data.code === 1) {
                    console.log(response.data.msg);
                    const topicList = p.topicList.map(item => {
                        if(item.key === key) {
                            item.likeNum = likeNum;
                        }
                        return item;
                    })
                    p.changeTopic({topicList: topicList});
                }
                else if (response.status === 200 && response.data.code === 2) {
                    console.log(response.data.msg);
                }
                else {
                    console.log(response.data.msg);
                }
            },
            error => {
                console.log('失败了', error);
            }
        )
    }

    handleChangeStarNum = () => {
        const { isStar } = this.state;
        const p = this.props;
        let { key, likeNum, starNum } = p.topicItem;
        this.setState({isStar: !isStar});
        if(isStar) 
            starNum -= 1; 
        else
            starNum += 1;
        axios.post('http://localhost:3000/api1/topic/updateNum', {key, likeNum, starNum}).then(
            response => {
                if (response.status === 200 && response.data.code === 1) {
                    console.log(response.data.msg);
                    const topicList = p.topicList.map(item => {
                        if(item.key === key) {
                            item.starNum = starNum;
                        }
                        return item;
                    })
                    p.changeTopic({topicList: topicList});
                }
                else if (response.status === 200 && response.data.code === 2) {
                    console.log(response.data.msg);
                }
                else {
                    console.log(response.data.msg);
                }
            },
            error => {
                console.log('失败了', error);
            }
        )
    }

    handleCommentChange = e => {
        this.setState({tempComment: e.target.value});
    }

    handleSend = () => {
        if(!this.state.tempComment)
            message.warn('输入内容不能为空');
        else{
            var keyList = [], key;  
            if(this.props.commentList.length === 0)
                key = 1;
            else {
                for(var i = 0; i < this.props.commentList.length; i++)
                    keyList.push(this.props.commentList[i].key);
                for(var j = 1; j <= (Math.max(...keyList)+1); j++) {
                    if(keyList.indexOf(j) === -1){
                        key = j;
                        break;
                    }     
                }
            }
            var tempCommentItem = { key: key, commenter: this.props.commenter, imageUrl: this.props.imageUrl, nickName: this.props.nickName, content: this.state.tempComment, to: this.props.topicItem.key };
            const p = this.props;
            axios.post('http://localhost:3000/api1/comment/add', tempCommentItem).then(
                response => {
                    if (response.status === 200 && response.data.code === 1) {
                        console.log(response.data.msg);
                        message.success(response.data.msg, 1);
                        axios.get('http://localhost:3000/api1/comment/initial').then(
                            response => {
                              const commentList = response.data.data;
                              p.changeComment({commentList: commentList});
                            },
                            error => {
                              console.log(error);
                            }
                        ) 
                    }
                    else if (response.status === 200 && response.data.code === 2) {
                        console.log(response.data.msg);
                        message.error(response.data.msg, 1);
                    }
                    else {
                        console.log(response.data.msg);
                        message.error(response.data.msg, 1);
                    }
                },
                error => {
                    message.error(error, 1);
                    console.log('失败了', error);
                }
            )
        }
    }

    handleKeySend = e => {
        const { tempComment } = this.state;
        if(e.keyCode === 13){
            if(!tempComment.replace(/[\r\n]/g,""))
                message.warn('输入内容不能为空');
            else{
                var keyList = [], key;  
                if(this.props.commentList.length === 0)
                    key = 1;
                else {
                    for(var i = 0; i < this.props.commentList.length; i++)
                        keyList.push(this.props.commentList[i].key);
                    for(var j = 1; j <= (Math.max(...keyList)+1); j++) {
                        if(keyList.indexOf(j) === -1){
                            key = j;
                            break;
                        }     
                    }
                }
                var tempCommentItem = { key: key, commenter: this.props.commenter, imageUrl: this.props.imageUrl, nickName: this.props.nickName, content: tempComment.replace(/[\r\n]/g,""), to: this.props.topicItem.key };
                const p = this.props;
                axios.post('http://localhost:3000/api1/comment/add', tempCommentItem).then(
                    response => {
                        if (response.status === 200 && response.data.code === 1) {
                            console.log(response.data.msg);
                            message.success(response.data.msg, 1);
                            axios.get('http://localhost:3000/api1/comment/initial').then(
                                response => {
                                  const commentList = response.data.data;
                                  p.changeComment({commentList: commentList});
                                },
                                error => {
                                  console.log(error);
                                }
                            ) 
                        }
                        else {
                            console.log(response.data.msg);
                            message.error(response.data.msg, 1);
                        }
                    },
                    error => {
                        message.error(error, 1);
                        console.log('失败了', error);
                    }
                )
            }
        }
        else
            return;
    }

    render() {
        const { showComment, isStar, isLike } = this.state;
        var flag = 0;
        this.props.commentList.sort((a, b) => b.likeNum - a.likeNum);
        return (
            <div>
                <div className="topicItem">
                    <div className="topicItem-content">
                            <div className="topicItem-content-title"><Avatar size="small" icon="user" src={this.props.topicItem.imageUrl}></Avatar>&nbsp;<span className="topicItem-content-name">{this.props.topicItem.nickName}</span>&nbsp;&nbsp;<h3>{this.props.topicItem.title}</h3>&nbsp;&nbsp;<span className="topicItem-content-taga">置顶</span>&nbsp;&nbsp;<span className="topicItem-content-tagb">推荐</span></div>
                            <div className="topicItem-content-tag"><span className="topicItem-content-tag1">家常菜</span>&nbsp;&nbsp;<span className="topicItem-content-tag2">去火</span>&nbsp;&nbsp;<span className="topicItem-content-tag3">补血</span></div>
                            <p className="topicItem-content-w">{this.props.topicItem.content}</p>
                    </div>
                    <div className="topicItem-operation">
                        <span className="topicItem-operation-like" onClick={this.handleChangeLikeNum}>{isLike ? <Icon type="like" theme="filled"/>: <Icon type="like" /> }</span>&nbsp;<span>{this.props.topicItem.likeNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="topicItem-operation-eye"><Icon type="eye" /></span>&nbsp;<span>{this.props.topicItem.eyeNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="topicItem-operation-comment" onClick={this.showCommentMsg}><Icon type="message" /></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="topicItem-operation-star" onClick={this.handleChangeStarNum}>{isStar ? <Icon type="star" theme="filled"/>: <Icon type="star" /> }</span>&nbsp;<span>{this.props.topicItem.starNum}</span> 
                    </div>
                </div>
                <div className="topicItem-comment" style={{display: showComment ? 'inline-block' : 'none'}}>
                    <div className="topicItem-comment-send">
                        <TextArea placeholder="请输入评论内容" onChange={this.handleCommentChange} onKeyUp={this.handleKeySend} allowClear="true"/>&nbsp;&nbsp;<Button type="primary" onClick={this.handleSend}>发送</Button>
                    </div>
                    <div className="topicItem-comment-divide"><hr/></div>
                    {
                        this.props.commentList.map(item => {
                            if(item.to === this.props.topicItem.key){
                                flag++; 
                                return <div key={nanoid()}><CommentItem commentItem={item}/></div>
                            }
                            return null   
                        }) 
                    }
                    {  flag === 0 ?  <div className="topicItem-comment-empty">暂无评论</div> : null }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({commenter: state.personal.username, imageUrl: state.personal.imageUrl, nickName: state.personal.nickName, commentList: state.comment.commentList, topicList: state.topic.topicList }),
    { changeComment, changeTopic }
)(TopicItem)
