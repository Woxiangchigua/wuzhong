import React, { Component } from 'react'
import { Breadcrumb, Card } from 'antd';
import Meeting from '../../components/Meeting'
import './index.css';
import Tabsone from '../Publicportal/components/Tabsone/index'
import Tabstwo from '../Publicportal/components/Tabstwo/index'


export default class Publicportal extends Component {
    
    render() {
        return (
		
		<div style={{ backgroundColor: '#f0f2f5' }}>
		  <Card bordered={false} >
		    <Breadcrumb>
		      <Breadcrumb.Item>警内公共门户</Breadcrumb.Item>
		      <Breadcrumb.Item>门户阅览</Breadcrumb.Item>
		    </Breadcrumb>
		  </Card>
		 
		  <div className="top1"></div>
		 
		  <div className="layui-row">
			  <Card title="新闻动态" bordered={false} className="head1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<div className="text1">
					<h4>苏城码---你我的"通行证",苏城的"护身符"</h4>
					<p>有一份关于《苏州市公安局关于依法严厉打击新型冠状病毒感染的肺炎疫情防控期间违法犯罪活动的通告》的相关资料请相关与会人员认真阅读,与会积极探讨.</p>
					<span>2月25日 17:00</span>
				</div>
				<div className="text1">
					<h4>战"疫"破案两手抓,吴中警方筑起平安墙</h4>
					<p>为了认真贯彻落实上级公安机关的相关会议精神,确保国庆期间辖区社会治安大局稳定,9月30日上午,召开专门会议,对国庆期间的安保维稳工作进行详细安排部署.</p>
					<span>9月30日 10:00</span>
				</div>
			  </Card>
			  <Card title="通知通告" bordered={false} className="head2 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<div className="clear">
					<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>2020-01-06</span>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
					<div className="right_text">
						<p>吴江区公安局招录警务辅警人员简章</p>
						<span>2020-03-10</span>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
					<div className="right_text">
						<p>关于增设道路交通技术监控系统的通告</p>
						<span>2020-03-09</span>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
					<div className="right_text">
						<p>关于增加非现场违法预约办理点的通告</p>
						<span>2020-03-02</span>
					</div>
				</div>
			  </Card>
			  <Tabsone />
			  <Card title="协作指数" bordered={false} className="head6 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<img src={require("../../img/img1.png")} alt=""/>
			  </Card>
			  
		  </div>
		  <div className="layui-row">
			<Tabstwo />
			<Card title="常用入口" bordered={false} className="head4 layui-col-md4" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<ul className="extra">
					<li><img src={require("../../img/icon1.png")} alt=""/><p className="title">资料下载</p></li>
					<li><a href="../Meeting/Applicant"><img src={require("../../img/icon2.png")} alt=""/><p className="title">会议记录</p></a></li>
					<li><img src={require("../../img/icon3.png")} alt=""/><p className="title">科信保障</p></li>
					<li><img src={require("../../img/icon4.png")} alt=""/><p className="title">人事管理</p></li>
					<li><img src={require("../../img/icon5.png")} alt=""/><p className="title">数据统计</p></li>
				</ul>	
				<ul className="extra">
					<li><img src={require("../../img/icon6.png")} alt=""/><p className="title">应用接口</p></li>
					<li><img src={require("../../img/icon7.png")} alt=""/><p className="title">日常管理</p></li>
					<li><img src={require("../../img/icon8.png")} alt=""/><p className="title">查询统计</p></li>
					<li><img src={require("../../img/icon9.png")} alt=""/><p className="title">通知确认</p></li>
					<li><a href="../Bulletin/List"><img src={require("../../img/icon10.png")} alt=""/><p className="title">公文管理</p></a></li>
				</ul>	
			</Card>
			<Card title="问卷调查" bordered={false} className="head5 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>2020-01-06</span>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>2020-01-06</span>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>2020-01-06</span>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>2020-01-06</span>
					</div>
				</div>			
			</Card>
		  </div>
		  
		</div>
		
        )
    }

}
