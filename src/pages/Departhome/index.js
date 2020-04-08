import React, { Component } from 'react'
import { Breadcrumb, Card, Rate } from 'antd';
import Meeting from '../../components/Meeting'
import './index.css';
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
			  <Card title="信息报送" bordered={false} className="head5-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>男孩自幼遭拐在苏州打工</p>
			  			<span>2020-01-06</span>
			  		</div>
			  	</div>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>家中遭遇了入室盗窃,珍藏的金条不见了,案值巨大</p>
			  			<span>2020-01-06</span>
			  		</div>
			  	</div>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>110吗?这边有人卖淫,你们赶紧来抓他</p>
			  			<span>2020-01-06</span>
			  		</div>
			  	</div>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>接到诡异报警电话 一个女声说"我们控制不住自己"</p>
			  			<span>2020-01-06</span>
			  		</div>
			  	</div>			
			  </Card>
			  <Tabstwo />
			  <Card title="警务知识" bordered={false} className="head6-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				 <div>
					 <div className="clear clear1">
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>公安基础知识</p>
							<span>2020-04-02</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>户政管理知识</p>
							<span>2020-03-30</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>治安案件查处知识</p>
							<span>2020-03-29</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>治安秩序管理知识</p>
							<span>2020-03-27</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>娱乐场所违规查处</p>
							<span>2020-04-02</span>
						</div>
					 </div>		
					 <div className="clear clear1">
						<i className="layui-icon read left_icon" style={{ marginRight: 10 }}>&#xe705;</i>
						<div className="right_text">
							<p>特种行业登记许可</p>
							<span>2020-03-02</span>
						</div>
					 </div>		
				  </div>
			  </Card>
		  </div>
		  <div className="layui-row">
			<Card title="指令概览" bordered={false} className="head2-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<Echartsone/>
			</Card>
			<Card title="新闻动态" bordered={false} className="head1 layui-col-md4" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
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
			<Card title="本月最佳" bordered={false} className="head5 head_last layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<Echartstwo/>
			</Card>
		  </div>
		  
		</div>
		
        )
    }

}
