import React, { Component } from 'react'
import { Breadcrumb, Card, Rate } from 'antd';
import Meeting from '../../components/Meeting'
import './index.css';
import { useHistory, Link } from "react-router-dom";
import Tabsone from '../Departhome/components/Tabsone/index'
import Tabstwo from '../Departhome/components/Tabstwo/index'
import Echartsone from '../Departhome/components/Echartsone/index'
import Echartstwo from '../Departhome/components/Echartstwo/index'


export default class Departhome extends Component {
    
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
			  <Tabsone />
			  <Card title="信息报送" bordered={false} className="head5-1 layui-col-md3" extra={<a href="../../../Insidepage/Information">...</a>} style={{ marginTop: 10 }}>
			  	<div className="clear">
			  	<Link to={"/Insidepage/Information"}>
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text1">
			  			<p>关于当前外出踏青注意事项的调查问卷</p>
			  			<span>进行中</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  		</Link>
			  	</div>
			  	<div className="clear">
			  	<Link to={"/Insidepage/Information"}>
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text1">
			  			<p>关于春运期间网络购票的调查问卷</p>
			  			<span>进行中</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  		</Link>
			  	</div>
			  	<div className="clear">
			  	<Link to={"/Insidepage/Information"}>
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text1">
			  			<p>2019网民网络安全感满意度调查问卷</p>
			  			<span>已结束</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  		</Link>
			  	</div>
			  	<div className="clear">
			  	<Link to={"/Insidepage/Information"}>
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text1">
			  			<p>关于清明祭扫安全隐患的调查问卷</p>
			  			<span>已结束</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  		</Link>
			  	</div>			
			  </Card>
			  <Tabstwo />
			  <Card title="警务知识" bordered={false} className="head6-1 layui-col-md3" extra={<a href="../../../Insidepage/Knowledge">...</a>} style={{ marginTop: 10 }}>
				 <div>
					 <div className="clear clear1">
					 <Link to={"/Insidepage/Knowledge"}>
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>警惕！疫情期间利用销售春季茶叶诈骗</p>
							<span>2020-04-02</span>
						</div>
					 </Link>
					 </div>
					 <div className="clear clear1">
					 <Link to={"/Insidepage/Knowledge"}>
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>请严格自律避免高空抛物引发悲剧</p>
							<span>2020-03-30</span>
						</div>
						</Link>
					 </div>
					 <div className="clear clear1">
					 <Link to={"/Insidepage/Knowledge"}>
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>警惕！抖音新型诈骗让你“发抖”！</p>
							<span>2020-03-29</span>
						</div>
						</Link>
					 </div>
					 <div className="clear clear1">
					 <Link to={"/Insidepage/Knowledge"}>
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>170余万元被骗，婚恋网站交友需警惕</p>
							<span>2020-03-27</span>
						</div>
						</Link>
					 </div>
					 <div className="clear clear1">
					 <Link to={"/Insidepage/Knowledge"}>
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>每周治安播报(20200327-20200403)</p>
							<span>2020-04-02</span>
						</div>
						</Link>
					 </div>		
					 <div className="clear clear1">
					 <Link to={"/Insidepage/Knowledge"}>
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>警惕！春季电瓶车充电容易引发火灾</p>
							<span>2020-03-02</span>
						</div>
						</Link>
					 </div>		
				  </div>
			  </Card>
		  </div>
		  <div className="layui-row">
			<Card title="指令概览" bordered={false} className="head2-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<Echartsone/>
			</Card>
			<Card title="新闻动态" bordered={false} className="head1 layui-col-md4" extra={<a href="../../../Insidepage/News">...</a>} style={{ marginTop: 10 }}>
				<div className="text1">
				<Link to={"/Insidepage/News"}>
					<h4>苏城码---你我的"通行证",苏城的"护身符"</h4>
					<p>有一份关于《苏州市公安局关于依法严厉打击新型冠状病毒感染的肺炎疫情防控期间违法犯罪活动的通告》的相关资料请相关与会人员认真阅读,与会积极探讨.</p>
					<span>2月25日 17:00</span>
				</Link>
				</div>
				<div className="text1">
				<Link to={"/Insidepage/News"}>
					<h4>战"疫"破案两手抓,吴中警方筑起平安墙</h4>
					<p>为了认真贯彻落实上级公安机关的相关会议精神,确保国庆期间辖区社会治安大局稳定,9月30日上午,召开专门会议,对国庆期间的安保维稳工作进行详细安排部署.</p>
					<span>9月30日 10:00</span>
				</Link>
				</div>
			</Card>
			<Card title="本月最佳" bordered={false} className="head5 head_last layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<Echartstwo/>
			</Card>
		  </div>
		  
		</div>
		
        )
    }

}
