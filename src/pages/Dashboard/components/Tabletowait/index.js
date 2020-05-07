import React, { Component, useEffect } from 'react'
import { Button } from 'antd';
import dateFormat from '../../../../ utils/dateFormat'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';

const query = graphql`
    query Tabletowait_MeetingListQuery(
            $order: String = ""
            $meetingName: String = ""
    ){
      myAwaitMeetingList(order: $order,first: 10,skip: 0,meetingName: $meetingName){
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

            var table = window.layui.table;
let searchKey = ""
    useEffect(
        () => {
            /* global layer */
            //询问框
            // console.log(window.layui)
			getList(searchKey)
            // return false
            //    window.layui.('table', function(){

            

//             table.on('tool(test)', function (obj) {
//                 console.log(obj)
//                 let data = obj.data;
//                 let delIndex = layer.confirm('真的删除id为' + data.id + "的信息吗?", function (delIndex) {
//                     console.log(delIndex)
//                     layer.close(delIndex);
//                 });
// 
//             })
        }


    )

function init (data) {
	//第一个实例
	table.render({
	    elem: '#demo'
	    , url: '' //数据接口
	    , data: data
	    , page: { count: 100 } //开启分页
	    , cols: [[ //表头
	        { field: 'id', title: 'ID', width: 100, sort: true, fixed: 'left' }
	        , { field: 'meetingName', title: '会议名称'}
	        , { field: 'meetingRoom', title: '会议室', width: 100 ,
				templet: function (d) {
					return `<div>${d.meetingRoom.name}</div>`
				}
			}
	        , { field: 'meetingTime', title: '开会时间', width: 200 ,
				templet: function (d) {
				  return `<div>${dateFormat("YYYY-mm-dd", new Date(d.beginTime))} ${dateFormat("HH:MM", new Date(d.beginTime))}-${dateFormat("HH:MM", new Date(d.endTime))}</div>`
				}
			}
	        , { field: 'status', title: '会议状态', width: 100 , align: "center" , templet : function(d){
					if(d.status == "MEETING_AWAIT"){
						return '<span style="color:#ffb800">待开</span>';
					}
			  }}
	    ]]
	});
}



function getList(searchKey) {
		fetchQuery(props.environment, query, {
			order: '',
			meetingName: searchKey
		}).then(data => {
			if (data) {
				if (data.myAwaitMeetingList) {
					let data2 = JSON.parse(JSON.stringify(data.myAwaitMeetingList.edges))
					init(data2)
				}
			}
		});
	}

    return (
        <>
            <div>
                <table id="demo" lay-filter="test"></table>
            </div>
            <script type="text/html" id="bar">
                <button type='button' className='layui-btn layui-btn-normal layui-btn-xs'>
                    <i className="layui-icon">&#xe6b2;</i>详情
                    </button>
                <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
                    <i className="layui-icon">&#xe640;</i>删除
                    </button>
            </script>
        </>
    )


}
