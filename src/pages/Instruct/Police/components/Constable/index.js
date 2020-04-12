import React, { Component, useEffect, useState } from 'react'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";

const query = graphql`
query Constable_InstructListQuery( 
  $order: String = ""
  $disposePeople: String
){
  policeToDoList(first:10,skip:0,order:$order,disposePeople:$disposePeople){
    edges{
      deadline
      id
      instructions{
        annex{
          name
          url
        }
        classify
        deadline
        hostDepartment
        id
        initiator
        isNeedReceipt
        jointlyDepartment
        kind
        name
        priority
        receiptAnnex{
          name
          url
        }
        receiptReply
        receiptReply
        require
        source
        sourceTime
        startDepartment
        startTime
        status
      }
      receiptAnnex{
        name
        url
      }
      receiptReply
      require
      startTime
      status
    }
    totalCount
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
      table.on('tool(test)', function (obj) {
        console.log(obj)
        let data = obj.data;
        if(obj.event==="go"){
            history.push('/Instruct/Querypolice/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="qing"){
            history.push('/Instruct/Policeaskins/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="hui"){
          history.push('/Instruct/Policereplyins/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="bo"){
          history.push('/Instruct/Policerejectins/' + JSON.stringify({id:data.id,review:data.review}))
        }
      })
    }
  )
  
  function init(data) {
    console.log(data)
    /* global layer */
    //第一个实例
    table.render({
        id: 'idTest',
        elem: '#demo',
        // url: '', //数据接口
        data: data
        , page: { count: 100 } //开启分页
        , cols: [[ //表头 
            // { checkbox: true }
            // , 
            { field: 'id', title: 'id', width: 200, sort: true }
            , { field: 'name', title: '指令名称', 
                templet: function (d) {
                  return `<div>${d.instructions.name}</div>`
                }
              }
            , { field: 'source', title: '指令来源', width: 300,
                templet: function (d) {
                  return `<div>${d.instructions.source}</div>`
                }
              }
            , { field: 'sponsorUserId', title: '指令发起人', align: "center", width: 150,
                templet: function (d) {
                  if (d.instructions.initiator === 1) {
                      return "<span>王建国</span>"
                  }
                }
              }
            , { field: 'status', title: '指令状态', align: "center", width: 200, sort: true,
                templet: function (d) {
                  if (d.status === 'INSTRUCTIONSTODO_NOT') {
                    // return "<span class='layui-badge'>警员已处理</span>"
                    return "未完成"
                  } else if(d.status === 'INSTRUCTIONSTODO_YES') {
                    // return "<span class='layui-badge'>部门请示</span>"
                    return "已完成"
                  }else if(d.status === 'INSTRUCTIONSTODO_ASK'){
                    // return "<span class='layui-badge layui-bg-green'>警员请示</span>"
                    return "警员请示"
                  }else if(d.status === 'INSTRUCTIONSTODO_REJECT'){
                    // return "<span class='layui-badge layui-bg-green'>部门驳回</span>"
                    return "警员驳回"
                  }
                }
              }
            , {field:'sourceTime', title: '来源时间',
                templet: function (d) {
                    return `<div>${dateFormat("YYYY-mm-dd", new Date(d.instructions.sourceTime))}</div>`
                }
              }
            , { field: '', title: "操作", align: "center", width: 300, toolbar: "#bar" }
        ]]
    });
  }

  function getList(searchKey) {
    // init()
  setInterval(function(){
    fetchQuery(props.environment, query, {
        first: 10,
        skip: 0,
        order: '',
        disposePeople: '普通用户',
    }).then(data => {
      if (data) {
        if (data.policeToDoList) {
          let data2 = JSON.parse(JSON.stringify(data.policeToDoList.edges))
          init(data2)
          // layer.alert('您有新的指令',{title:'新的指令',icon: 1} ,function(index){
          //   layer.close( 
          //     index,
          //     clearInterval()
          //   );
          // });
          layer.msg("你有新的指令");
        }
      }
    });
    }, 1000);
  }

  function search() {
    getList(searchKey)
  }
  return (
    <>
      <div>
        <div className={'divclear'}></div>
        {/* <div className="topBtn">
          <div>
            <button type="button" onClick={open} lay-event="delAll" className="layui-btn layui-btn-sm" style={{float:"left"}}>公文归档</button>
          </div>
        </div>
        <div style={{clear:"both"}}></div> */}
        <table id="demo" lay-filter="test"></table>
      </div>
      <script type="text/html" id="bar">
        <button type='button' lay-event="go" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe6b2;</i>详情
        </button>
        <button type='button' lay-event="qing" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe6b2;</i>请示
        </button>
        <button type='button' lay-event="hui" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe6b2;</i>回复
        </button>
        <button type='button' lay-event="bo" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe6b2;</i>驳回
        </button>
      </script>
    </>
  )
}
