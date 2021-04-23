import React, { Component } from 'react'
import { Avatar, Icon, Menu, Dropdown, Modal, message } from 'antd'
import { connect } from 'react-redux'
import CommentItem from '../CommentItem'
import './index.less'
import { nanoid } from 'nanoid'
import axios from "axios";
import { changeTopic } from '../../redux/actions/topic'
import { changeComment } from '../../redux/actions/comment'

const { confirm } = Modal;

class PublishItem extends Component {

    state = {
        showComment: false,
        isLike: false,
        isStar: false,
    }

    showCommentMsg = () => {
        this.setState({showComment: !this.state.showComment});
    }

    handleChangeLikeNum = () => {
        const { isLike } = this.state;
        const p = this.props;
        let { key, likeNum, starNum } = p.publishItem;
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
        let { key, likeNum, starNum } = p.publishItem;
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

    delete = () => {
        const key = this.props.publishItem.key;
        const p = this.props;
        confirm({
            title: '请确认是否删除该话题?',
            content: '点击确认，该话题将被删除',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
                axios.post('http://localhost:3000/api1/topic/delete', { key: key }).then(
                    response => {
                        if(response.status === 200 && response.data.code === 1){
                            axios.post('http://localhost:3000/api1/comment/delete', { to: key }).then(
                                response => {
                                    if(response.status === 200 && response.data.code === 1) {
                                        axios.get('http://localhost:3000/api1/topic/initial').then(
                                            response => {
                                                const topicList = response.data.data;
                                                p.changeTopic({topicList: topicList});
                                            },
                                            error => {
                                                console.log(error);
                                            }
                                        ) 
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
                                },
                                error => {
                                    console.log(error);
                                    message.error(error, 1);
                                    
                                }
                            )
                            message.success(response.data.msg, 1);
                        }
                        else
                            message.error(response.data.msg, 1);
                    },
                    error => {
                        console.log(error);
                        message.error(error, 1);
                        
                    }
                )
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    
    render() {
        var flag = 0;
        const { showComment, isStar, isLike } = this.state;

        const menu = (
            <Menu>
              <Menu.Item key="0">
                <div className="operation">编辑</div>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="1">
                <div className="operation" onClick={this.delete}>删除</div>
              </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div className="publishItem">
                    <div className="publishItem-content">
                            <div className="publishItem-content-title"><Avatar size="small" icon="user" src={this.props.publishItem.imageUrl}></Avatar>&nbsp;<span className="publishItem-content-name">{this.props.publishItem.nickName}</span>&nbsp;&nbsp;<h3>{this.props.publishItem.title}</h3>&nbsp;&nbsp;<span className="publishItem-content-taga">置顶</span>&nbsp;&nbsp;<span className="publishItem-content-tagb">推荐</span></div>
                            <div className="publishItem-content-tag"><span className="publishItem-content-tag1">家常菜</span>&nbsp;&nbsp;<span className="publishItem-content-tag2">去火</span>&nbsp;&nbsp;<span className="publishItem-content-tag3">补血</span></div>
                            <p className="publishItem-content-w">{this.props.publishItem.content}</p>
                    </div>
                    <div className="publishItem-operation">
                        <span className="publishItem-operation-like" onClick={this.handleChangeLikeNum}>{isLike ? <Icon type="like" theme="filled"/>: <Icon type="like" /> }</span>&nbsp;<span>{this.props.publishItem.likeNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="publishItem-operation-eye"><Icon type="eye" /></span>&nbsp;<span>{this.props.publishItem.eyeNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="publishItem-operation-comment" onClick={this.showCommentMsg}><Icon type="message" /></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="publishItem-operation-star" onClick={this.handleChangeStarNum}>{isStar ? <Icon type="star" theme="filled"/>: <Icon type="star" /> }</span>&nbsp;<span>{this.props.publishItem.starNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <Dropdown overlay={menu} trigger={['click']}>
                            <span className="ant-dropdown-link" onClick={e => e.preventDefault()}><Icon type="ellipsis" /></span>
                        </Dropdown>
                    </div>  
                </div>
                <div className="publishItem-comment" style={{display: showComment ? 'inline-block' : 'none'}}>
                    {
                        this.props.commentList.map(item => {
                            if(item.to === this.props.publishItem.key){
                                flag++; 
                                return <div key={nanoid()}><CommentItem commentItem={item}/></div>
                            }
                            return null   
                        }) 
                    }
                    {  flag === 0 ?  <div className="publishItem-comment-empty">暂无评论</div> : null }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ commentList: state.comment.commentList, topicList: state.topic.topicList }),
    { changeComment, changeTopic}
)(PublishItem)
