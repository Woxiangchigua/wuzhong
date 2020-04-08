import React, { Component } from 'react'
import { Breadcrumb, Card } from 'antd';
import Meeting from '../../components/Meeting'
// import './index.css';
import Tabletoday from '../Home/components/Tabletoday/index'
import Tabletowait from "../Home/components/Tabletowait/index"

const list = [
    { title: '会议1', message: '这是会议1' },
    { title: '会议2', message: '这是会议2' },
    { title: '会议3', message: '这是会议3' },
    { title: '会议4', message: '这是会议4' },
    { title: '会议4', message: '这是会议4' },
    { title: '会议4', message: '这是会议4' },
]


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: list
        }
    }
    render() {
        return (
		
		<div  style={{ backgroundColor: '#f0f2f5' }}>
		  <Card bordered={false} >
		    <Breadcrumb>
		      <Breadcrumb.Item>警务知识库</Breadcrumb.Item>
		    </Breadcrumb>
		  </Card>
		  <div>
			  <img src={require("../../img/img6.png")} alt=""/>
		  </div>
		</div>
		
        )
    }

}
