import React, { Component } from 'react'
import { Breadcrumb, Card, Rate } from 'antd';
import Meeting from '../../components/Meeting'
import './index.css';
import Tabsone from '../Leaderhome/components/Tabsone/index'
import Echartsone from '../Leaderhome/components/Echartsone/index'
import Echartstwo from '../Leaderhome/components/Echartstwo/index'


export default class Leaderhome extends Component {
    
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
			  
			  <Card title="事件总数" bordered={false} className="head5-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
			  	<div className="zongshu_list">
			  		<div className="zongshu clearfix">
			  			<p>政治处：</p><div className="line_grey"><i></i></div><span>73%</span>
			  		</div>
			  		<div className="zongshu clearfix">
			  			<p>政治处：</p><div className="line_grey line_grey2"><i></i></div><span>73%</span>
			  		</div>
			  		<div className="zongshu clearfix">
			  			<p>政治处：</p><div className="line_grey line_grey3"><i></i></div><span>63%</span>
			  		</div>
			  		<div className="zongshu clearfix">
			  			<p>政治处：</p><div className="line_grey line_grey4"><i></i></div><span>55%</span>
			  		</div>
			  		<div className="zongshu clearfix">
			  			<p>政治处：</p><div className="line_grey line_grey5"><i></i></div><span>68%</span>
			  		</div>
			  		<div className="zongshu clearfix">
			  			<p>政治处：</p><div className="line_grey line_grey6"><i></i></div><span>27%</span>
			  		</div>
			  		<div className="zongshu clearfix">
			  			<p>政治处：</p><div className="line_grey line_grey7"><i></i></div><span>80%</span>
			  		</div>
			  	</div>
			  	<div className="zongshu_bot">
			  		<p>总数：<span className="up">6560</span></p>
			  		<p>转换进度：<span className="up1">60%</span></p>
			  	</div>
			  </Card>
			  <Card title="重要信息" bordered={false} className="head6-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				 <div>
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
				  </div>
			  </Card>
			  <Tabsone />
			  <Card title="本月最佳" bordered={false} className="head5 head_last layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
			  	<Echartstwo/>
			  </Card>
		  </div>
		  <div className="layui-row">
			<Card title="指令概览" bordered={false} className="head3-1 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<div className="layui-row top11">
					<div className="layui-col-lg6 layui-col-md6 layui-col-sm6">
						<div className="left1">
							<p><i className="fa fa-bar-chart" aria-hidden="true"></i> 处理总数：</p>
							<h4><span>9000</span> 件</h4>
						</div>
					</div>
					<div className="layui-col-lg6 layui-col-md6 layui-col-sm6">
						<div className="left1">
							<p><i className="fa fa-bar-chart" aria-hidden="true"></i> 值守人数：</p>
							<h4><span>3377</span> 人</h4>
						</div>
					</div>
				</div>
				<div className="layui-row percents">
					<div className="layui-col-lg10 layui-col-md10 layui-col-sm10">
						<div className="percent">
							<span>50%</span>
							<span>进行中事件</span>
						</div>
						<div className="percentline"></div>
					</div>
					<div className="layui-col-lg2 layui-col-md2 layui-col-sm2">
						<a href="#" className="detail">详情</a>
					</div>
				</div>
				<div className="layui-row percents">
					<div className="layui-col-lg10 layui-col-md10 layui-col-sm10">
						<div className="percent">
							<span>63%</span>
							<span>进行中事件</span>
						</div>
						<div className="percentline2"></div>
					</div>
					<div className="layui-col-lg2 layui-col-md2 layui-col-sm2">
						<a href="#" className="detail">详情</a>
					</div>
				</div>
				<div className="layui-row percents">
					<div className="layui-col-lg10 layui-col-md10 layui-col-sm10">
						<div className="percent">
							<span>89%</span>
							<span>进行中事件</span>
						</div>
						<div className="percentline3"></div>
					</div>
					<div className="layui-col-lg2 layui-col-md2 layui-col-sm2">
						<a href="#" className="detail">详情</a>
					</div>
				</div>
				<div className="layui-row percents">
					<div className="layui-col-lg10 layui-col-md10 layui-col-sm10">
						<div className="percent">
							<span>30%</span>
							<span>进行中事件</span>
						</div>
						<div className="percentline4"></div>
					</div>
					<div className="layui-col-lg2 layui-col-md2 layui-col-sm2">
						<a href="#" className="detail">详情</a>
					</div>
				</div>
				<div className="layui-row percents">
					<div className="layui-col-lg10 layui-col-md10 layui-col-sm10">
						<div className="percent">
							<span>30%</span>
							<span>进行中事件</span>
						</div>
						<div className="percentline5"></div>
					</div>
					<div className="layui-col-lg2 layui-col-md2 layui-col-sm2">
						<a href="#" className="detail">详情</a>
					</div>
				</div>
			</Card>
			<Card title="全局概览" bordered={false} className="head3-1 layui-col-md4" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<div className="layui-row">
					<div className="layui-col-lg4 layui-col-md4 layui-col-sm4 num_list">
						<h3 className="blue1">6,560</h3>
						<p>事件总数</p>
					</div>
					<div className="layui-col-lg4 layui-col-md4 layui-col-sm4 num_list">
						<h3 className="green1">6,000</h3>
						<p>完成事件</p>
					</div>
					<div className="layui-col-lg4 layui-col-md4 layui-col-sm4 num_list">
						<h3 className="green1">500</h3>
						<p>进行中事件</p>
					</div>
				</div>
				<div className="layui-row">
					<div className="layui-col-lg4 layui-col-md4 layui-col-sm4 num_list">
						<h3 className="yellow1">500</h3>
						<p>未开始事件</p>
					</div>
					<div className="layui-col-lg4 layui-col-md4 layui-col-sm4 num_list">
						<h3 className="yellow1">8</h3>
						<p>延误事件</p>
					</div>
					<div className="layui-col-lg4 layui-col-md4 layui-col-sm4 num_list">
						<h3 className="red1">8</h3>
						<p>紧急事件</p>
					</div>
				</div>
			</Card>
			<Card title="完结对比" bordered={false} className="head5-2 layui-col-md3" extra={<a href="#">...</a>} style={{ marginTop: 10 }}>
				<Echartsone/>
			</Card>
		  </div>
		  
		</div>
		
        )
    }

}
