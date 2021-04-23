import React from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import NavLeft from './components/NavLeft';
import Footer from './components/Footer'
import './common.less';
import NavRight from './components/NavRight';

export default class Admin extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="app-head">
          <Header />
        </div>
        <div className="app-content">
          <Row type="flex" justify="center">
            <Col span={3} className="center">
              <NavLeft />
            </Col>
            <Col span={10} className="center">
              {this.props.children}   
            </Col>
            <Col span={5} className="center">
              <NavRight />
            </Col>
          </Row>
        </div>
        <div className="app-foot">
            <Footer />
        </div>
      </div>
    );
  }
}
