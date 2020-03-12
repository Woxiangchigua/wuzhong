import React, { Component, useEffect, useState } from 'react'
import Needaudit from '../../../Mutations/Needaudit'
import Audit from '../../../Mutations/Audit'
import Archivedist from '../../../Mutations/Archivedist'
import Deparchive from '../../../Mutations/Deparchive'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";

const query = graphql`
query Tabledist_BullListQuery( 
  $order: String = ""
  $name: String = ""
  $source: String = ""
  $status: [enumTypeBulletinDistributionStatus]!
  $needReview: [enumTypeBulletinDistributionNeedReview]!
  $isReview: [enumTypeBulletinDistributionIsReview]!
){
  bulletinDistributionList(first:10,skip:0,order:$order,name:$name,source:$source,status:$status,needReview:$needReview,isReview:$isReview){
    edges{
      id,
      bulletinId,
      bulletin{
        name,
        source
      },
      depId,
      depReviewId,
      depClerkId,
      isReview,
      needReview,
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
            , { field: 'id', title: 'id', width: 200, sort: true }
            , { field: 'bulletinId', title: '公文id', width: 120, }
            , { 
                field: 'bulletinname', title: '公文名称',
                templet: function (d) {
                    return `<div>${d.bulletin.name}</div>`
                } 
              }
            , { 
                field: 'bulletinsource', title: '公文来源',
                templet: function (d) {
                    return `<div>${d.bulletin.source}</div>`
                }  
              }
            , { field: 'depId', title: '部门', align: "center", width: 100, 
                templet: function (d) {
                  if (d.depId === 'dep-1') {
                    return "<span>rootOrg</span>"
                  } else if(d.depId === 'dep-2') {
                    return "<span>治安大队</span>"
                  } else if(d.depId === 'dep-3') {
                    return "<span>交警大队</span>"
                  } else if(d.depId === 'dep-4') {
                    return "<span>刑侦大队</span>"
                  } else if(d.depId === 'dep-5') {
                    return "<span>督察大队</span>"
                  }
                }
              }
            , { field: 'depReviewId', title: '主管', align: "center", width: 100,
                  templet: function (d) {
                    if (d.depReviewId === 'user-0') {
                        return "<span>张队</span>"
                    }
                }
              }
            , { field: 'depClerkId', title: '文员', align: "center", width: 100,
                  templet: function (d) {
                    if (d.depClerkId === 'user-0') {
                        return "<span>李警官</span>"
                    }
                }
              }
            , { field: 'needReview', title: '签字审核', align: "center", width: 150, sort: true,
              templet: function (d) {
                if (d.needReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_NO') {
                  return "<span class='layui-badge layui-bg-gray'>无需</span>"
                } else if(d.needReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_YES') {
                  return "<span class='layui-badge'>需要</span>"
                }
              }
            }
            , { field: 'isReview', title: '领导审核', align: "center", width: 120, sort: true,
              templet: function (d) {
                if (d.isReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_NO') {
                  return "<span class='layui-badge'>未审</span>"
                } else if(d.isReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_YES') {
                  return "<span class='layui-badge layui-bg-green'>已审</span>"
                }
              }
            }
            , { field: 'needReview', title: '归档状态', align: "center", width: 140, sort: true,
              templet: function (d) {
                if (d.status === 'BULLETIN_DISTRIBUTION_UNASSIGNED') {
                  return "<span class='layui-badge'>未处理</span>"
                } else if(d.status === 'BULLETIN_DISTRIBUTION_NOT_ARCHIVED') {
                  return "<span class='layui-badge layui-bg-orange'>未归档（处理中）</span>"
                }else if(d.status === 'BULLETIN_DISTRIBUTION_DEP_ARCHIVED'){
                  return "<span class='layui-badge layui-bg-blue'>待归档</span>"
                }else if(d.status === 'BULLETIN_DISTRIBUTION_ARCHIVED'){
                  return "<span class='layui-badge layui-bg-green'>已归档</span>"
                }
              }
            }
        ]]
    });
  }

  function getList(searchKey) {
    fetchQuery(props.environment, query, {
      first: 10,
      skip: 0,
      order: '',
      status: ["BULLETIN_DISTRIBUTION_ARCHIVED","BULLETIN_DISTRIBUTION_UNASSIGNED","BULLETIN_DISTRIBUTION_NOT_ARCHIVED","BULLETIN_DISTRIBUTION_DEP_ARCHIVED"],
      isReview: ["BULLETIN_DISTRIBUTION_IS_REVIEW_NO","BULLETIN_DISTRIBUTION_IS_REVIEW_YES"],
      needReview: ["BULLETIN_DISTRIBUTION_NEED_REVIEW_NO","BULLETIN_DISTRIBUTION_NEED_REVIEW_YES"],

    }).then(data => {
      if (data) {
        if (data.bulletinDistributionList) {
          let data2 = JSON.parse(JSON.stringify(data.bulletinDistributionList.edges))
          init(data2)
        }
      }
    });
  }

  //需要签字审核
  function needopen() {
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
        Needaudit.commit(
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

  //签字审核
  function auditopen() {
    var checkStatus = table.checkStatus('idTest');
    var needdata = []
    for(let i=0;i<checkStatus.data.length;i++){
      needdata.push(checkStatus.data[i].id)
    }
    if (checkStatus.data.length === 0) {
      let delIndex = layer.confirm(`请先选择要审核的数据`, function (delIndex) {
        // console.log(delIndex)
        layer.close(delIndex);
      });
    } else {
      let delIndex = layer.confirm(`确认审核选中的${checkStatus.data.length}条数据？`, function (delIndex) {
        Audit.commit(
          props.environment,
          needdata,
          (response, errors) => {
              if (errors) {
                  console.log(errors)
                  layer.msg(errors[0].message);
              } else {
                  console.log(response);
                  layer.msg("审核成功");
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

  //部门公文归档
  function distopen() {
    var checkStatus = table.checkStatus('idTest');
    var needdata = []
    for(let i=0;i<checkStatus.data.length;i++){
      needdata.push(checkStatus.data[i].id)
    }
    if (checkStatus.data.length === 0) {
      let delIndex = layer.confirm(`请先选择需要归档的数据`, function (delIndex) {
        // console.log(delIndex)
        layer.close(delIndex);
      });
    } else {
      let delIndex = layer.confirm(`确认归档选中的${checkStatus.data.length}条数据？`, function (delIndex) {
        Deparchive.commit(
          props.environment,
          needdata,
          (response, errors) => {
              if (errors) {
                  console.log(errors)
                  layer.msg(errors[0].message);
              } else {
                  console.log(response);
                  layer.msg("归档成功");
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
  
  //办公文员归档
  function archiveopen() {
    var checkStatus = table.checkStatus('idTest');
    var needdata = []
    for(let i=0;i<checkStatus.data.length;i++){
      needdata.push(checkStatus.data[i].id)
    }
    console.log(needdata)
    if (checkStatus.data.length === 0) {
      let delIndex = layer.confirm(`请先选择需要归档的数据`, function (delIndex) {
        // console.log(delIndex)
        layer.close(delIndex);
      });
    } else {
      let delIndex = layer.confirm(`确认归档选中的${checkStatus.data.length}条数据？`, function (delIndex) {
        Archivedist.commit(
          props.environment,
          needdata,
          (response, errors) => {
              if (errors) {
                  console.log(errors)
                  layer.msg(errors[0].message);
              } else {
                  console.log(response);
                  layer.msg("归档成功");
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
            <button type="button" onClick={needopen} lay-event="need" className="layui-btn layui-btn-sm" style={{float:"left"}}>签字审核更改</button>
            <button type="button" onClick={auditopen} lay-event="audit" className="layui-btn layui-btn-sm" style={{float:"left"}}>审核</button>
            <button type="button" onClick={distopen} lay-event="deparchive" className="layui-btn layui-btn-sm" style={{float:"left"}}>部门归档</button>
            <button type="button" onClick={archiveopen} lay-event="archive" className="layui-btn layui-btn-sm" style={{float:"left"}}>办公室归档</button>
          </div>
        </div>
        <div style={{clear:"both"}}></div>
        <table id="demo" lay-filter="test" style={{width:"90%",marginLeft:"2%"}}></table>
      </div>
    </>
  )
}
