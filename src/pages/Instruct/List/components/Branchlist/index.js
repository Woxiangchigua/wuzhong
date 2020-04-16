import React, { Component, useEffect, useState } from 'react'
// import Archive from '../../../Mutations/Archive'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import Branchdist from '../../../Mutations/Branchdist'
import Delete from '../../../Mutations/Delete'
import Confirm from '../../../Mutations/Confirm'
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";

const query = graphql`
query Branchlist_InstructListQuery( 
  $order: String = ""
  $kind: enumTypeInstructionsKind
  $hostDepartment: String = ""
  $name: String = ""
  $source: String = ""
){
  instructionsList(first:100000,skip:0,order:$order,hostDepartment:$hostDepartment,name:$name,source:$source,kind:$kind){
    totalCount
    edges{
      annex{
        name
        url
      }
      classify
      deadline
      grade
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
        }else if(obj.event==="bian"){
          history.push('/Instruct/Updateinstruct/' + JSON.stringify({id:data.id,review:data.review}))
       }else if(obj.event==="xia"){
          history.push('/Instruct/Updateinstruct/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="jin"){
          history.push('/Instruct/Timeline/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="ping"){
          history.push('/Instruct/Allscoreins/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="shan"){
          isdel(data.id)
        }else if(obj.event==="pi"){
          history.push('/Instruct/Batchins/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="shen"){
          history.push('/Instruct/Auditins/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="que"){
          iscon(data.id)
        }
      })
      //监听排序事件 
      table.on('sort(test)', function(obj){ //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        console.log(obj.field); //当前排序的字段名
        console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
        console.log(this); //当前排序的 th 对象

        //尽管我们的 table 自带排序功能，但并没有请求服务端。
        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
        table.reload('idTest', {
          initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
          ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
            field: obj.field //排序字段
            ,order: 'deadline asc,status desc', //排序方式
          }
        });
      });
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

  //删除
  function isdel(id){
    let delIndex = layer.confirm("你确定删除这条指令信息吗?", function (delIndex) {
      Delete.commit(
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
            layer.alert('删除成功',{title:'成功',icon: 1} ,function(index){
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

  //确认
  function iscon(id){
    let delIndex = layer.confirm("你确定要对这条指令信息进行确认吗?", function (delIndex) {
      Confirm.commit(
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
            layer.alert('确认成功',{title:'成功',icon: 1} ,function(index){
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
            // { field: 'id', title: 'id', width: 150, sort: true },
             { field: 'name', title: '指令名称', }
            , { field: 'classify', title: '指令类型', width: 130,
                templet: function (d) {
                  if (d.classify === 'INSTRUCTIONS_CASE') {
                    return "事件督导"
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
                  return "进行中"
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
            , { field: 'grade', title: '评分', width: 200,
                templet: function (d) {
                  return '<div id="star'+d.id+'"></div>'
                } 
              }
            , { field: '', title: "操作", align: "center", width: 300, toolbar: "#bar" }
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
            // half: true,
            setText: function(value){
              var arrs = {
                '0': '未评分'
                ,'1': '极差'
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

  function getList(searchKey1,searchKey2) {
    // init()
    fetchQuery(props.environment, query,{
        first: 10,
        skip: 0,
        order: 'deadline asc',
        hostDepartment: '',
        name:searchKey1,
        source:searchKey2,
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
    const searchKey1 = "%" + $('#tablename').val() + "%";
    const searchKey2 = "%" + $('#tablesource').val() + "%";;
    getList(searchKey1,searchKey2)
  }
  return (
    <>
      <div>
        <div className={'divclear'}></div>
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
        {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_NOT_ISSUE" ){ }}
          <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="xia">下发</button>
        {{#  } }}
        {{#  if(d.status === "INSTRUCTIONS_DEPARTMENT_ASK" ){ }}
          <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="pi">批示</button>
        {{#  } }}
        {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_CHECK" ){ }}
          <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="shen">审批</button>
        {{#  } }}
        {{#  if(d.status === "INSTRUCTIONS_DEPARTMENT_SUBMIT" ){ }}
          <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="que">确认</button>
        {{#  } }}
        {{#  if(d.status === "INSTRUCTIONS_DEPARTMENT_SUBMIT" ){ }}
          <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="ping">评分</button>
        {{#  } }}
        {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_ISSUE" || d.status === "INSTRUCTIONS_DEPARTMENT_ISSUE"
        || d.status === "INSTRUCTIONS_DEPARTMENT_ASK" || d.status === "INSTRUCTIONS_SUBOFFICE_CHECK" || d.status === "INSTRUCTIONS_SUBOFFICE_CHECK" 
        || d.status === "INSTRUCTIONS_DEPARTMENT_SUBMIT" || d.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" || d.status === "INSTRUCTIONS_SUBOFFICE_REJECT_OK"
        || d.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" || d.status === "INSTRUCTIONS_SUBOFFICE_REJECT_NOT"){ }}
          <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="jin">进程</button>
        {{#  } }}
        {{#  if(d.status === "INSTRUCTIONS_SUBOFFICE_NOT_ISSUE" ){ }}
          <button class='layui-btn layui-btn-primary layui-btn-xs' lay-event="shan">删除</button>
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
