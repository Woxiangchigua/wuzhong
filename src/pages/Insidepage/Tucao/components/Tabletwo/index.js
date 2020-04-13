import React, { Component, useEffect, useState } from 'react'
// import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { Button } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'

 function Table(props) {
	 
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
		 			  ,"username": "关于新学期疫情防控工作若干问题的温馨提示"
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10002"
		 			  ,"username": "关于苏州图书馆闭馆期间的常见问题解答"
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10003"
		 			  ,"username": "自动放弃社保声明能否构成不予认定工伤的理由？"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10004"
		 			  ,"username": "基本生活暂时出现严重困难什么意思？"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10005"
		 			  ,"username": "如何确保为中小学教师减负政策举措落地见效？"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10006"
		 			  ,"username": "非苏州市户籍人员申请临时救助对社保是否有要求？"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}]
		 		,page: true //开启分页
		 		,cols: [[ //表头
		 		   {checkbox: true}
		 		  ,{field: 'id', title: '通知ID', width:180, sort: true}
		 		  ,{field: 'username', title: '通知名称'}
		 		  ,{field: 'originator', title: '通知发起人', width:250}
		 		  ,{field: 'priority', title: '优先级', width:180, sort: true} 
		 		  ,{field: '', title: "操作", align: "center", width: 160, toolbar: "#bar"}
		 		]]
		  });
	
    
	});
	}
	)
    return (
        <>
            <div>
                <table id="demo1" className="layui-hide1" ></table>
            </div>
            <script type="text/html" id="bar">
                <button type='button' lay-event="go" className='layui-btn layui-btn-normal layui-btn-xs'>
                    <i className="layui-icon">&#xe6b2;</i>详情
                </button>
            </script>
        </>
    )

}
export default Table;