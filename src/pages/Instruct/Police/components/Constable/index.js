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
  $name: String = ""
  $source: String = ""
){
  policeToDoList(first:100000,skip:0,order:$order,disposePeople:$disposePeople,name:$name,source:$source){
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
  var $ = window.$
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
            // { field: 'id', title: 'id', width: 200, sort: true },
              { field: 'name', title: '指令名称', 
                templet: function (d) {
                  return `<div>${d.instructions.name}</div>`
                }
              }
              , { field: 'classify', title: '指令类型', width: 130,
                  templet: function (d) {
                    if (d.instructions.classify === 'INSTRUCTIONS_CASE') {
                      return "案件督导"
                    } else if(d.instructions.classify === 'INSTRUCTIONS_NOTICE') {
                      return "会议通知"
                    }else if(d.instructions.classify === 'INSTRUCTIONS_INFORM'){
                      return "通知通报"
                    }else if(d.instructions.classify === 'INSTRUCTIONS_EMPHASIS'){
                      return "重点人员下发"
                    }else if(d.instructions.classify === 'INSTRUCTIONS_OTHERS'){
                      return "其他"
                    }
                  }
                }
            , { field: 'source', title: '指令来源', width: 130,
                templet: function (d) {
                  return `<div>${d.instructions.source}</div>`
                }
              }
            , { field: 'sponsorUserId', title: '发起人', align: "center", width: 130,
                templet: function (d) {
                  if (d.instructions.initiator === "account-1") {
                      return "<span>王建国</span>"
                  }
                }
              }
            , { field: 'status', title: '指令状态', align: "center", width: 200, sort: true,
                templet: function (d) {
                  if (d.status === 'INSTRUCTIONSTODO_REJECT_NOT') {
                    // return "<span class='layui-badge'>进行中</span>"
                    return "进行中"
                  }else if(d.status === 'INSTRUCTIONSTODO_SUBMIT') {
                    // return "<span class='layui-badge'>已完成</span>"
                    return "已完成"
                  }else if(d.status === 'INSTRUCTIONSTODO_YES'){
                    // return "<span class='layui-badge layui-bg-green'>进行中</span>"
                    return "进行中"
                  }else if(d.status === 'INSTRUCTIONSTODO_ASK'){
                    // return "<span class='layui-badge layui-bg-green'>已请示</span>"
                    return "已请示"
                  }else if(d.status === 'INSTRUCTIONSTODO_REPLY') {
                    // return "<span class='layui-badge'>已批示</span>"
                    return "已批示"
                  }else if(d.status === 'INSTRUCTIONSTODO_REJECT'){
                    // return "<span class='layui-badge layui-bg-green'>待处理</span>"
                    return "待处理"
                  }else if(d.status === 'INSTRUCTIONSTODO_REJECT_OK'){
                    // return "<span class='layui-badge layui-bg-green'>已终止</span>"
                    return "已终止"
                  }
                }
              }
              ,{field:'deadline', title: '截至时间', width: 150, align: "center", sort: true,
                templet: function (d) {
                    return `<div>${dateFormat("YYYY-mm-dd", new Date(d.deadline))}</div>`
                }
              }
            , { field: '', title: "操作", align: "center", width: 220, toolbar: "#bar" }
        ]]
    });
  }

  function getList(searchKey1,searchKey2) {
    // init()
  // setInterval(function(){
    fetchQuery(props.environment, query, {
        first: 10,
        skip: 0,
        order: 'deadline asc',
        disposePeople: '普通用户',
        name:searchKey1,
        source:searchKey2,
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
          // layer.msg("你有新的指令");
        }
      }
    });
    // }, 1000);
  }

  function search() {
    const searchKey1 = "%" + $('#tablename').val() + "%";
    const searchKey2 = "%" + $('#tablesource').val() + "%";;
    getList(searchKey1,searchKey2)
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
        <div>
          <div className="layui-inline">
            <input className="layui-input" id="tablename" placeholder="请输入名称" />
          </div>
          <div className="layui-inline">
            <input className="layui-input" id="tablesource" placeholder="请输入来源"/>
          </div>
          <button className="layui-btn" data-type="reload" onClick={search}>搜索</button>
        </div>
        <table id="demo" lay-filter="test"></table>
      </div>
      <script type="text/html" id="bar">
        {`
          {{#  if(d.status === "INSTRUCTIONSTODO_YES"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="bo">驳回</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONSTODO_YES"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="qing">请示</button>
          {{#  } }}
          {{#  if(d.status !== "INSTRUCTIONSTODO_SUBMIT" ){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="hui">回复</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONSTODO_YES" || d.status === "INSTRUCTIONSTODO_ASK" || d.status === "INSTRUCTIONSTODO_REPLY"
              || d.status === "INSTRUCTIONSTODO_REJECT" || d.status === "INSTRUCTIONSTODO_REJECT_OK" || d.status === "INSTRUCTIONSTODO_REJECT_NOT" 
              || d.status === "INSTRUCTIONSTODO_SUBMIT" ){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="go">详情</button>
          {{#  } }}
        `}
      </script>
    </>
  )
}
