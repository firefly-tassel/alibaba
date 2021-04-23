import React from 'react';
import { Input, Menu, Avatar, Divider, Icon, Button, Dropdown, Switch, Drawer, Timeline, Form, message } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import './index.less';
import { transmit } from '../../redux/actions/search';
import { changePersonal } from '../../redux/actions/personal';
import { changeSecurity } from '../../redux/actions/security';
import { changeTopic } from '../../redux/actions/topic'
import { changeComment } from '../../redux/actions/comment'

const { TextArea } = Input;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let styleLabel = document.createElement('style');


class HeaderForm extends React.Component {

  state = {
    value: '',
    visible: false,
    parentDrawer: false,
    childrenDrawer: false
  }

  static propTypes = {
    transmit: PropTypes.func.isRequired
  }

  UNSAFE_componentWillMount() {
    axios.get('http://localhost:3000/api1/user/initial').then(
      response => {
        const { username, email } = response.data.data;
        const avatar = response.data.data.avatar ? response.data.data.avatar : '';
        const imageUrl = response.data.data.imageUrl ? response.data.data.imageUrl : '';
        const nickName = response.data.data.nickName ? response.data.data.nickName : '';
        const province = response.data.data.province ? response.data.data.province : '';
        const birthday = response.data.data.birthday ? response.data.data.birthday : '';
        const introduction = response.data.data.introduction ? response.data.data.introduction : '';
        const labels = response.data.data.labels ? response.data.data.labels : [];
        const sex = response.data.data.sex ? response.data.data.sex : '';
        const city = response.data.data.city ? response.data.data.city : '';
        this.props.changePersonal({username: username, avatar: avatar, imageUrl: imageUrl, nickName: nickName, province: province, birthday: birthday, introduction: introduction, labels: labels, sex: sex, city: city});
        this.props.changeSecurity({nickName: nickName, email: email});
      },
      error => {
        console.log(error);
      }
    )
    axios.get('http://localhost:3000/api1/topic/initial').then(
        response => {
            const topicList = response.data.data;
            this.props.changeTopic({topicList: topicList});
        },
        error => {
            console.log(error);
        }
    ) 
    axios.get('http://localhost:3000/api1/comment/initial').then(
        response => {
            const commentList = response.data.data;
            this.props.changeComment({commentList: commentList});
        },
        error => {
            console.log(error);
        }
    ) 
  }

  handleMenuClick = e => {
    if (e.key !== '3') {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  // 获取Input框的value值
  getInputValue = event => {
    let value = event.target.value;
    this.setState({
      value
    });
  };
  //菜谱搜索
  menuSearch = () => {
    let value = this.state.value;
    this.props.transmit(value)

  };

  //转换开关
  onChange = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      const style = 'html{filter: invert(100%) hue-rotate(180deg);}img,video {filter: invert(100%) hue-rotate(180deg);}';
      styleLabel.appendChild(document.createTextNode(style));
      document.head.appendChild(styleLabel);
    } else {
      document.head.removeChild(styleLabel);
    }
  }

  showDrawer = () => {
    this.setState({
      parentDrawer: true,
    });
  };

  onClose = () => {
    this.setState({
      parentDrawer: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, suggestion } = values;
        console.log(`邮箱：${email} 反馈意见：${suggestion}`);
        axios.post('http://localhost:3000/api1/user/feedback', { email, suggestion }).then(
          response => {
            if(response.status === 200 && response.data.code === 1){
              message.success(response.data.msg, 1);
              this.props.form.setFieldsValue({'email': '','suggestion': '' })
            }
            else{
              message.error(response.data.msg, 1);
            }
          },
          error => {
            message.error(error, 1);
          }
        )
      }
    });
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <div className="msg" onClick={() => { this.props.history.push("/setting") }}>
            <span className="icon"><Icon type="setting" /></span>&nbsp;&nbsp;&nbsp;我的设置
          </div>
        </Menu.Item>
        <Menu.Item key="2">
          <div className="msg" onClick={() => { this.props.history.push("/admin/publish") }}>
            <span className="icon"><Icon type="file" /></span>&nbsp;&nbsp;&nbsp;我的发布
          </div>
        </Menu.Item>
        <Menu.Item key="3">
          <div className="msg">
            <span className="icon"><Icon type="bulb" theme="filled" /></span>&nbsp;&nbsp;&nbsp;Dark Side<span className="switch"><Switch size="small" onChange={this.onChange} /></span>
          </div>
        </Menu.Item>
        <Menu.Item key="4">
          <div className="msg" onClick={() => { this.props.history.push("/login") }}>
            <span className="icon" ><Icon type="logout" /></span>&nbsp;&nbsp;&nbsp;退出
          </div>
        </Menu.Item>
      </Menu>
    );

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="container">
        <div className="topbar-container">
          <div className="logo">
            <Avatar style={{ color: 'white', backgroundColor: '#1DA57A' }} size="large">
              <Icon type="home" style={{ fontSize: 20 }} />
            </Avatar>&nbsp;&nbsp;
            <NavLink to="/admin/home">
              <span>小帮厨</span>
            </NavLink>
          </div>
          <Input
            style={{ width: '22%' }}
            placeholder="搜索菜谱、食材"
            onChange={event => this.getInputValue(event)}
            allowClear
            size="large"
          />&nbsp;
          <NavLink to="/admin/search">
            <Button
              type="primary"
              icon="search"
              size="large"
              onClick={this.menuSearch}
            >
              搜菜谱
            </Button>
          </NavLink>

          <div className="topbar-menu">
            <Menu mode="horizontal">

              <SubMenu
                title={<span className="submenu-title-wrapper">菜谱分类</span>}
              >
                <MenuItemGroup title="常用主题" />
                <MenuItemGroup title="常见食材" />
                <MenuItemGroup title="时令食材" />
              </SubMenu>
              <Menu.Item key="alipay">
                <NavLink to="/admin/topic">话题</NavLink>
              </Menu.Item>
              <Menu.Item key="mail"><NavLink to="/admin/menu">菜单</NavLink></Menu.Item>
              <Menu.Item key="app"><NavLink to="/admin/collections">我的主页</NavLink></Menu.Item>

            </Menu>
          </div>
          <div className="avatar">
            <Dropdown onVisibleChange={this.handleVisibleChange} visible={this.state.visible} overlay={menu} trigger={['click']} placement="bottomRight" arrow="true">
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} src={this.props.imageUrl} alt="U" />
            </Dropdown>
            <Divider type="vertical" />
            <div className="feedback">
              <Icon type="book" style={{ fontSize: 25, color: '#1DA57A' }} onClick={this.showDrawer} />
            </div>
            <Drawer
              title="小厨房的历史"
              width={520}
              closable={false}
              onClose={this.onClose}
              visible={this.state.parentDrawer}
            >
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
                  Technical testing 2015-09-01
                </Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item color="red">
                  <p>Solve initial network problems 1</p>
                  <p>Solve initial network problems 2</p>
                  <p>Solve initial network problems 3 2015-09-01</p>
                </Timeline.Item>
              </Timeline>
              <Divider/>
              <p className="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>小厨房致力于改善人民生活，一切以人民最高利益为宗旨，
                感谢您对小厨房的支持<Icon type="heart" />，祝您生活愉快，更多反馈请点击下方按钮。</strong></p>
              <Button type="primary" onClick={this.showChildrenDrawer} className="btn">
                意见反馈
              </Button>
              <Drawer
                title="意见反馈"
                width={320}
                closable={false}
                onClose={this.onChildrenDrawerClose}
                visible={this.state.childrenDrawer}
              >
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: '请输入正确的邮箱', pattern: /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ }],
                    })(
                      <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="QQ邮箱"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('suggestion', {
                      rules: [{ required: true, message: '请输入您的反馈意见' }],
                    })(
                      <TextArea
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="反馈意见"
                        rows={10}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      提交
                    </Button>
                  </Form.Item>
                </Form>
              </Drawer>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}

const Header = Form.create()(HeaderForm);

export default connect(
  state => ({ keyword: state.search, imageUrl: state.personal.imageUrl }),
  { transmit, changePersonal, changeSecurity, changeTopic, changeComment }
)(withRouter(Header))