import React, { Component, useEffect } from 'react'
import { Button } from 'antd';


export default function Table(props) {

    useEffect(
        () => {
            /* global layer */
            //询问框
            console.log(window.layui)
            // return false
            //    window.layui.('table', function(){
            var table = window.layui.table;

            //第一个实例
            table.render({
                elem: '#demo'
                , url: '' //数据接口
                , data: [
                    {
                        "id": 10002,
                        "meetingName": "user-2",
                        "meetingRoom": "1502",
                        "meetingTime": "2020.02.29 10:00-10:30",
                        "status": 0
                    },
					{
					    "id": 10002,
					    "meetingName": "user-2",
					    "meetingRoom": "1502",
					    "meetingTime": "2020.02.29 10:00-10:30",
					    "status": 0
					},
					{
					    "id": 10002,
					    "meetingName": "user-2",
					    "meetingRoom": "1502",
					    "meetingTime": "2020.02.29 10:00-10:30",
					    "status": 1
					},
					{
					    "id": 10002,
					    "meetingName": "user-2",
					    "meetingRoom": "1502",
					    "meetingTime": "2020.02.29 10:00-10:30",
					    "status": 1
					},
					{
					    "id": 10002,
					    "meetingName": "user-2",
					    "meetingRoom": "1502",
					    "meetingTime": "2020.02.29 10:00-10:30",
					    "status": 1
					},
                ]
                , page: { count: 100 } //开启分页
                , cols: [[ //表头
                    { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' }
                    , { field: 'meetingName', title: '会议名称', width: 240 }
                    , { field: 'meetingRoom', title: '会议室', width: 100 }
                    , { field: 'meetingTime', title: '开会时间', width: 200 }
                    , { field: 'status', title: '会议状态', width: 100 , templet : function(d){
							if(d.status == 0){
								return '<span style="color:#ffb800">进行中</span>';
							}else if(d.status == 1){
								return '<span style="color:#ff5722">未完成</span>';
							}
					  }}
                ]]
            });

            table.on('tool(test)', function (obj) {
                console.log(obj)
                let data = obj.data;
                let delIndex = layer.confirm('真的删除id为' + data.id + "的信息吗?", function (delIndex) {
                    console.log(delIndex)
                    layer.close(delIndex);
                });

            })
        }


    )







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
