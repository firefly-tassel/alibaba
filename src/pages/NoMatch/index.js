import React from 'react'
import { Empty } from "antd";
import './index.less'

export default class NoMatch extends React.Component{
  render(){
    return(
      <div className="no-match">
        <Empty />
      </div>
    )
  }
}