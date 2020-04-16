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
		 			  ,"username": '警惕！疫情期间利用销售春季茶叶诈骗'
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10002"
		 			  ,"username": "请严格自律避免高空抛物引发悲剧"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10003"
		 			  ,"username": '警惕！抖音新型诈骗让你“发抖”！'
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10004"
		 			  ,"username": "170余万元被骗，婚恋网站交友需警惕"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10005"
		 			  ,"username": '每周治安播报（20200327-20200403）'
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10006"
		 			  ,"username": "警惕！春季电瓶车电瓶充电容易引发火灾"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}]
		 		,page: true //开启分页
		 		,cols: [[ //表头
		 		   {checkbox: true}
		 		  ,{field: 'id', title: '公文ID', width:180, sort: true}
		 		  ,{field: 'username', title: '公文标题'}
		 		  ,{field: 'originator', title: '公文发起人', width:250}
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
			      <Breadcrumb.Item>警务知识</Breadcrumb.Item>
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