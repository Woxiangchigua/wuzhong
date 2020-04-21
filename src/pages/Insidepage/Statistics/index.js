import React, { Component } from 'react'
import { Breadcrumb, Card, Rate } from 'antd';
import Meeting from '../../../components/Meeting'
import './index.css';
import { useHistory, Link } from "react-router-dom";
import Echartsone from '../Statistics/components/Echartsone/index'
import Echartstwo from '../Statistics/components/Echartstwo/index'
import Echartsthree from '../Statistics/components/Echartsthree/index'
import Echartsfour from '../Statistics/components/Echartsfour/index'
import Echartsfive from '../Statistics/components/Echartsfive/index'
import Echartssix from '../Statistics/components/Echartssix/index'
import Echartsseven from '../Statistics/components/Echartsseven/index'
import Echartseight from '../Statistics/components/Echartseight/index'

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
			  <Card title="指令下发趋势" bordered={false} className="head5-3" style={{ marginTop: 10 }}>
			  	<Echartsthree />
			  </Card>
			  <Card title="指令评价" bordered={false} className="head5-3" style={{ marginTop: 10 }}>
					<Echartsfour />
			  </Card>
			</div>
			  <Card title="指令执行进程" bordered={false} className="head5-4 layui-col-md9" style={{ marginTop: 10 }}>
			  	<Echartsfive />
			  </Card>
		  </div>
		  <div className="layui-row">
				<Card title="事件全局概览" bordered={false} className="head5-5 layui-col-md9" style={{ marginTop: 10 }}>
					<div className="top_text11">
						<div className="topText11">
							<p style={{ fontWight: "blod" }}>事件总数</p>
							<span>186</span>
						</div>
						<div className="topText11 color1">
							<p>完成事件</p>
							<span>50</span>
						</div>
						<div className="topText11 color3">
							<p>进行中事件</p>
							<span>120</span>
						</div>
						<div className="topText11 color4">
							<p>延误事件</p>
							<span>8</span>
						</div>
						<div className="topText11 color5">
							<p>紧急事件</p>
							<span>8</span>
						</div>
					</div>
					<Echartssix />
				</Card>
		  </div>
			<div className="layui-row">
				<Card title="指令全年对比" bordered={false} className="head5-6 layui-col-md9" style={{ marginTop: 10 }}>
					<Echartsone/>
				</Card>
				<Card title="全年评价增长" bordered={false} className="head5-7 layui-col-md9" style={{ marginTop: 10 }}>
					<Echartsseven />
				</Card>
			</div>
		  <div className="layui-row">
				<Card title="本月最佳部门" bordered={false} className="head5-8 layui-col-md3" style={{ marginTop: 10 }}>
					<Echartstwo/>
				</Card>
				<Card title="本月最佳警员" bordered={false} className="head5-8 layui-col-md4" style={{ marginTop: 10 }}>
					<Echartseight />
				</Card>
				<Card title="本月评价最高指令" bordered={false} className="head5-9 layui-col-md3" style={{ marginTop: 10 }}>
					<div className="top_text">
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州实施“双六战时策略”筑牢疫情防线</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>重要!苏州市疫情防控工作网络通气会答记者问</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>《苏州市重污染天气应急预案》出炉!</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州吴中试点建设“蓝盾”行动队应对户外险情</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>30分钟20次电话!公安从骗子手中“抢”回受害人</p>
							<span>2020-04-02</span>
						</Link>
						</div>
					</div>
				</Card>
		  </div>
		  
		</div>
		
        )
    }

}
