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

class RegisterForm extends Component {

    state = {
        pswMsg: false,
        emailMsg: false
    }

    handlePassWord = e => {
        var pswReg = /^[a-zA-Z\d]+$/;
        console.log(e.target.value);
        if(pswReg.test(e.target.value)) {
            this.setState({pswMsg: true})
        }
        else {
            this.setState({pswMsg: false})
        }
    }

    handleEmail = e => {
        var reg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        console.log(e.target.value);
        if(reg.test(e.target.value)) {
            this.setState({emailMsg: true})
        }
        else {
            this.setState({emailMsg: false})
        }
    }

    handleRegister = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var username =  this.props.form.getFieldValue('username');
                var password = this.props.form.getFieldValue('password');
                var email = this.props.form.getFieldValue('email');
                console.log(username, password, email);
                axios.post('http://localhost:3000/api1/user/register', {username, password, email}).then(
                    response => {
                        if(response.status === 200 && response.data.code === 1){
                            console.log(response.data.msg);
                            this.setState({msg: response.data.msg});
                            message.success(response.data.msg, 1);
                            setTimeout(() => {
                                this.props.history.push('/login')
                            }, 1000)
                        }    
                        else if(response.status === 200 && response.data.code === 2){
                            console.log(response.data.msg);
                            this.setState({msg: response.data.msg});
                            message.warning(response.data.msg, 1);
                            this.props.form.setFieldsValue({'username': '','password': '', 'email': ''})
                        }
                        else{
                            console.log(response.data.msg);
                            this.setState({msg: response.data.msg});
                            message.error(response.data.msg, 1);
                            this.props.form.setFieldsValue({'username': '','password': '', 'email': ''})
                        }  
                    },
                    error => {
                        message.error(error, 1);
                        console.log('?????????',error);
                        this.props.form.setFieldsValue({'username': '','password': '', 'email': ''})
                    }
                );
                axios.get('http://localhost:3000/api1/user/list').then(
                    response => {
                        console.log(response.data)
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="wrapter">
                    <h1 className="one">
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large">
                            <Icon type="home" style={{ fontSize: 20 }}/>
                        </Avatar>&nbsp;&nbsp;&nbsp;?????????
                    </h1>
                    <br/>
                    <hr/> <br/> <br/> <br/>
                    <div className="rcontent">
                        Gitee??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </div>
                    <ul className="out">
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                        <li className="in"></li>
                    </ul>
                </div>
                <div className="register">
                    <h2 className="title">??????</h2>
                    <div className="form">
                        <Form
                            {...layout}
                            name="basic"
                            onSubmit={this.handleRegister} 
                            className="register-form"
                            >
                            <Form.Item
                                label="?????????"
                                name="username"
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
                            >
                                {
                                    getFieldDecorator('password', {
                                        rules: [{ required: true, message: '??????????????????????????????', pattern: /^[a-zA-Z\d]+$/}],
                                    })(<Input.Password onChange={this.handlePassWord} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="???????????????"/>)
                                }
                            </Form.Item>

                            <Form.Item
                                label="??????"
                                name="email"
                            >
                                {
                                    getFieldDecorator('email', {
                                        rules: [{ required: true, message: '?????????????????????', pattern: /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ }],
                                    })(<Input onChange={this.handleEmail} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="???????????????"/>)
                                }
                            </Form.Item>
                            <div className="submit">
                                <Form.Item {...tailLayout}>
                                    <Button className="reg-btn" type="primary" htmlType="submit" >
                                    ????????????
                                    </Button>
                                </Form.Item>
                            </div>
                            <div className="jump" onClick={() => {this.props.history.push("/login");}}>?????????????&nbsp;&nbsp;<span>????????????</span></div>
                        </Form>  
                    </div>
                </div>
                <div className="foot">
                    <Footer />
                </div>
            </div>
        )
    }
}


const Register = Form.create()(RegisterForm);

export default withRouter(Register);
