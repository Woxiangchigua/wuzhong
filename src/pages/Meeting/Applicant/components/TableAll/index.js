import React, { Component, useEffect, useState } from 'react'
import { Button } from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../../ utils/dateFormat'
import "./index.css"

const query = graphql`
    query TableAll_ApplyAllMeetingListQuery(
            $order: String = ""
            $meetingName: String = ""
    ){
        applyAllMeetingList(order: $order,first: 10,skip: 0,meetingName: $meetingName){
          edges{
            applyUserId,
            beginTime,
            configuration,
            createdAt,
            deletedAt,
            endTime,
            id,
            intro,
            meetingName,
            meetingRoom{
              id,
              name
            },
            number,
            organizer,
            review,
            reviewUserId,
            status,
            updatedAt
          }
        }
    }`
export default function Table(props) {
    const [meetingList, setmeetingList] = useState([]);
    var table = window.layui.table;
    let searchKey = ""
    useEffect(
        () => {
            getList(searchKey)
            /* global layer */
            table.on('tool(test)', function (obj) {
                console.log(obj)
                let data = obj.data;
                let delIndex = layer.confirm('真的删除id为' + data.id + "的信息吗?", function (delIndex) {
                    console.log(delIndex)
                    layer.close(delIndex);
                });

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
            size: "sm",
            // url: '', //数据接口
            data: data
            , page: { count: 100 } //开启分页
            , cols: [[ //表头 
                { checkbox: true }
                , { field: 'id', title: 'ID', width: 100, sort: true }
                , { field: 'meetingName', title: '会议名称' }
                , {
                    field: 'meetingRoom', title: '会议室', width: 80,
                    templet: function (d) {
                        return `<div>${d.meetingRoom.name}</div>`
                    }
                }
                , { field: 'applyUserId', title: '申请人', width: 80 }
                , {
                    field: 'meetingTime', title: '开会时间', width: 177,
                    templet: function (d) {
                        return `<div>${dateFormat("YYYY-mm-dd", new Date(d.beginTime))} ${dateFormat("HH:MM", new Date(d.beginTime))}-${dateFormat("HH:MM", new Date(d.endTime))}</div>`
                    }
                }
                , { field: 'organizer', title: '主办部门', width: 80 }
                , {
                    field: 'status', title: '会议状态', align: "center", width: 80,
                    templet: function (d) {
                        if (d.review === 'MEETING_CHECK_PENDING_ADMIN' || d.review === 'MEETING_CHECK_PENDING_MANAGE') {
                            return "<span class='layui-badge'>待审核</span>"
                        } else if(d.review === 'MEETING_EDIT_OR_FAIL') {
                            return "<span class='layui-badge'>待提交</span>"
                        }else if(d.review === 'MEETING_PASS'){
                            return "<span class='layui-badge layui-bg-green'>已审核</span>"
                        }
                    }
                }
                , {
                    field: 'review', title: '部门领导', width: 80, align: "center",
                    templet: function (d) {
                        if (d.review === 'MEETING_CHECK_PENDING_ADMIN' || d.review === 'MEETING_PASS') {
                            return "<span class='layui-badge-dot layui-bg-green'></span>"
                        } else {
                            return "<span class='layui-badge-dot'></span>"
                        }
                    }
                }
                , {
                    field: 'review', title: '物业', width: 80, align: "center",
                    templet: function (d) {
                        if (d.review === 'MEETING_PASS') {
                            return "<span class='layui-badge-dot layui-bg-green'></span>"
                        } else {
                            return "<span class='layui-badge-dot'></span>"
                        }
                    }
                }
                , { field: '', title: "操作", align: "center", width: 160, toolbar: "#bar" }
            ]]
        });
    }


    function getList(searchKey) {
        fetchQuery(props.environment, query, {
            order: '',
            meetingName: searchKey
        }).then(data => {
            if (data) {
                if (data.applyAllMeetingList) {
                    let data2 = JSON.parse(JSON.stringify(data.applyAllMeetingList.edges))
                    init(data2)
                }
            }
        });
    }

    function open() {
        var checkStatus = table.checkStatus('idTest');
        console.log(checkStatus)
        if (checkStatus.data.length === 0) {
            let delIndex = layer.confirm(`请先选择要删除的数据`, function (delIndex) {
                console.log(delIndex)
                layer.close(delIndex);
            });
        } else {
            let delIndex = layer.confirm(`确认删除选中的${checkStatus.data.length}条数据？`, function (delIndex) {
                console.log(delIndex)
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
                <div className="top">
                    <div style={{ marginRight: 20 }}>会议名称</div>
                    <input onChange={(e) => inputChange(e)} type="text" style={{ width: 200, height: 30 }} placeholder="请输入关键词" className="layui-input layui-input-sm" />
                    <button onClick={search} style={{ marginLeft: 20 }} type="button" className="layui-btn layui-btn-sm">
                        <i className="layui-icon">&#xe615;</i>
                    </button>

                </div>
                <div className="topBtn">
                    <div>
                        <button type="button" onClick={open} lay-event="delAll" className="layui-btn layui-btn-sm">删除</button>
                    </div>
                    <div>
                        <span className="layui-badge-dot layui-bg-green"></span>
                        <span style={{ fontSize: 12 }}>已审结或已办理</span>
                        <span className="layui-badge-dot" style={{ marginLeft: 10 }}></span>
                        <span style={{ fontSize: 12 }}>未审结或未办理</span>
                    </div>
                </div>
                <table id="demo" lay-filter="test"></table>
            </div>
            <script type="text/html" id="bar">
                <button type='button' className='layui-btn layui-btn-normal layui-btn-xs'>
                    <i className="layui-icon">&#xe6b2;</i>详情
                </button>
                <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
                    <i className="layui-icon">&#xe640;</i>删除
                </button>
            </script>
        </>
    )


}
