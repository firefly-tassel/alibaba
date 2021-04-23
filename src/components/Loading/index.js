import React, { Component } from 'react'
import './index.less'

export default class Loading extends Component {
    render() {
        return (
            <div>
                <div className="loading">
                    <span className="loading-item"></span>
                    <span className="loading-item"></span>
                    <span className="loading-item"></span>
                    <span className="loading-item"></span>
                </div>
            </div>
        )
    }
}
