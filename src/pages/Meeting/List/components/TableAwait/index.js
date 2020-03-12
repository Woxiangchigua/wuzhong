import React, { Component, useEffect, useState } from 'react'
import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { Button } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'

const query = graphql`
    query TableAwait_ApplyAllMeetingListQuery(
            $order: String = ""
            $meetingName: String = ""
            $status: enumTypeMeetingStatus!
            $review: EnumTypeAuditMeetingType!
    ){
        adminPendingMeetingList(order: $order,first: 10,skip: 0,meetingName: $meetingName,status:$status,review:$review){
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
            number,
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
	
	useEffect(
	    () => {
			getList(searchKey)
			/* global layer */ 
	  
		table.on('tool(complainList)', function(obj) {
			let data = obj.data;
			if(obj.event==="go"){
			        history.push('/Meeting/Querymeeting/' + JSON.stringify({id:data.id,review:data.review}))
			    }else if(obj.event==="del"){
			    let delIndex = layer.confirm('真的删除id为' + data.id + "的信息吗?", function (delIndex) {
			        DeleteMeeting.commit(
			            props.environment,
			            data.id,
			            (response, errors) => {
			                if (errors) {
			                    console.log(errors)
			                    layer.msg(errors[0].message);
			                } else {
			                    console.log(response);
			                    layer.msg("删除成功");
			                    getList(searchKey)
			                }
			            },
			            (response, errors) => {
			                if (errors) {
			                    console.log(errors)
			                } else {
			                    console.log(response);
			                }
			            }
			        );
			        layer.close(delIndex);
			    });
			}
		});
	    }
	)
	
	function init (data) {
		/* global layer */
		table.render({
				elem: '#complainTable'
				,url:''
				,page: true
				// ,toolbar: '#complain_toolbar'
				,limit:10
				, data: data
				,cols: [
		  			[
						{checkbox:true}//开启多选框
					  ,{field:'id', width:100,title: 'ID',sort: true}
					//   ,{field:'batchNumber',width:180, title: '申请批号'}
					  ,{field:'meetingName',title: '会议名称'}
					  ,{field:'meetingRoom',width:200,title: '会议室',
						templet: function (d) {
						    return `<div>${d.meetingRoom.name}</div>`
						}
					  }
					  ,{field:'meetingTime', title: '开会时间',
						templet: function (d) {
						    return `<div>${dateFormat("YYYY-mm-dd", new Date(d.beginTime))} ${dateFormat("HH:MM", new Date(d.beginTime))}-${dateFormat("HH:MM", new Date(d.endTime))}</div>`
						}
					  }
					  ,{field:'status', width:250, title: '会议状态', align:'center', templet : function(d){
							if(d.review === 'MEETING_CHECK_PENDING_ADMIN' || d.review === 'MEETING_CHECK_PENDING_MANAGE' || d.review === 'MEETING_PASS'){
								return '<span style="display:inline-block;color: #fff;background:#e2151b;height:22px;line-height:22px;padding:0 5px;font-size: 12px;border-radius: 2px;">待开</span>';
							}
					  }}
					  ,{fixed: 'right', title:'操作', align:'center', toolbar: '#barDemo'}
		  			]
		  	   ]
		  ,limits: [5,10,20,50]
		});
	}
	
	function getList(searchKey) {
	    fetchQuery(props.environment, query, {
	        order: '',
	        meetingName: searchKey,
			status: 'MEETING_AWAIT',
			review: 'MEETING_PASS'
	    }).then(data => {
	        if (data) {
	            if (data.adminPendingMeetingList) {
	                let data2 = JSON.parse(JSON.stringify(data.adminPendingMeetingList.edges))
	                init(data2)
	            }
	        }
	    });
	}
	
	function open() {
	    var checkStatus = table.checkStatus('idTest');
	    console.log(checkStatus)
	    if (checkStatus.data.length === 0) {
	        let delIndex = layer.confirm(`请先选择要删除的数据`, function (delIndex) {
	            console.log(delIndex)
	            layer.close(delIndex);
	        });
	    } else {
	        let delIndex = layer.confirm(`确认删除选中的${checkStatus.data.length}条数据？`, function (delIndex) {
	            console.log(delIndex)
	            layer.close(delIndex);
	        });
	    }
	
	}
	
    return (
        <>
            <div>
				<div className="topBtn">
					<div>
						<button type="button" onClick={open} lay-event="delAll" className="layui-btn layui-btn-sm">删除</button>
					</div>
				</div>
                <table className="layui-hide" id="complainTable" lay-filter="complainList"></table>
            </div>
            
			<script type="text/html" id="barDemo">
			  <a className="layui-btn layui-btn-xs" lay-event="go"><i className="layui-icon">&#xe6b2;</i>详情</a>
			  <a className="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i className="layui-icon">&#xe640;</i>删除</a>
			</script>
        </>
    )
}
