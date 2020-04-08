import React, { Component, useEffect, useState } from 'react'
// import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { Button } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'

 function Table(props) {
     window.layui.use('table', function(){
     var table = window.layui.table;
  
	  //第一个实例
	  table.render({
		elem: '#demo'
		,height: 312
		,data: [{
			  "id": "10001"
			  ,"username": "杜甫"
			  ,"originator": "王建国"
			  ,"priority": "0"
			}, {
			  "id": "10001"
			  ,"username": "杜甫"
			  ,"originator": "王建国"
			  ,"priority": "0"
			}]
		,page: true //开启分页
		,cols: [[ //表头
		   {checkbox: true}
		  ,{field: 'id', title: '通知ID', width:80, sort: true, fixed: 'left'}
		  ,{field: 'username', title: '通知名称', width:80}
		  ,{field: 'originator', title: '通知发起人', width:80}
		  ,{field: 'priority', title: '优先级', width:80, sort: true} 
		  ,{field: '', title: "操作", align: "center", width: 160, toolbar: "#bar"}
		]]
	  });
	  
	});
    return (
        <>
            <div>
                <table id="demo" className="layui-hide"></table>
            </div>
            <script type="text/html" id="bar">
                <button type='button' lay-event="go" className='layui-btn layui-btn-normal layui-btn-xs'>
                    <i className="layui-icon">&#xe6b2;</i>详情
                </button>
                <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
                    <i className="layui-icon">&#xe640;</i>删除
                </button>
            </script>
        </>
    )

}
export default Table;