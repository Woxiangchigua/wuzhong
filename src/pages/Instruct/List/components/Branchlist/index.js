import React, { Component, useEffect, useState } from 'react'
// import Archive from '../../../Mutations/Archive'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import Branchdist from '../../../Mutations/Branchdist'
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";

const query = graphql`
query Branchlist_InstructListQuery( 
  $order: String = ""
  $kind: enumTypeInstructionsKind
  $hostDepartment: String = ""
){
  instructionsList(first:100000,skip:0,order:$order,hostDepartment:$hostDepartment,kind:$kind){
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
  var layui = window.layui
  var table = layui.table;
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
          history.push('/Instruct/Queryinstruct/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="bian"){
          history.push('/Instruct/Updateinstruct/' + JSON.stringify({id:data.id,review:data.review}))
       }else if(obj.event==="xia"){
          issued(data.id)
        }else if(obj.event==="jin"){
          history.push('/Instruct/Timeline/' + JSON.stringify({id:data.id,review:data.review}))
        }
      })
    }
  )
  
  //下发
  function issued(id){
    let delIndex = layer.confirm("你确定下发这条指令信息吗?", function (delIndex) {
      Branchdist.commit(
        props.environment,
        id,
        (response, errors) => {
          if (errors) {
            /* global layer */
            layer.alert(errors[0].message,{title:'错误',icon: 2} ,function(index){
              //do something
              layer.close(index);
            });
          } else {
            layer.alert('下发成功',{title:'成功',icon: 1} ,function(index){
              //do something
              history.push('/Instruct/List')
              layer.close(index);
            });
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

  function init(data) {
    /* global layer */
    //第一个实例
    table.render({
        id: 'idTest',
        elem: '#demo',
        // url: '', //数据接口
        data: data
        // data: [
        //   {id:"1",name:"交警大队需要完成的指令",source:"交警大队",sponsorUserId:"user-1",type:"完成",time:"2020-04-03",xing:"5"},
        //   {id:"2",name:"刑侦大队需要完成的指令",source:"刑侦大队",sponsorUserId:"user-1",type:"完成",time:"2020-04-03",xing:"4.5"},
        //   {id:"3",name:"消防大队需要完成的指令",source:"消防大队",sponsorUserId:"user-1",type:"完成",time:"2020-04-03",xing:"3.5"},
        // ]
        , page: { count: 100 } //开启分页
        , cols: [[ //表头 
            // { checkbox: true }
            // , 
            { field: 'id', title: 'id', width: 150, sort: true }
            , { field: 'name', title: '指令名称', }
            , { field: 'source', title: '指令来源', width: 130, }
            , { field: 'initiator', title: '指令发起人', align: "center", width: 130,
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
					  ,{field:'sourceTime', title: '来源时间', width: 150,
              templet: function (d) {
                  return `<div>${dateFormat("YYYY-mm-dd", new Date(d.sourceTime))}</div>`
              }
					  }
            // , { field: 'xing', title: '评分', width: 200,
            //     templet: function (d) {
            //       return '<div id="star'+d.id+'"></div>'
            //     } 
            //   }
            // , { field: 'priority', title: '优先级', width: 80, align: "center", sort: true, }
            , { field: '', title: "操作", align: "center", width: 300, toolbar: "#bar" }
        ]],
        done: function (res, curr, count) {
         var data = res.data;
         for(var i in data){
          console.log(data[i])
          rate.render({
            elem:'#star'+data[i].id+'',
            length:5,
            value:data[i].xing,
            theme:"#FFB800",
            readonly:true, 
            text: true, 
            // half: true,
            // setText: function(value){
            //   var arrs = {
            //     '1': '极差'
            //     ,'2': '差'
            //     ,'3': '中等'
            //     ,'4': '好'
            //     ,'5': '极好'
            //   };
            //   this.span.text(arrs[value] || ( value + "星"));
            // }
          })
         }
        },
    });
  }

  function getList(searchKey) {
    // init()
    fetchQuery(props.environment, query,{
        first: 10,
        skip: 0,
        order: '',
        hostDepartment: '',
    }).then(data => {
      if (data) {
        if (data.instructionsList) {
          let data2 = JSON.parse(JSON.stringify(data.instructionsList.edges))
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
        <button type='button' lay-event="bian" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>编辑
        </button>
        <button type='button' lay-event="xia" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>下发
        </button>
        <button type='button' lay-event="jin" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe63c;</i>进程
        </button>
        {/* <button type='button' lay-event="qing" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe6b2;</i>请示
        </button>
        <button type='button' lay-event="ping" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe67a;</i>评分
        </button> */}
      </script>
    </>
  )
}
