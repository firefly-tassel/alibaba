import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, Tabs } from 'antd'
import './index.less'
import Personal from '../Personal';
import NoMatch from '../../pages/NoMatch'
import Security from '../Security';

const { TabPane } = Tabs;

class SettingLeft extends Component {

    render() {
        return (
            <div>
                <div className="set-menu">
                    <Tabs tabPosition="left">
                        <TabPane tab={<div className="common"><Icon type="user" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>个人资料</span></div>} key="1">
                            <div className="tab-content">
                                <Personal/>
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="common"><Icon type="safety-certificate" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>账号安全</span></div>} key="2">
                            <div className="tab-content">
                                <Security />
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="common"><Icon type="star" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>我的关注</span></div>} key="3">
                            <div className="tab-content">
                                <NoMatch />
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="common"><Icon type="heart" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>我的粉丝</span></div>} key="4">
                            <div className="tab-content">
                                <NoMatch />
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="common"><Icon type="pay-circle" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>我的积分</span></div>} key="5">
                            <div className="tab-content">
                                <NoMatch />
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="common"><Icon type="bars" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>我的活动</span></div>} key="6">
                            <div className="tab-content">
                                <NoMatch />
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="common"><Icon type="shopping-cart" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>我的订单</span></div>} key="7">
                            <div className="tab-content">
                                <NoMatch />
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="plan"><Icon type="bell" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>通知与隐私</span></div>} key="8">
                            <div className="tab-content">
                                <NoMatch />
                            </div>
                        </TabPane>
                        <TabPane tab={<div className="common"><Icon type="smile" style={{ fontSize: '18px' }} />&nbsp;&nbsp;<span>体验计划</span></div>} key="9">
                            <div className="tab-content">
                                <NoMatch />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default withRouter(SettingLeft);
