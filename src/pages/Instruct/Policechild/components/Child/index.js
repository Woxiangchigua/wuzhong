import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ModalAddAttendees from '@/components/ModalAddAttendees';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import './index.css';
import {
  Breadcrumb,
  Form,
  Input,
  Card,
  Col,
  Button,
  Descriptions,
  Badge,
  Select,
  Divider,
  DatePicker,Upload,Icon,
  Modal
} from 'antd';
const { Option } = Select;
const query = graphql`
query Child_ListQuery(
  $order: String = ""
  $instructionsId:ID!){
  PoliceToDoListByInstructionsId(first:100000,skip:0,order:$order,instructionsId:$instructionsId){
    edges{
      askFor
      deadline
      grade
      id
      instructions {
        annex {
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
        receiptAnnex {
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
      receiptAnnex {
        name
        url
      }
      receiptReply
      reject
      require
      startTime
      status
    }
  }
}`
export default function Table(props) {
  const [meetingList, setmeetingList] = useState([]);
  let history = useHistory();
  var table = window.layui.table;
  var layui = window.layui
  var rate = layui.rate
  let searchKey = ""
  useEffect(
    () => {
      getList(searchKey)
      /* global layer */
      table.on('tool(test)', function (obj) {
        console.log(obj)
        let data = obj.data;
        if(obj.event==="go"){
            history.push('/Instruct/Querypolice/' + JSON.stringify({id:data.id,listid:props.id}))
        }else if(obj.event==="ping"){
            history.push('/Instruct/Policescore/' + JSON.stringify({id:data.id,listid:props.id}))
        }else if(obj.event==="shen"){
          history.push('/Instruct/Depaudit/' + JSON.stringify({id:data.id,listid:props.id}))
        }else if(obj.event==="pi"){
          history.push('/Instruct/Depbatch/' + JSON.stringify({id:data.id,listid:props.id}))
        }
      })
    }
  )
  
  function init(data) {
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
            , { field: 'source', title: '指令来源', width: 130,
                templet: function (d) {
                  return `<div>${d.instructions.source}</div>`
                }
              }
            , { field: 'sponsorUserId', title: '指令发起人', align: "center", width: 130,
                templet: function (d) {
                  if (d.instructions.initiator === "account-1") {
                      return "<span>王建国</span>"
                  }
                }
              }
            , { field: 'status', title: '指令状态', align: "center", width: 200, sort: true,
                templet: function (d) {
                  if (d.status === 'INSTRUCTIONSTODO_REJECT_NOT') {
                    // return "<span class='layui-badge'>驳回无效</span>"
                    return "驳回无效"
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
                    // return "<span class='layui-badge layui-bg-green'>同意驳回</span>"
                    return "同意驳回"
                  }
                }
              }
            , {field:'sourceTime', title: '来源时间', width: 150,
                templet: function (d) {
                    return `<div>${dateFormat("YYYY-mm-dd", new Date(d.instructions.sourceTime))}</div>`
                }
              }
              , { field: 'grade', title: '评分', width: 200,
                  templet: function (d) {
                    return '<div id="star'+d.id+'"></div>'
                  } 
                }
            , { field: '', title: "操作", align: "center", width: 150, toolbar: "#bar" }
        ]],
        done: function (res, curr, count) {
         var data = res.data;
         for(var i in data){
          rate.render({
            elem:'#star'+data[i].id+'',
            length:5,
            value:data[i].grade,
            theme:"#FFB800",
            readonly:true, 
            text: true, 
            half: true,
            setText: function(value){
              var arrs = {
                '1': '极差'
                ,'2': '差'
                ,'3': '中等'
                ,'4': '好'
                ,'5': '极好'
              };
              this.span.text(arrs[value] || ( value + "星"));
            }
          })
         }
        },
    });
  }

  function getList(searchKey) {
    const {id}=JSON.parse(props.id)
    fetchQuery(props.environment, query, {
        first: 10,
        skip: 0,
        order: '',
        instructionsId: id,
    }).then(data => {
      if (data) {
        if (data.PoliceToDoListByInstructionsId) {
          let data2 = JSON.parse(JSON.stringify(data.PoliceToDoListByInstructionsId.edges))
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
        {`
          {{#  if(d.status === "INSTRUCTIONSTODO_REJECT" && d.status !== "INSTRUCTIONSTODO_REJECT_NOT" && d.status !== "INSTRUCTIONSTODO_REJECT_OK" ){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="shen">审批</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONSTODO_ASK" && d.status !== "INSTRUCTIONSTODO_REPLY" ){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="pi">批示</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONSTODO_SUBMIT"){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="ping">评分</button>
          {{#  } }}
          {{#  if(d.status === "INSTRUCTIONSTODO_YES" || d.status === "INSTRUCTIONSTODO_ASK" || d.status === "INSTRUCTIONSTODO_REPLY"
              || d.status === "INSTRUCTIONSTODO_REJECT" || d.status === "INSTRUCTIONSTODO_REJECT_OK" || d.status === "INSTRUCTIONSTODO_REJECT_NOT" 
              || d.status === "INSTRUCTIONSTODO_SUBMIT" ){ }}
            <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="go">详情</button>
          {{#  } }}
        `}
        {/* <button type='button' lay-event="go" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/xiangqing.png")} style={{marginTop:"-5px"}}/>
          <div>详情</div>
        </button>
        <button type='button' lay-event="ping" className='layui-btn layui-btn-primary layui-btn-xs' style={{border:"none"}}>
          <img src={require("../../../../../img/pingfen.png")} style={{marginTop:"-5px"}}/>
          <div>评分</div>
        </button> */}
      </script>
    </>
  )
}