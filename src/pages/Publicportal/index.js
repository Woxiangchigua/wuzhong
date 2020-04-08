import React, { Component } from 'react'
import { Breadcrumb, Card, Rate } from 'antd';
import Meeting from '../../components/Meeting'
import './index.css';
import Tabsone from '../Publicportal/components/Tabsone/index'
import Tabstwo from '../Publicportal/components/Tabstwo/index'
import Tabsthree from '../Publicportal/components/Tabsthree/index'


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
			  <Tabsone />
			  <Card title="信息报送" bordered={false} className="head5 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>关于苏州市公安局网站域名变更的通知</p>
						<span>进行中</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  	</div>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>关于苏州市公安局网站域名变更的通知</p>
						<span>进行中</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  	</div>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>关于苏州市公安局网站域名变更的通知</p>
						<span>已结束</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  	</div>
			  	<div className="clear">
			  		<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
			  		<div className="right_text">
			  			<p>关于苏州市公安局网站域名变更的通知</p>
						<span>已结束</span>
			  			<span className="text-right">2020-01-06</span>
			  		</div>
			  	</div>			
			  </Card>
			  <Card title="公众信箱" bordered={false} className="head6 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				 <div>
					 <div className="clear clear1">
						<span className="colorBtn red">投诉</span>
						<div className="right_text">
							<p>向相城区望亭镇派出所报案,警察...</p>
							<span>2020-04-02</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<span className="colorBtn red">投诉</span>
						<div className="right_text">
							<p>微信群诱导炒币被骗</p>
							<span>2020-03-30</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<span className="colorBtn blue">建议</span>
						<div className="right_text">
							<p>建议增加车道导向</p>
							<span>2020-03-29</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<span className="colorBtn blue">建议</span>
						<div className="right_text">
							<p>临近住宅烽火路</p>
							<span>2020-03-27</span>
						</div>
					 </div>
					 <div className="clear clear1">
						<span className="colorBtn green">咨询</span>
						<div className="right_text">
							<p>身份证挂失</p>
							<span>2020-04-02</span>
						</div>
					 </div>		
					 <div className="clear clear1">
						<span className="colorBtn green">咨询</span>
						<div className="right_text">
							<p>大学生毕业户口迁出</p>
							<span>2020-03-02</span>
						</div>
					 </div>		
				  </div>
			  </Card>
			  <Card title="反馈意见" bordered={false} className="head6 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<form class="layui-form" action="">
				  <div class="layui-form-item layui-form-text">
					<div class="layui-input-block">
					  <textarea name="desc" placeholder="请输入需要反馈的指令意见..." class="layui-textarea"></textarea>
					</div>
				  </div>
				  <div class="layui-form-item">
					<div class="layui-input-block">
					  <button class="layui-btn submit" lay-submit lay-filter="formDemo">立即提交</button>
					  <button type="reset" class="layui-btn layui-btn-primary">重置</button>
					</div>
				  </div>
				</form>
			  </Card>
		  </div>
		  <div className="layui-row">
			<Tabstwo />
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
			<Tabsthree/>
			<Card title="指令评价" bordered={false} className="head5 head_last layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>评分: <Rate allowHalf defaultValue={5} /></span>
						<a href="#" className="text-right btn_more">详情</a>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>评分: <Rate allowHalf defaultValue={4.5} /></span>
						<a href="#" className="text-right btn_more">详情</a>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>评分: <Rate allowHalf defaultValue={3.5} /></span>
						<a href="#" className="text-right btn_more">详情</a>
					</div>
				</div>
				<div className="clear">
					<i className="layui-icon form left_icon" style={{ marginRight: 10 }}>&#xe63c;</i>
					<div className="right_text">
						<p>关于苏州市公安局网站域名变更的通知</p>
						<span>评分: <Rate allowHalf defaultValue={1} /></span>
						<a href="#" className="text-right btn_more">详情</a>
					</div>
				</div>			
			</Card>
		  </div>
		  
		</div>
		
        )
    }

}
