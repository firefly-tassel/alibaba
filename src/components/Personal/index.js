import React, { Component } from 'react'
import { Divider, Button, Input, Radio, Select, DatePicker, message, Modal, Upload, Icon } from 'antd'
import moment from 'moment'
import { connect } from "react-redux";
import axios from 'axios'
import './index.less'
import { changePersonal } from '../../redux/actions/personal';
import { changeSecurity } from '../../redux/actions/security';

moment.locale("zh-CN")
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
var provinceData = ["陕西", "四川", "天津", "西藏", "新疆", "浙江", "云南", "湖北", "江西",
    "重庆", "宁夏", "青海", "上海", "广东", "山西", "山东", "安徽", "北京", "福建", "甘肃", "广西",
    "贵州", "海南", "河北", "河南", "黑龙江", "湖南", "吉林", "江苏", "辽宁", "内蒙古", "香港", "澳门", "台湾"];
var cityData = {
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传JPG/PNG文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片必须小于2MB');
    }
    return isJpgOrPng && isLt2M;
}

class Personal extends Component {

    state = {
        loading: false, //头像加载
        cities: cityData[provinceData[5]], //省的所有城市
    };

    UNSAFE_componentWillMount() {
        fetch("https://os.alipayobjects.com/rmsportal/ODDwqcDFTLAguOvWEolX.json")
        .then(response => response.json())
        .then(data => {
            provinceData = data.map(item => item.label);
            console.log(provinceData);
            provinceData.map(item => {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].label === item)
                        cityData[item] = data[i].children.map(n => n.label);
                }
                return null;
            })
            console.log(cityData);
        })
        .catch(e => console.log(e));
    };

    handleProvinceChange = value => {
        this.setState({
            cities: cityData[value],
        });
        this.props.changePersonal({province: value});
        console.log('省:', value);
    };

    oncityChange = value => {
        this.props.changePersonal({city: value});
        console.log('城市:', value);
    };

    handleSexChange = e => {
        console.log('性别:', e.target.value);
        this.props.changePersonal({sex: e.target.value});
    };

    handleNameChange = e => {
        console.log('昵称:', e.target.value);
        this.props.changePersonal({nickName: e.target.value});
    };

    handleDateChange = value => {
        console.log('出生日期:', moment(value).format('YYYY-MM-DD'));
        this.props.changePersonal({birthday: moment(value).format('YYYY-MM-DD')});
    }

    handleIntrChange = e => {
        console.log('个人简介:', e.target.value);
        this.props.changePersonal({introduction: e.target.value});
    }

    handleTagChange = value => {
        console.log(`标签: ${value}`);
        this.props.changePersonal({labels: value});
    }

    update = () => {
        const data = this.props;
        confirm({
            title: '请确认是否保存修改信息?',
            content: '点击确认，您所做的修改将被保存。',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                console.log('OK');
                setTimeout(() => {
                    axios.post('http://localhost:3000/api1/user/update', data).then(
                        response => {
                            if (response.status === 200 && response.data.code === 1) {
                                console.log(response.data.msg);
                                message.success(response.data.msg, 1);
                                data.changeSecurity({nickName: data.nickName});
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

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    loading: false
                });
                this.props.changePersonal({imageUrl: imageUrl, avatar: info.file.name});
            });
        }
    };

    render() {
        const { cities } = this.state;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传头像</div>
            </div>
        );
        if (this.props.birthday)
            var date = moment(this.props.birthday, 'YYYY-MM-DD');
        return (
            <div className="personal">
                <div className="per-title"><span>个人资料</span></div><Divider />
                <div className="per-avatar">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {this.props.imageUrl ? <img src={this.props.imageUrl} alt="U" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div><br />
                <div className="per-basic"><h3>基本信息</h3></div>
                <Divider className="per-divider" />
                <div className="per-basic-content">
                    <div className="per-basic-item"><span>昵称</span><Input className="per-basic-input" value={this.props.nickName ? this.props.nickName: null} onChange={this.handleNameChange} placeholder="请输入昵称" /></div>
                    <div className="per-basic-item">
                        <span>性别</span>
                        <div className="per-basic-radio">
                            <Radio.Group onChange={this.handleSexChange} value={this.props.sex ? this.props.sex : null}>
                                <Radio value={'男'}>男</Radio>
                                <Radio value={'女'}>女</Radio>
                                <Radio value={'保密'}>保密</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="per-basic-item">
                        <span>现居地</span>
                        <div className="per-basic-place">
                            <Select
                                style={{ width: 120 }}
                                value={this.props.province ? this.props.province : null}
                                onChange={this.handleProvinceChange}
                                placeholder="省"
                            >
                                {provinceData.map(province => (
                                    <Option key={province}>{province}</Option>
                                ))}
                            </Select>&nbsp;&nbsp;&nbsp;
                            <Select
                                style={{ width: 120 }}
                                value={this.props.city ? this.props.city : null}
                                onChange={this.oncityChange}
                                placeholder="市"
                            >
                                {cities.map(city => (
                                    <Option key={city}>{city}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="per-basic-item">
                        <span>出生日期</span>
                        <div className="per-basic-birth">
                            <DatePicker value={date ? date : null} onChange={this.handleDateChange} placeholder="选择出生日期" />
                        </div>
                    </div>
                    <div className="per-basic-item">
                        <span>个人简介</span>
                        <div className="per-basic-intr">
                            <TextArea value={this.props.introduction ? this.props.introduction : null} onChange={this.handleIntrChange} placeholder="最多输入100个字" />
                        </div>
                    </div>
                    <div className="per-basic-item">
                        <span>个人标签</span>
                        <div className="per-basic-tag">
                            <Select
                                className="per-basic-select"
                                mode="multiple"
                                placeholder="选择标签"
                                value={this.props.labels ? this.props.labels : null}
                                onChange={this.handleTagChange}
                                optionLabelProp="label"
                            >
                                <Option value="china" label="China">
                                    <span role="img" aria-label="China">
                                        🇨🇳
                                </span>
                                China (中国)
                                </Option>
                                <Option value="usa" label="USA">
                                    <span role="img" aria-label="USA">
                                        🇺🇸
                                </span>
                                USA (美国)
                                </Option>
                                <Option value="japan" label="Japan">
                                    <span role="img" aria-label="Japan">
                                        🇯🇵
                                </span>
                                Japan (日本)
                                </Option>
                                <Option value="korea" label="Korea">
                                    <span role="img" aria-label="Korea">
                                        🇰🇷
                                </span>
                                Korea (韩国)
                                </Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="per-save">
                    <Button type="primary" className="per-save-btn" onClick={this.update}>保存</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ avatar: state.personal.avatar, imageUrl: state.personal.imageUrl, nickName: state.personal.nickName, province: state.personal.province, birthday: state.personal.birthday, introduction: state.personal.introduction, labels: state.personal.labels, sex: state.personal.sex, city: state.personal.city }),
    { changePersonal, changeSecurity }
)(Personal)
