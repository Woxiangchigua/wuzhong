import React, { Component, useEffect, useState } from 'react'
// import Archive from '../../../Mutations/Archive'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";

const query = graphql`
  query Directorlist_InstructListQuery( 
    $order: String = ""
    $kind: enumTypeInstructionsKind
    $hostDepartment: String = ""
    $name: String = ""
    $source: String = ""
  ){
    queryDepInstructionsList(first:100000,skip:0,order:$order,hostDepartment:$hostDepartment,name:$name,source:$source,kind:$kind){
    totalCount
    edges{
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
          history.push('/Instruct/Queryinstruct/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="hui"){
          history.push('/Instruct/Depreplyins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="xia"){
          history.push('/Instruct/Distinstruct/' + JSON.stringify({id:data.id,listid:1}))
        }else if(obj.event==="qing"){
          history.push('/Instruct/Depaskins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="bo"){
          history.push('/Instruct/Deprejectedins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="child"){
          history.push('/Instruct/Policechild/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="shen"){
          history.push('/Instruct/Depaudit/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="pi"){
          history.push('/Instruct/Depbatch/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="shang"){
          history.push('/Instruct/Policechild/' + JSON.stringify({id:data.id}))
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
            // { field: 'id', title: 'id', width: 150, sort: true }, 
              { field: 'name', title: '指令名称', }
            , { field: 'classify', title: '指令类型', width: 130,
                templet: function (d) {
                  if (d.classify === 'INSTRUCTIONS_CASE') {
                    return "案件督导"
                  } else if(d.classify === 'INSTRUCTIONS_NOTICE') {
                    return "会议通知"
                  }else if(d.classify === 'INSTRUCTIONS_INFORM'){
                    return "通知通报"
                  }else if(d.classify === 'INSTRUCTIONS_EMPHASIS'){
                    return "重点人员下发"
                  }else if(d.classify === 'INSTRUCTIONS_OTHERS'){
                    return "其他"
                  }
                }
              }
            , { field: 'source', title: '指令来源', width: 130, }
            , { field: 'initiator', title: '发起人', align: "center", width: 130,
              templet: function (d) {
                if (d.initiator === "account-1") {
                    return "<span>王建国</span>"
                }
              }
            }
            , { field: 'status', title: '指令状态', align: "center", width: 200, sort: true,
              templet: function (d) {
                if (d.status === 'INSTRUCTIONS_DEPARTMENT_ISSUE') {
                  // return "<span class='layui-badge'>进行中</span>"
                  return "进行中"
                } else if(d.status === 'INSTRUCTIONS_SUBOFFICE_CHECK') {
                  // return "<span class='layui-badge'>待审核</span>"
                  return "待审核"
                }else if(d.status === 'INSTRUCTIONS_SUBOFFICE_REJECT_OK'){
                  // return "<span class='layui-badge layui-bg-green'>已终止</span>"
                  return "已终止"
                }else if(d.status === 'INSTRUCTIONS_DEPARTMENT_ASK_REPLY'){
                  // return "<span class='layui-badge layui-bg-green'>已批示</span>"
                  return "已批示"
                }else if(d.status === 'INSTRUCTIONS_SUBOFFICE_AFFIRM'){
                  // return "<span class='layui-badge layui-bg-green'>已完成</span>"
                  return "已完成"
                }else if(d.status === 'INSTRUCTIONS_SUBOFFICE_NOT_ISSUE'){
                  // return "<span class='layui-badge layui-bg-green'>未下发</span>"
                  return "未下发"
                }else if(d.status === 'INSTRUCTIONS_SUBOFFICE_ISSUE'){
                  // return "<span class='layui-badge layui-bg-green'>已下发</span>"
                  return "已下发"
                }else if(d.status === 'INSTRUCTIONS_DEPARTMENT_SUBMIT'){
                  // return "<span class='layui-badge layui-bg-green'>待确认</span>"
                  return "待确认"
                }else if(d.status === 'INSTRUCTIONS_SUBOFFICE_REJECT_NOT'){
                  // return "<span class='layui-badge layui-bg-green'>进行中</span>"
                  return " 进行中"
                }else if(d.status === 'INSTRUCTIONS_DEPARTMENT_ASK'){
                  // return "<span class='layui-badge layui-bg-green'>待批示</span>"
                  return "待批示"
                }
              }
            }
					  ,{field:'deadline', title: '截至时间', width: 150, align: "center", sort: true,
              templet: function (d) {
                  return `<div>${dateFormat("YYYY-mm-dd", new Date(d.deadline))}</div>`
              }
					  }
            , { field: '', title: "操作", align: "center", width: 300, toolbar: "#bar" }
        ]]
    });
  }

  function getList(searchKey1,searchKey2) {
    // init()
    fetchQuery(props.environment, query,{
      first: 10,
      skip: 0,
      order: 'deadline asc',
      hostDepartment: '办公室',
      name:searchKey1,
      source:searchKey2,
  }).then(data => {
    if (data) {
      if (data.queryDepInstructionsList) {
        let data2 = JSON.parse(JSON.stringify(data.queryDepInstructionsList.edges))
        init(data2)
      }
    }
  });
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
          {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_ISSUE"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="xia">下发</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_ISSUE"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="bo">驳回</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_ISSUE"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="qing">请示</button>
          {{#  } }}
          {{#  if(d.status !== "INSTRUCTIONS_SUBOFFICE_ISSUE"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="shang">上报</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONS_DEPARTMENT_ISSUE" || d.status === "INSTRUCTIONS_SUBOFFICE_REJECT_NOT"
          || d.status === "INSTRUCTIONS_DEPARTMENT_ASK" || d.status === "INSTRUCTIONS_SUBOFFICE_CHECK" || d.status === "INSTRUCTIONS_SUBOFFICE_CHECK" 
          || d.status === "INSTRUCTIONS_DEPARTMENT_SUBMIT" || d.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" || d.status === "INSTRUCTIONS_SUBOFFICE_REJECT_OK"
          || d.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" || d.status === "INSTRUCTIONS_SUBOFFICE_REJECT_NOT"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="child">下级指令</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_NOT_ISSUE" || d.status === "INSTRUCTIONS_SUBOFFICE_ISSUE" || d.status === "INSTRUCTIONS_DEPARTMENT_ISSUE"
              || d.status === "INSTRUCTIONS_DEPARTMENT_ASK" || d.status === "INSTRUCTIONS_SUBOFFICE_CHECK" || d.status === "INSTRUCTIONS_SUBOFFICE_CHECK" 
              || d.status === "INSTRUCTIONS_DEPARTMENT_SUBMIT" || d.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" || d.status === "INSTRUCTIONS_SUBOFFICE_REJECT_OK"
              || d.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" || d.status === "INSTRUCTIONS_SUBOFFICE_REJECT_NOT"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="go">详情</button>
          {{#  } }}
        `}
      </script>
    </>
  )
}
