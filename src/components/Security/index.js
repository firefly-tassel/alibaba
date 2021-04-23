import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List, Icon, Button, Modal, message, Spin, Input } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import './index.less'
import { changeSecurity } from '../../redux/actions/security'
import { changePersonal } from '../../redux/actions/personal'

const { confirm } = Modal;

class Security extends Component {

    state = { 
        loading: false,
        edit1: false,
        edit2: false,
        edit3: false,
        edit4: false,
        link1: false,
        link2: false,
        link3: false,
        link4: false,
        link5: false,
        editName: false,
        editEmail: false,
        tempName: '',
        tempEmail: ''
    };

    delete = () => {
        const route = this.props.history;
        const obj = this;
        confirm({
            title: '请确认是否注销该账号?',
            content: '点击确认，该账号将被注销',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
                axios.get('http://localhost:3000/api1/user/delete').then(
                    response => {
                        if(response.status === 200 && response.data.code === 1){
                            obj.setState({loading: true});
                            setTimeout(() => {
                                obj.setState({loading: false});
                                message.success(response.data.msg, 1);
                                route.push('/register');
                            }, 2000)
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

	handleMouse = (flag, state) => {
        if(state === 'edit1')
		    return () => {this.setState({edit1: flag})}
        if(state === 'edit2')
		    return () => {this.setState({edit2: flag})}
        if(state === 'edit3')
		    return () => {this.setState({edit3: flag})}
        if(state === 'edit4')
		    return () => {this.setState({edit4: flag})}
        if(state === 'link1')
		    return () => {this.setState({link1: flag})}
        if(state === 'link2')
		    return () => {this.setState({link2: flag})}
        if(state === 'link3')
		    return () => {this.setState({link3: flag})}
        if(state === 'link4')
		    return () => {this.setState({link4: flag})}
        if(state === 'link5')
		    return () => {this.setState({link5: flag})}
	}

    handleNickName = () => {
        this.setState({editName: true, edit1: false});
    }

    handleEmail = () => {
        this.setState({editEmail: true, edit1: false});
    }

    changeName = e => {
        this.setState({tempName: e.target.value});
    }

    changeEmail = e => {
        this.setState({tempEmail: e.target.value});
    }

    handleCancel = value => {
        if(value === 'editName')
            return () => {this.setState({editName: false, edit1: false})}
        if(value === 'editEmail')
            return () => {this.setState({editEmail: false, edit2: false})}
    }

    updateName = () => {
        const data = this.props;
        const stat = this.state;
        const p = this;
        if(this.state.tempName && this.state.tempName !== this.props.nickName)
            confirm({
                title: '提示',
                content: '是否确认修改？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    console.log('OK');
                    setTimeout(() => {
                        axios.post('http://localhost:3000/api1/user/updateName', {nickName: stat.tempName}).then(
                            response => {
                                if (response.status === 200 && response.data.code === 1) {
                                    console.log(response.data.msg);
                                    message.success(response.data.msg, 1);
                                    data.changeSecurity({nickName: stat.tempName});
                                    data.changePersonal({nickName: stat.tempName});
                                    p.setState({editName: false, edit1: false});
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
                    }, 1000);
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        else
            message.warning('您还未做任何更改', 3);
    }

    updateEmail = () => {
        const data = this.props;
        const stat = this.state;
        const p = this;
        const reg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(this.state.tempEmail && this.state.tempEmail !== this.props.email)
            if(reg.test(this.state.tempEmail)) {
                confirm({
                    title: '提示',
                    content: '是否确认修改？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        console.log('OK');
                        setTimeout(() => {
                            axios.post('http://localhost:3000/api1/user/updateEmail', {email: stat.tempEmail}).then(
                                response => {
                                    if (response.status === 200 && response.data.code === 1) {
                                        console.log(response.data.msg);
                                        message.success(response.data.msg, 1);
                                        data.changeSecurity({email: stat.tempEmail});
                                        p.setState({editEmail: false, edit2: false});
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
                        }, 1000);
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            }
            else 
                message.warning('邮箱格式不正确', 3);
        else
            message.warning('您还未做任何更改', 3);
    }

    render() {
        const { edit1, edit2, edit3, edit4, link1, link2, link3, link4, link5, editName, editEmail } = this.state;

        const list = [
            editName ? <div>
                            <div className="sec-content-item">
                                <span>昵称</span>
                                <Input className="sec-content-data1" prefix={<Icon type="user"/>} defaultValue={this.props.nickName ? this.props.nickName : null} onChange={this.changeName} placeholder="请输入昵称"/>
                            </div>
                            <div className="sec-content-confirm"><Button size="small" onClick={this.handleCancel('editName')}>取消</Button>&nbsp;&nbsp;&nbsp;<Button type="primary" size="small" onClick={this.updateName}>保存</Button></div>
                        </div> : 
                <div className="sec-content-item">
                    <span>昵称</span><span className="sec-content-data1">{this.props.nickName ? this.props.nickName : 'XXX'}</span>
                    <div className="sec-content-edit" style={{color: edit1 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'edit1')} onMouseLeave={this.handleMouse(false, 'edit1')} onClick={this.handleNickName}><Icon type="edit" />&nbsp;编辑</div>
                </div>
            ,
            editEmail ? <div>
                            <div className="sec-content-item">
                                <span>电子邮箱</span>
                                <Input className="sec-content-data2" prefix={<Icon type="mail"/>} defaultValue={this.props.email} onChange={this.changeEmail}/>
                            </div>
                            <div className="sec-content-confirm"><Button size="small" onClick={this.handleCancel('editEmail')}>取消</Button>&nbsp;&nbsp;&nbsp;<Button type="primary" size="small" onClick={this.updateEmail}>保存</Button></div>
                        </div> :
                <div className="sec-content-item">
                    <span>电子邮箱</span><span className="sec-content-data2">{this.props.email}</span>
                    <div className="sec-content-edit" style={{color: edit2 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'edit2')} onMouseLeave={this.handleMouse(false, 'edit2')} onClick={this.handleEmail}><Icon type="edit" />&nbsp;编辑</div>
                </div>,
            <div className="sec-content-item"><span>手机号</span><span className="sec-content-data3">17870391037</span><div className="sec-content-edit" style={{color: edit3 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'edit3')} onMouseLeave={this.handleMouse(false, 'edit3')}><Icon type="edit" />&nbsp;编辑</div></div>,
            <div className="sec-content-item"><span>密码</span><span className="sec-content-data4">********</span><div className="sec-content-edit" style={{color: edit4 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'edit4')} onMouseLeave={this.handleMouse(false, 'edit4')}><Icon type="edit" />&nbsp;重置</div></div>
        ];
        
        const data = [
            <div className="sec-content-item">
                <Icon type="qq" className="sec-content-icon" style={{color: '#4a9afd'}}/>&nbsp;&nbsp;&nbsp;
                <span>QQ</span>
                <span className="sec-content-app1">已关联</span>
                <div className="sec-content-link" style={{color: link1 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'link1')} onMouseLeave={this.handleMouse(false, 'link1')}>
                    <Icon type="link" />&nbsp;取消关联
                </div>
            </div>,
            <div className="sec-content-item">
                <Icon type="wechat" className="sec-content-icon" style={{color: '#32CD32'}}/>&nbsp;&nbsp;&nbsp;
                <span>微信</span>
                <span className="sec-content-app2">已关联</span>
                <div className="sec-content-link" style={{color: link2 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'link2')} onMouseLeave={this.handleMouse(false, 'link2')}>
                    <Icon type="link" />&nbsp;取消关联
                </div>
            </div>,
            <div className="sec-content-item">
                <Icon type="github" className="sec-content-icon" style={{color: 'black'}}/>&nbsp;&nbsp;&nbsp;
                <span>GitHub</span>
                <span className="sec-content-app3">未关联</span>
                <div className="sec-content-link" style={{color: link3 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'link3')} onMouseLeave={this.handleMouse(false, 'link3')}>
                    <Icon type="link" />&nbsp;关联
                </div>
            </div>,
            <div className="sec-content-item">
                <Icon type="weibo" className="sec-content-icon" style={{color: '#B22222'}}/>&nbsp;&nbsp;&nbsp;
                <span>微博</span>
                <span className="sec-content-app4">未关联</span>
                <div className="sec-content-link" style={{color: link4 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'link4')} onMouseLeave={this.handleMouse(false, 'link4')}>
                    <Icon type="link" />&nbsp;关联
                </div>
            </div>,
            <div className="sec-content-item">
                <Icon type="zhihu" className="sec-content-icon" style={{color: '#1E90FF'}}/>&nbsp;&nbsp;&nbsp;
                <span>知乎</span>
                <span className="sec-content-app5">未关联</span>
                <div className="sec-content-link" style={{color: link5 ? '#1DA57A' : ''}} onMouseEnter={this.handleMouse(true, 'link5')} onMouseLeave={this.handleMouse(false, 'link5')}>
                    <Icon type="link" />&nbsp;关联
                </div>
            </div>
        ];
    
        return (
            <div className="security">
                <Spin spinning={this.state.loading}>
                    <div className="sec-title"><span>账号信息</span></div> 
                    <div className="sec-content">
                        <List
                            size="large"
                            bordered
                            dataSource={list}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </div>
                    <div className="sec-title"><span>关联第三方账号</span></div> 
                    <div className="sec-content">
                        <List
                            size="large"
                            bordered
                            dataSource={data}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </div>
                    <div className="sec-delete">
                        <Button type="danger" onClick={this.delete} ghost>注销账号</Button>
                    </div>
                </Spin>
            </div>
        )
    }
}

export default connect(
    state => ({ nickName: state.security.nickName, email: state.security.email }),
    { changeSecurity, changePersonal }
)(withRouter(Security))
