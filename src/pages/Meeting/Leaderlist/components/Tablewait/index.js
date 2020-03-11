import React, { Component, useEffect } from 'react'
import { Button } from 'antd';


export default function Table(props) {
let table = window.layui.table,
layer = window.layui.layer,
	  form = window.layui.form,
	  laypage = window.layui.laypage;
    useEffect(
        () => {
            
	  
	  
	  
	  table.render({
		elem: '#complainTable3'
		,url:''
		,page: true
		,toolbar: '#complain_toolbar3'
		,limit:10
		, data: [
		    {
		        "id": 101,
		        "batchNumber": "2020022901",
		        "meetingName": "抓紧抓实抓细疫情防控全力护航经济社会发展",
		        "meetingRoom": "1502",
		        "time": "2020-02-29 10:00-10:30",
		        "complainState": 0,
		        "right": 77
		    },
		    {
		        "id": 102,
		        "batchNumber": "2020022101",
		        "meetingName": "警报部门坚决打赢疫情防控保卫战",
		        "meetingRoom": "1501",
		        "time": "2020-02-21 10:00-10:30",
		        "complainState": 1,
		        "right": 77
		    },
		]
		,cols: [
    			[
    			   {checkbox:true}//开启多选框
			      ,{field:'id', width:100,title: 'ID',sort: true}
			      ,{field:'batchNumber',width:180, title: '申请批号'}
			      ,{field:'meetingName',width:350, title: '会议名称'}
			      ,{field:'meetingRoom',width:200,title: '会议室'}
			      ,{field:'time',width:300, title: '开会时间'}
			      ,{field:'complainState', width:250, title: '会议状态', align:'center', templet : function(d){
						if(d.complainState == 0){
							return '<span style="display:inline-block;color: #fff;background:#e2151b;height:22px;line-height:22px;padding:0 12px;font-size: 12px;border-radius: 2px;">待审</span>&nbsp&nbsp<span style="display:inline-block;color: #fff;background:#009688;height:22px;line-height:22px;padding:0 12px;font-size: 12px;border-radius: 2px;">待开</span>';
						}else if(d.complainState == 1){
							return '<span style="display:inline-block;color: #666666;border:1px solid #c9c9c9;height:22px;line-height:22px;padding:0 12px;font-size: 12px;border-radius: 2px;">已审</span>&nbsp&nbsp<span style="display:inline-block;color: #fff;background:#009688;height:22px;line-height:22px;padding:0 12px;font-size: 12px;border-radius: 2px;">待开</span>';
						}else if(d.complainState == 2){
							return '<span style="display:inline-block;color: #666666;border:1px solid #c9c9c9;height:22px;line-height:22px;padding:0 12px;font-size: 12px;border-radius: 2px;">已审</span>&nbsp&nbsp<span style="display:inline-block;color: #666666;border:1px solid #c9c9c9;height:22px;line-height:22px;padding:0 12px;font-size: 12px;border-radius: 2px;">已开</span>';
						}
			      }}
			      ,{fixed: 'right', title:'操作', align:'center', toolbar: '#barDemo3'}
    			]
    	   ]
    ,limits: [5,10,20,50]
  });


table.on('tool(complainList)', function(obj) {
	let data = obj.data;
	
	switch(obj.event) {
		case 'detail':
			console.log("会议室详情");
			let index = layer.open({
				type: 2,
				title: "会议室详情页面",
				area: ['30%', '60%'],
				fix: false,
				maxmin: true,
				shadeClose: true,
				shade: 0.4,
				skin: 'layui-layer-rim',
				content: ["/medicaladmin/complain/complainRead", "no"],
			});
			break;
		case 'del':
			let delIndex = layer.confirm('真的删除id为' + data.id + "的信息吗?", function(delIndex) {
				
				layer.close(delIndex);
			});
			break;
	}
});
  

        }


    )

    return (
        <>
            <div>
                <table className="layui-hide" id="complainTable3" lay-filter="complainList"></table>
            </div>
            <script type="text/html" id="complain_toolbar3">
				<div className="layui-btn-container">
					<button className="layui-btn layui-btn-danger layui-btn-sm" lay-event="delBatchAll"><i className="layui-icon"></i>批量删除</button>
				</div>
			</script>
			<script type="text/html" id="barDemo3">
			  <a className="layui-btn layui-btn-xs" lay-event="detail"><i className="layui-icon">&#xe6b2;</i>详情</a>
			  <a className="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i className="layui-icon">&#xe640;</i>删除</a>
			</script>
        </>
    )


}
