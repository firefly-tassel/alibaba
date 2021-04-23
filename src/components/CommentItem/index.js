import React from 'react'
import { Comment, Icon, Tooltip, Avatar, message } from 'antd';
import moment from 'moment';
import axios from 'axios'
import { connect } from 'react-redux'
import { changeComment } from '../../redux/actions/comment'
import './index.less'

moment.locale("zh-CN", { 
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年'
  }
})

class CommentItem extends React.Component {

  like = () => {
    let { key, likeNum, dislikeNum } = this.props.commentItem;
    likeNum += 1; 
    const p = this.props;
    axios.post('http://localhost:3000/api1/comment/updateComment', {key, likeNum, dislikeNum}).then(
      response => {
        if (response.status === 200 && response.data.code === 1) {
          console.log(response.data.msg);
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

  dislike = () => {
    let { key, likeNum, dislikeNum } = this.props.commentItem;
    dislikeNum += 1; 
    const p = this.props;
    axios.post('http://localhost:3000/api1/comment/updateComment', {key, likeNum, dislikeNum}).then(
      response => {
        if (response.status === 200 && response.data.code === 1) {
          console.log(response.data.msg);
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
    const p = this.props;
    const { key } = this.props.commentItem;
    axios.post('http://localhost:3000/api1/comment/deleteOne', { key }).then(
      response => {
          if(response.status === 200 && response.data.code === 1) {
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
          else
            message.error(response.data.msg, 1);
      },
      error => {
        console.log(error);
        message.error(error, 1);
      }
    )
  }

  render() {
    const { commenter, content, imageUrl, nickName, likeNum, dislikeNum } = this.props.commentItem;

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="喜欢">
          <Icon
            type="like"
            theme='filled'
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likeNum}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="不喜欢">
          <Icon
            type="dislike"
            theme='outlined'
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikeNum}</span>
      </span>,
      <span key="comment-basic-reply-to" onClick={this.delete}>{commenter === this.props.commenter ? '删除评论' : null}</span>,
    ];

    return (
      <Comment
        className="commentItem"
        actions={actions}
        author={<h3>{nickName ? nickName : 'XXX'}</h3>}
        avatar={
          <Avatar
            src={imageUrl}
            alt="U"
            icon="user"
          />
        }
        content={
          <p>
            {content}
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    );
  }
}

export default connect(
  state => ({ commenter: state.personal.username }),
  { changeComment }
)(CommentItem)
