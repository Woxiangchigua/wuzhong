import React, { Component, useEffect, useState } from 'react'
// import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import './index.css';
import { Button, Breadcrumb, Card, Table, Tabs, Divider, Input } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'

 function Table1(props) {
	 
	 useEffect(
	     () => {
		  window.layui.use('table', function(){
		 		var table = window.layui.table;
		   
		  //第一个实例
		  table.render({
		 		elem: '#demo1'
		 		,height: 312
		 		,data: [{
		 			  "id": "10001"
		 			  ,"username": '苏州市文化广电和旅游局2020年工作要点'
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10002"
		 			  ,"username": "苏州市政府网站2020年第一季度常态化监测情况"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10003"
		 			  ,"username": '2020年政府工作报告'
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10004"
		 			  ,"username": "关于苏州市2019年预算执行情况和2020年预算草案的报告"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10005"
		 			  ,"username": '常熟市2020年政府工作报告'
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10006"
		 			  ,"username": "苏州市财政局2019年工作总结和2020年工作打算"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}]
		 		,page: true //开启分页
		 		,cols: [[ //表头
		 		   {checkbox: true}
		 		  ,{field: 'id', title: '信息ID', width:180, sort: true}
		 		  ,{field: 'username', title: '信息标题'}
		 		  ,{field: 'originator', title: '信息发起人', width:250}
		 		  ,{field: 'priority', title: '优先级', width:180, sort: true} 
		 		  ,{field: '', title: "操作", align: "center", width: 160, toolbar: "#bar"}
		 		]]
		  });
	
    
	});
	}
	)
    return (
			<div style={{ backgroundColor: '#f0f2f5' }}>
			  <Card title="" bordered={false} >
			    <Breadcrumb style={{ margin: '0px 0px 0px 0px' }}>
			      <Breadcrumb.Item>公文管理</Breadcrumb.Item>
			      <Breadcrumb.Item>重要信息</Breadcrumb.Item>
			    </Breadcrumb>
			  </Card>
			  {/* <Divider /> */}
			
			  <Card title="" bordered={false} style={{marginTop:10}}>
			    <div>
			        <table id="demo1" className="layui-hide1" ></table>
			    </div>
			    <script type="text/html" id="bar">
			        <button type='button' lay-event="go" className='layui-btn layui-btn-normal layui-btn-xs'>
			            <i className="layui-icon">&#xe6b2;</i>详情
			        </button>
			    </script>
			  </Card>
			</div>
    )

}
export default Table1;