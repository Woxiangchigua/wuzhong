import React, { Component, useEffect, useState } from 'react'
import { Button } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../ utils/dateFormat'

const query = graphql`
    query Tabletoday_ApplyAllMeetingListQuery(
            $order: String = ""
            $meetingName: String = ""
    ){
        propertyAwaitMeetingList(order: $order,first: 10,skip: 0,meetingName: $meetingName){
          edges{
            applyUserId,
            beginTime,
            configuration,
            createdAt,
            deletedAt,
            endTime,
            id,
            intro,
            meetingName,
            meetingRoom{
              id,
              name
            },
            organizer,
            review,
            reviewUserId,
            status,
            updatedAt
          }
        }
    }`

export default function Table(props) {
	const [meetingList, setmeetingList] = useState([]);
	let history = useHistory();
	var table = window.layui.table;
	let searchKey = ""
	
	
	
	function init (data) {
		/* global layer */
		table.render({
				elem: '#complainTable2'
				,url:''
				,page: true
				// ,toolbar: '#complain_toolbar2'
				,limit:10
				, data: data
				,cols: [
		  			[
						{checkbox:true}//开启多选框
					  ,{field:'id', width:100,title: 'ID',sort: true}
					  ,{field:'batchNumber',width:180, title: '申请批号'}
					  ,{field:'meetingName',title: '会议名称'}
					  ,{field:'meetingRoom',width:200,title: '会议室',
						templet: function (d) {
						    return `<div>${d.meetingRoom.name}</div>`
						}
					  }
					  ,{field:'meetingTime',title: '开会时间',
						templet: function (d) {
						    return `<div>${dateFormat("YYYY-mm-dd", new Date(d.beginTime))} ${dateFormat("HH:MM", new Date(d.beginTime))}-${dateFormat("HH:MM", new Date(d.endTime))}</div>`
						}
					  }
					  ,{field:'status', width:250, title: '会议状态', align:'center', templet : function(d){
							if(d.review === 'MEETING_CHECK_PENDING_ADMIN' || d.review === 'MEETING_CHECK_PENDING_MANAGE' || d.review === 'MEETING_PASS'){
								return '<span style="display:inline-block;color: #fff;background:#e2151b;height:22px;line-height:22px;padding:0 5px;font-size: 12px;border-radius: 2px;">待开</span>';
							}
					  }}
					  ,{fixed: 'right', title:'操作', align:'center', toolbar: '#barDemo2'}
		  			]
		  	   ]
		  ,limits: [5,10,20,50]
		});
	}
	
	function getList(searchKey) {
	    fetchQuery(props.environment, query, {
	        order: '',
	        meetingName: searchKey
			
	    }).then(data => {
	        if (data) {
	            if (data.propertyAwaitMeetingList) {
	                let data2 = JSON.parse(JSON.stringify(data.propertyAwaitMeetingList.edges))
	                init(data2)
	            }
	        }
	    });
	}
	
	
    return (
        <>
            <div>
				<table className="layui-table" id="complainTable2">
                   <thead>
                       <tr style={{ background : "#fff" }}>
                           <th style={{ background : "#f2f2f2" }}>呈报单位</th>
                           <th>治安大队</th>
                           <th style={{ background : "#f2f2f2" }}>会议类型</th>
                           <th><i className="layui-icon ayui-icon-ok-circle" style={{ color: "#5fb878" }}>&#x1005;</i> 普通会议</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr className="hoverno">
                           <td style={{ background : "#f2f2f2" }}>会议名称</td>
                           <td colSpan="3">收听收看治安大讲堂</td>
                       </tr>
                       <tr className="hoverno">
                           <td style={{ background : "#f2f2f2" }}>会议时间</td>
                           <td colSpan="3">2020年2月28日(周五) 10时00分-10时30分</td>
                       </tr>
                       <tr className="hoverno">
                           <td style={{ background : "#f2f2f2" }}>参会领导</td>
                           <td>范久宁</td>
                           <td style={{ background : "#f2f2f2" }}>参会人数</td>
                           <td>6</td>
                       </tr>
                       <tr className="hoverno">
                           <td style={{ background : "#f2f2f2" }}>主办单位</td>
                           <td>治安大队</td>
                           <td style={{ background : "#f2f2f2" }}>会议地点</td>
                           <td>1501会议室</td>
                       </tr>
					   <tr className="hoverno">
					       <td style={{ background : "#f2f2f2" }}>联系人</td>
					       <td>许明月</td>
					       <td style={{ background : "#f2f2f2" }}>办公电话</td>
					       <td>13402522119</td>
					   </tr>
                   </tbody>
           </table>
		   <div className="topBtn">
		       <div>
		           <button type="button" lay-event="go" className="layui-btn layui-btn-sm">详情</button>
		       </div>
		   </div>
            </div>
            
			<script type="text/html" id="barDemo">
			  <a className="layui-btn layui-btn-xs" lay-event="go"><i className="layui-icon">&#xe6b2;</i>详情</a>
			  <a className="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i className="layui-icon">&#xe640;</i>删除</a>
			</script>
        </>
    )
}
