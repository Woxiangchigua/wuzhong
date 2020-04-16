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
		 			  ,"username": '关于当前外出踏青注意事项的调查问卷'
		 			  ,"originator": "王建国"
						,'status': '0'
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10002"
		 			  ,"username": "关于春运期间网络购票的调查问卷"
		 			  ,"originator": "吴刚"
						,'status': '0'
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10003"
		 			  ,"username": '2019网民网络安全感满意度调查问卷'
		 			  ,"originator": "王建国"
						,'status': '0'
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10004"
		 			  ,"username": "关于清明祭扫安全隐患的调查问卷"
		 			  ,"originator": "吴刚"
						,'status': '1'
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10005"
		 			  ,"username": '关于防范电信诈骗的调查问卷'
		 			  ,"originator": "王建国"
						,'status': '1'
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10006"
		 			  ,"username": "关于确定苏州市区养犬重点管理区域的问卷调查"
		 			  ,"originator": "吴刚"
						,'status': '1'
		 			  ,"priority": "0"
		 			}]
		 		,page: true //开启分页
		 		,cols: [[ //表头
		 		   {checkbox: true}
		 		  ,{field: 'id', title: '新闻ID', width:180, sort: true}
		 		  ,{field: 'username', title: '新闻标题'}
		 		  ,{field: 'originator', title: '新闻发起人', width:250},
					,{field:'status', width:150, title: '归档状态', align:'center', templet : function(d){
												if(d.status === '0'){
													return '<span style="display:inline-block;color: #fff;background:#e2151b;height:22px;line-height:22px;padding:0 5px;font-size: 12px;border-radius: 2px;">进行中</span>';
												}else if(d.status === '1'){
													return '<span style="display:inline-block;color: #fff;background:#009688;height:22px;line-height:22px;padding:0 5px;font-size: 12px;border-radius: 2px;">已完结</span>';
												}
					}}
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
			      <Breadcrumb.Item>信息报送</Breadcrumb.Item>
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