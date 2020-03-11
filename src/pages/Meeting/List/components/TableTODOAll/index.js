import React, { Component, useEffect, useState } from 'react'
import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { Button } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'

const query = graphql`
    query TableTODOAll_ApplyAllMeetingListQuery(
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
			if(obj.event==="go2"){
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
				elem: '#complainTable2'
				,url:''
				,page: true
				,toolbar: '#complain_toolbar2'
				,limit:10
				, data: data
				,cols: [
		  			[
					  {field:'id', width:100,title: 'ID',sort: true}
					  ,{field:'batchNumber',width:180, title: '申请批号'}
					  ,{field:'meetingName',width:350, title: '会议名称'}
					  ,{field:'meetingRoom',width:200,title: '会议室'}
					  ,{field:'meetingTime',width:300, title: '开会时间'}
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
                <table className="layui-hide" id="complainTable2" lay-filter="complainList"></table>
            </div>
            
			<script type="text/html" id="barDemo2">
			  <a className="layui-btn layui-btn-xs" lay-event="go2">详情</a>
			</script>
        </>
    )
}
