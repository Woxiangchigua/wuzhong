import React, { Component, useEffect, useState } from 'react'
import Archive from '../../../Mutations/Archive'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";

const query = graphql`
query Tablelist_BulletinListQuery( 
  $order: String = ""
  $name: String = ""
  $source: String = ""
  $status: [enumTypeBulletinStatus]!
){
  bulletinList(first:10,skip:0,order:$order,name:$name,source:$source,status:$status){
    edges{
      annex{
        name,
        url
      },
      bulletinDistribution{
        id
      },
      id,
      name,
      source,
      status,
      priority,
      sponsorUserId
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
            history.push('/Bulletin/Querybulletin/' + JSON.stringify({id:data.id,review:data.review}))
        }else if(obj.event==="fen"){
            history.push('/Bulletin/Distribution/' + JSON.stringify({id:data.id,review:data.review}))
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
            { checkbox: true }
            , { field: 'id', title: '公文id', width: 120, sort: true }
            , { field: 'name', title: '公文名称', }
            , { field: 'source', title: '公文来源', width: 300, }
            , { field: 'sponsorUserId', title: '公文发起人', align: "center", width: 150,
                templet: function (d) {
                  if (d.sponsorUserId === 'user-1') {
                      return "<span>王建国</span>"
                  }
                }
              }
            , { field: 'status', title: '归档状态', align: "center", width: 200, sort: true,
              templet: function (d) {
                if (d.status === 'BULLETIN_ARCHIVED') {
                  return "<span class='layui-badge'>已归档</span>"
                } else if(d.status === 'BULLETIN_UNASSIGNED') {
                  return "<span class='layui-badge'>未分发</span>"
                }else if(d.status === 'BULLETIN_NOT_ARCHIVED'){
                  return "<span class='layui-badge layui-bg-green'>已分发未归档</span>"
                }
              }
            }
            , { field: 'priority', title: '优先级', width: 80, align: "center", sort: true, }
            , { field: '', title: "操作", align: "center", width: 160, toolbar: "#bar" }
        ]]
    });
  }

  function getList(searchKey) {
    fetchQuery(props.environment, query, {
        first: 10,
        skip: 0,
        order: '',
        status:["BULLETIN_UNASSIGNED","BULLETIN_UNASSIGNED","BULLETIN_NOT_ARCHIVED"],
    }).then(data => {
      if (data) {
        if (data.bulletinList) {
          let data2 = JSON.parse(JSON.stringify(data.bulletinList.edges))
          init(data2)
        }
      }
    });
  }

  function open() {
    var checkStatus = table.checkStatus('idTest');
    var needdata = []
    for(let i=0;i<checkStatus.data.length;i++){
      needdata.push(checkStatus.data[i].id)
    }
    if (checkStatus.data.length === 0) {
      let delIndex = layer.confirm(`请先选择需要审核的数据`, function (delIndex) {
        // console.log(delIndex)
        layer.close(delIndex);
      });
    } else {
      let delIndex = layer.confirm(`确认选中的${checkStatus.data.length}条数据？`, function (delIndex) {
        Archive.commit(
          props.environment,
          needdata,
          (response, errors) => {
              if (errors) {
                  console.log(errors)
                  layer.msg(errors[0].message);
              } else {
                  console.log(response);
                  layer.msg("提交成功");
                  getList(searchKey)
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
  }

  function inputChange(e) {
    console.log(e.target.value)
    searchKey = e.target.value
  }

  function search() {
    getList(searchKey)
  }
  return (
    <>
      <div>
        <div className={'divclear'}></div>
        <div className="topBtn">
          <div>
            <button type="button" onClick={open} lay-event="delAll" className="layui-btn layui-btn-sm" style={{float:"left"}}>公文归档</button>
          </div>
        </div>
        <div style={{clear:"both"}}></div>
        <table id="demo" lay-filter="test"></table>
      </div>
      <script type="text/html" id="bar">
        <button type='button' lay-event="go" className='layui-btn layui-btn-normal layui-btn-xs'>
          <i className="layui-icon">&#xe6b2;</i>详情
        </button>
        <button type='button' lay-event="fen" className='layui-btn layui-btn-danger layui-btn-xs'>
          <i className="layui-icon">&#xe640;</i>分发
        </button>
      </script>
    </>
  )
}
