import React, { Component } from 'react'
import TopicItem from '../../components/TopicItem'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import './index.less'

class Topic extends Component {

    state = {}

    render() {
        const { topicList } = this.props;
        topicList.sort((a, b) => b.likeNum - a.likeNum);
        return (
            <div className="topic">
                <div className="topic-title"><div className="topic-title-text">公共话题</div></div>
                {
                    topicList.length !== 0 ?
                        topicList.map(item => <div key={nanoid()}><TopicItem topicItem={item}/></div>) :
                        <div className="topic-empty">暂无话题</div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({ topicList: state.topic.topicList }),
    {}
)(Topic)
