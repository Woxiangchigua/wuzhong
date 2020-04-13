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
		 			  ,"username": "苏州网格化社会治理“吴江样本”小平安支撑社会大稳定"
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10002"
		 			  ,"username": "苏州木渎拟筹建社会治理指挥协调中心"
		 			  ,"originator": "王建国"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10003"
		 			  ,"username": "苏州市公安局警务科技助推改革平稳落地"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10004"
		 			  ,"username": "“归来即是回家” 入境来苏旅客护送侧记"
		 			  ,"originator": "吴刚"
		 			  ,"priority": "0"
		 			}, {
		 			  "id": "10005"
		 			  ,"username": "下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航"
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