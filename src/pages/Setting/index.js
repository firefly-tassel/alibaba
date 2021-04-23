import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Footer from '../../components/Footer'
import Head from '../../components/Header'
import SettingLeft from '../../components/SettingLeft'
import './index.less'

class Setting extends Component {
    render() {
        return (
            <div className="set">
                <div className="set-head">
                    <Head />
                </div>
                <div className="set-content">
                    <SettingLeft/>
                </div>
                <div className="set-foot">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default withRouter(Setting)