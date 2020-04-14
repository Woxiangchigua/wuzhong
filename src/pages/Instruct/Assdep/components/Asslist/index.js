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
    queryJointlyList(first:100000,skip:0,order:$order,departmentName:$departmentName){
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
          history.push('/Instruct/Distinstructins/' + JSON.stringify({id:data.id,listid:2}))
        }else if(obj.event==="qing"){
          history.push('/Instruct/Depaskins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="bo"){
          history.push('/Instruct/Deprejectedins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="child"){
          history.push('/Instruct/Policechild/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="shen"){
          history.push('/Instruct/Depauditins/' + JSON.stringify({id:data.id}))
        }else if(obj.event==="pi"){
          history.push('/Instruct/Depbatchins/' + JSON.stringify({id:data.id}))
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
					  ,{field:'deadline', title: '来源时间', width: 150, align: "center", 
              templet: function (d) {
                  return `<div>${dateFormat("YYYY-mm-dd", new Date(d.deadline))}</div>`
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
      <button type='button' lay-event="go" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/xiangqing.png")} style={{marginTop:"-5px"}}/>
          <div>详情</div>
        </button>
        <button type='button' lay-event="xia" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/xiafa.png")} style={{marginTop:"-5px"}}/>
          <div>下发</div>
        </button>
        <button type='button' lay-event="hui" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/huifu.png")} style={{marginTop:"-5px"}}/>
          <div>回复</div>
        </button>
        <button type='button' lay-event="qing" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/qingshi.png")} style={{marginTop:"-5px"}}/>
          <div>请示</div>
        </button>
        <button type='button' lay-event="bo" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/bohui.png")} style={{marginTop:"-5px"}}/>
          <div>驳回</div>
        </button>
        <button type='button' lay-event="child" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/xiaji.png")} style={{marginTop:"-5px"}}/>
          <div>下级指令</div>
        </button>
        <button type='button' lay-event="shen" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/shenpi.png")} style={{marginTop:"-5px"}}/>
          <div>审批</div>
        </button>
        <button type='button' lay-event="pi" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/pishi.png")} style={{marginTop:"-5px"}}/>
          <div>批示</div>
        </button>
        <button type='button' lay-event="shang" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/shangbao.png")} style={{marginTop:"-5px"}}/>
          <div>上报</div>
        </button>
      </script>
    </>
  )
}
