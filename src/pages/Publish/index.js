import React, { Component } from 'react'
import { Button, Icon, Input, message } from 'antd'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import axios from 'axios'
import PublishItem from '../../components/PublishItem'
import NoMatch from '../NoMatch'
import './index.less'
import { changeTopic } from '../../redux/actions/topic'

const { TextArea } = Input;

class Publish extends Component {
    
    state = {
        showPublish: true,
        showAdd: false,
        title: '',
        content: ''
    }

    add = () => {
        this.setState({showPublish: false, showAdd: true});
    }

    cancel = () => {
        this.setState({showPublish: true, showAdd: false});
    }

    handleTitle = e => {
        this.setState({title: e.target.value})
    }

    handleContent = e => {
        this.setState({content: e.target.value})
    }

    send = () => {
        var keyList = [], key;
        if(this.props.topicList.length === 0)
            key = 1;
        else {
            for(var i = 0; i < this.props.topicList.length; i++)
                keyList.push(this.props.topicList[i].key);
            for(var j = 1; j <= (Math.max(...keyList)+1); j++) {
                if(keyList.indexOf(j) === -1)
                    key = j;
            }
        }
        const tempTopicItem = { key: key, publisher: this.props.publisher, imageUrl: this.props.imageUrl, 
            nickName: this.props.nickName, title: this.state.title, content: this.state.content, likeNum: 0
            , eyeNum: '0', starNum: 0 }
        const p = this.props;
        axios.post('http://localhost:3000/api1/topic/publish', tempTopicItem).then(
            response => {
                if (response.status === 200 && response.data.code === 1) {
                    console.log(response.data.msg);
                    message.success(response.data.msg, 1);
                    p.changeTopic({topicList: [tempTopicItem, ...p.topicList]});
                    this.setState({showPublish: true, showAdd: false});
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

    render() {

        const { showPublish, showAdd } = this.state;
        var flag = 0;
        var num = 0;
        this.props.topicList.map(item => {
            if(item.publisher === this.props.publisher) 
                num++;
            return null;
        });
        return (
            <div>
                <div className="publish-title"><div className="publish-title-text">我的发布</div></div><br/>
                <div style={{display: showPublish ? 'inline-block' : 'none'}}>
                    <div className="publish-cacl"><span className="publish-num">总共发布&nbsp;<span className="publish-number">{num}</span>&nbsp;个话题</span><Icon onClick={this.add} className="publish-add" type="plus-circle" style={{fontSize: '20px'}}/></div>
                    {
                        this.props.topicList.map(item => {
                            if(item.publisher === this.props.publisher) {
                                flag++;
                                return <div key={nanoid()}>
                                    <PublishItem publishItem={item}/>
                                </div>
                            }
                            return null;
                                    
                        })
                    }
                    {  flag === 0 ?  <NoMatch/> : null }
                </div>
                <div style={{display: showAdd ? 'inline-block' : 'none'}}>
                    <Input className="publish-addTitle" placeholder="请输入标题" onChange={this.handleTitle}/>
                    <TextArea className="publish-addContent" placeholder="请输入内容" rows={10} onChange={this.handleContent}/>
                    <Button type="primary" className="publish-addSend" onClick={this.send}>发布</Button>&nbsp;&nbsp;&nbsp;<Button onClick={this.cancel}>取消</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ topicList: state.topic.topicList, publisher: state.personal.username, imageUrl: state.personal.imageUrl, nickName: state.personal.nickName}),
    { changeTopic }
)(Publish)
