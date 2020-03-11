import React, { Component } from 'react'
import { Breadcrumb, Card } from 'antd';
import Meeting from '../../components/Meeting'
import './index.css';
import TableTest from "../Home/components/index"

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
		      <Breadcrumb.Item>会议主控平台</Breadcrumb.Item>
		      <Breadcrumb.Item>平台阅览</Breadcrumb.Item>
		    </Breadcrumb>
		  </Card>
		  <div className="layui-row">
			  <Card bordered={false} className="head2 layui-col-md4" style={{ marginTop: 10 }}>
				<p className="bot_line">今日会议</p>
				
			  </Card>
			  <Card bordered={false} className="head2 layui-col-md5" style={{ marginTop: 10 }}>
				<p className="bot_line">待办事项</p>
				<TableTest />
			  </Card>
			  <Card bordered={false} className="head3 layui-col-md3" style={{ marginTop: 10 }}>
				<p className="bot_line">通知</p>
				<div>
					<h4>管理员</h4>
					<p>有一份关于《苏州市公安局关于依法严厉打击新型冠状病毒感染的肺炎疫情防控期间违法犯罪活动的通告》的相关资料请相关与会人员认真阅读,与会积极探讨.</p>
					<span>2月25日 17:00</span>
				</div>
				<div>
					<h4>范久宁</h4>
					<p>为了认真落实</p>
					<span>2月25日 17:00</span>
				</div>
			  </Card>
		  </div>
		  <Card bordered={false} style={{ marginTop: 10 }}>
		    <Meeting  environment={this.props.environment} />
		  </Card>
		</div>
		
        )
    }

}
