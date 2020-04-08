import React, { Component, useEffect, useState } from 'react'
// import Archive from '../../../Mutations/Archive'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";

const query = graphql`
  query Asslist_InstructListQuery( 
    $order: String = ""
    $departmentName: String = ""
  ){
    queryJointlyList(first:10,skip:0,order:$order,departmentName:$departmentName){
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
          history.push('/Instruct/Distinstruct/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="qing"){
          history.push('/Instruct/Depaskins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="bo"){
          history.push('/Instruct/Deprejectedins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="child"){
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
            { field: 'id', title: 'id', width: 150, sort: true }
            , { field: 'name', title: '指令名称', }
            , { field: 'source', title: '指令来源', width: 150, }
            , { field: 'initiator', title: '指令发起人', align: "center", width: 150,
              templet: function (d) {
                if (d.initiator === 1) {
                    return "<span>王建国</span>"
                }
              }
            }
            , { field: 'status', title: '指令状态', align: "center", width: 200, sort: true,
              templet: function (d) {
                if (d.status === 'INSTRUCTIONS_POLICE_DISPOSE') {
                  // return "<span class='layui-badge'>警员已处理</span>"
                  return "警员已处理"
                } else if(d.status === 'INSTRUCTIONS_DEPARTMENT_ASK') {
                  // return "<span class='layui-badge'>部门请示</span>"
                  return "部门请示"
                }else if(d.status === 'INSTRUCTIONS_POLICE_ASK'){
                  // return "<span class='layui-badge layui-bg-green'>警员请示</span>"
                  return "警员请示"
                }else if(d.status === 'INSTRUCTIONS_DEPARTMENT_REJECT'){
                  // return "<span class='layui-badge layui-bg-green'>部门驳回</span>"
                  return "部门驳回"
                }else if(d.status === 'INSTRUCTIONS_POLICE_REJECT'){
                  // return "<span class='layui-badge layui-bg-green'>警员驳回</span>"
                  return "警员驳回"
                }else if(d.status === 'INSTRUCTIONS_SUBOFFICE_NOT_ISSUE'){
                  // return "<span class='layui-badge layui-bg-green'>分局未下发</span>"
                  return "分局未下发"
                }else if(d.status === 'INSTRUCTIONS_SUBOFFICE_ISSUE'){
                  // return "<span class='layui-badge layui-bg-green'>分局已批示</span>"
                  return "分局已批示"
                }else if(d.status === 'INSTRUCTIONS_DEPARTMENT_ISSUE'){
                  // return "<span class='layui-badge layui-bg-green'>部门、派出所已批示</span>"
                  return "部门、派出所已批示"
                }
              }
            }
					  ,{field:'sourceTime', title: '来源时间',
              templet: function (d) {
                  return `<div>${dateFormat("YYYY-mm-dd", new Date(d.sourceTime))}</div>`
              }
					  }
            , { field: '', title: "操作", align: "center", width: 420, toolbar: "#bar" }
        ]]
    });
  }

  function getList(searchKey) {
    // init()
    fetchQuery(props.environment, query,{
      first: 10,
      skip: 0,
      order: '',
      departmentName: '办公室',
  }).then(data => {
    if (data) {
      if (data.queryJointlyList) {
        let data2 = JSON.parse(JSON.stringify(data.queryJointlyList.edges))
        init(data2)
      }
    }
  });
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
          <i className="layui-icon">&#xe60a;</i>详情
        </button>
        <button type='button' lay-event="xia" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>下发
        </button>
        <button type='button' lay-event="hui" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>回复
        </button>
        <button type='button' lay-event="qing" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>请示
        </button>
        <button type='button' lay-event="bo" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>驳回
        </button>
        <button type='button' lay-event="child" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>下级指令
        </button>
      </script>
    </>
  )
}
