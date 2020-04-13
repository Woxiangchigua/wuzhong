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
		 		elem: '#demo2'
		 		,height: 312
		 		,data: [{
		 			  "id": "10001"
		 			  ,"username": "苏州市公安局以问题解决确保主题教育实效"
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10002"
		 			  ,"username": "苏州市公安局苏州高新区分局招聘警务辅助人员简章"
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10003"
		 			  ,"username": "发布《通告》:250克以上无人机实名登记"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10004"
		 			  ,"username": "姑苏分局观前派出所:“科技+志愿者”及时消除隐患"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10005"
		 			  ,"username": "召开全市公安机关学习部署会"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}]
		 		,page: true //开启分页
		 		,cols: [[ //表头
		 		   {checkbox: true}
		 		  ,{field: 'id', title: '公文ID', width:180, sort: true}
		 		  ,{field: 'username', title: '公文名称'}
		 		  ,{field: 'originator', title: '公文发起人', width:250}
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
                <table id="demo2" className="layui-hide1" ></table>
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