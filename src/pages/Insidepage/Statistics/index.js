import React, { Component } from 'react'
import { Breadcrumb, Card, Rate } from 'antd';
import Meeting from '../../../components/Meeting'
import './index.css';
import { useHistory, Link } from "react-router-dom";
import Echartsone from '../Statistics/components/Echartsone/index'
import Echartstwo from '../Statistics/components/Echartstwo/index'


export default class Statistics extends Component {
    
    render() {
        return (
		
		<div style={{ backgroundColor: '#f0f2f5' }}>
		  <Card bordered={false} >
		    <Breadcrumb>
		      <Breadcrumb.Item>警内公共门户</Breadcrumb.Item>
		      <Breadcrumb.Item>全局概览</Breadcrumb.Item>
		    </Breadcrumb>
		  </Card>
		 
		  <div className="layui-row">
			<div className="layui-col-md3">
			  <Card title="指令下发趋势" bordered={false} className="head5-3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
			  	
			  </Card>
			  <Card title="指令评价" bordered={false} className="head5-3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				 
			  </Card>
			</div>
			  <Card title="指令执行进程" bordered={false} className="head5-4 layui-col-md9" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
			  	<Echartstwo/>
			  </Card>
		  </div>
		  <div className="layui-row">
				
		  </div>
		  <div className="layui-row">
			<Card title="指令概览" bordered={false} className="head3-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				
			</Card>
			<Card title="全局概览" bordered={false} className="head3-1 layui-col-md4" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				
			</Card>
			<Card title="完结对比" bordered={false} className="head5-2 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<Echartsone/>
			</Card>
		  </div>
		  
		</div>
		
        )
    }

}
