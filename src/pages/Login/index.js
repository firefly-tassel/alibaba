import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Icon, Avatar, message } from 'antd'
import Footer from '../../components/Footer'
import axios from 'axios'
import './index.less'


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class LoginForm extends Component {

    handleLogin = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var username = this.props.form.getFieldValue('username');
                var password = this.props.form.getFieldValue('password');
                console.log(username, password);
                axios.post('http://localhost:3000/api1/user/login', {username, password }).then(
                    response => {
                        if(response.status === 200 && response.data.code === 1){
                            console.log(response.data.msg);
                            this.setState({msg: response.data.msg});
                            message.success(response.data.msg, 1);
                            setTimeout(() => {
                                this.props.history.push('/admin')
                            }, 1000)
                        }    
                        else if(response.status === 200 && response.data.code === 2){
                            console.log(response.data.msg);
                            this.setState({msg: response.data.msg});
                            message.error(response.data.msg, 1);
                            this.props.form.setFieldsValue({'username': '','password': ''})
                        }
                        else{
                            console.log(response.data.msg);
                            this.setState({msg: response.data.msg});
                            message.warning(response.data.msg, 1);
                            this.props.form.setFieldsValue({'username': '','password': ''})
                        }  
                    },
                    error => {
                        message.error(error, 1);
                        console.log('?????????',error);
                        this.props.form.setFieldsValue({'username': '','password': ''})
                    }
                )
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
            <div className="lwrapter">
                <h1 className="lone">
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large">
                        <Icon type="home" style={{ fontSize: 20 }} />
                    </Avatar>&nbsp;&nbsp;&nbsp;?????????
                </h1>
                <br/>
                <hr/> <br/> <br/> <br/>
                <div className="lcontent">
                    Gitee??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                </div>
                <ul className="lout">
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                    <li className="lin"></li>
                </ul>
            </div>
            <div className="login">
                <h2 className="ltitle">??????</h2>
                <div className="lform">
                    <Form
                        {...layout}
                        name="basic"
                        onSubmit={this.handleLogin} 
                        className="login-form"
                        >
                        <Form.Item
                            label="?????????"
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: '????????????????????????!',
                            },
                            ]}
                        >
                            {
                                getFieldDecorator('username', {
                                    rules: [{ required: true, message: '?????????????????????' }],
                                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="??????????????????"/>)
                            }
                        </Form.Item>

                        <Form.Item
                            label="??????"
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: '?????????????????????!',
                            },
                            ]}
                        >
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: '??????????????????' }],
                                })( <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="???????????????"/>)
                            }
                        </Form.Item>

                        <div className="lsubmit">
                            <Form.Item {...tailLayout}>
                                <Button className="lbtn" type="primary" htmlType="submit" onClick={this.handleLogin}>
                                ??????
                                </Button>
                            </Form.Item>
                        </div>
                        <div className="ljump" onClick={() => {this.props.history.push("/register");}}>?????????????&nbsp;&nbsp;<span>????????????</span></div>
                    </Form>  
                </div><br/><br/><br/><br/><br/>
                <div className="thread">
                    <div className="left">??????????????????????????????</div>&nbsp;&nbsp;&nbsp;
                    <div className="lr">??????????????????</div>&nbsp;&nbsp;&nbsp;
                    <div className="right">??????????????????????????????</div>
                </div>
                <div className="logways">
                    <Avatar style={{ color: '#32CD32', backgroundColor: '#fde3cf' }} size="large">
                        <Icon type="wechat" style={{ fontSize: 18 }} />
                    </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Avatar style={{ color: '#4a9afd', backgroundColor: '#fde3cf' }} size="large">
                        <Icon type="qq" style={{ fontSize: 18 }} />
                    </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Avatar style={{ color: '#B22222', backgroundColor: '#fde3cf' }} size="large">
                        <Icon type="weibo" style={{ fontSize: 18 }} />
                    </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Avatar style={{ color: '#1E90FF', backgroundColor: '#fde3cf' }} size="large">
                        <Icon type="alipay" style={{ fontSize: 18 }} />
                    </Avatar>
                </div>
            </div>
            <div className="foot">
                <Footer />
            </div>
        </div>
        )
    }
}

const Login = Form.create()(LoginForm);

export default withRouter(Login);
