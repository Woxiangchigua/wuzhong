import React, { useState, useEffect } from 'react';
import CreateMeeting from '../Mutations/CreateMeeting'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import Meeting from '../../../components/Meeting'
// import $ from "jquery"
import './index.css';
import {Breadcrumb,Form,Card,} from 'antd';

import ModalAddAttendees from '@/components/ModalAddAttendees';


const data = [

];

const query = graphql`
    query Creatmeeting_MeetingRoomListQuery{
        meetingRoomList{
        edges{
            id,
            name
        }
        }
        orgList(first:100000,skip:0){
          edges{
            id,
            name,
          }
        }
    }`

var childrenMsg = {}
function AddMeeting(props) {
  let history = useHistory();
  var layui = window.layui
  var form = layui.form;
  var laydate = layui.laydate;
  var table = window.layui.table;
  let meetingroom = props.meetingRoomList.edges
  let orgList = props.orgList.edges
  let begin = [
    { lable: "09:00", val: "T01:00:00Z" },
    { lable: "09:30", val: "T01:30:00Z" },
    { lable: "10:00", val: "T02:00:00Z" },
    { lable: "10:30", val: "T02:30:00Z" },
    { lable: "11:00", val: "T03:00:00Z" },
    { lable: "11:30", val: "T03:30:00Z" },
    { lable: "12:00", val: "T04:00:00Z" },
    { lable: "12:30", val: "T04:30:00Z" },
    { lable: "13:00", val: "T05:00:00Z" },
    { lable: "13:30", val: "T05:30:00Z" },
    { lable: "14:00", val: "T06:00:00Z" },
    { lable: "14:30", val: "T06:30:00Z" },
    { lable: "15:00", val: "T07:00:00Z" },
    { lable: "15:30", val: "T07:30:00Z" },
    { lable: "16:00", val: "T08:00:00Z" },
    { lable: "16:30", val: "T08:30:00Z" },
    { lable: "17:00", val: "T09:00:00Z" },
    { lable: "17:30", val: "T09:30:00Z" },
    { lable: "18:00", val: "T10:00:00Z" },
    { lable: "18:30", val: "T10:30:00Z" },
    { lable: "19:00", val: "T11:00:00Z" },
    { lable: "19:30", val: "T11:30:00Z" },
    { lable: "20:00", val: "T12:00:00Z" },
    { lable: "20:30", val: "T12:30:00Z" },
  ]
  const $ = window.$

  for (let i = 0; i < 8; i++) {
    data.push({
      'id': `00${i}`,
      'name': `张三${i}`,
      'age': `000${i}`,
      'address': `治安大队`,
    })
  }

  useEffect(
    () => {
      /* global layer */
      layui.use(['form', 'laydate'], function () {
        //执行一个laydate实例
        laydate.render({
          elem: '#begindate',
        });

        $("#meetingroom").empty();
        $('#meetingroom').append(`<option value=""></option>`)
        for (let i = 0; i < meetingroom.length; i++) {
          $('#meetingroom').append(`<option value=${meetingroom[i].id}>${meetingroom[i].name}</option>`);
        }

        $("#org").empty();
        for (let i = 0; i < orgList.length; i++) {
          $('#org').append(`<input type="checkbox" value=${orgList[i].id} name="org${i}" lay-skin="primary" title=${orgList[i].name} />`);
        }
        $("#end").empty();
        $('#end').append(`<option value="">请选择结束时间</option>`)
        $("#begin").empty();
        $('#begin').append(`<option value="">请选择开始时间</option>`)
        for (let i = 0; i < begin.length; i++) {
          $('#begin').append(`<option value=${i}>${begin[i].lable}</option>`);
        }
        form.render();
      });

      form.on('select(begin)', function (data) {
        let begin2 = JSON.parse(JSON.stringify(begin))
        begin2.splice(0, data.value * 1 + 1)
        begin2.push({ lable: "21:00", val: "T13:00:00Z" })
        $("#end").empty();
        $('#end').append(`<option value="">请选择结束时间</option>`)
        for (let i = 0; i < begin2.length; i++) {
          $('#end').append(`<option value=${begin2[i].val}>${begin2[i].lable}</option>`);
        }
        form.render();
      });

      form.on('submit(formDemo)', function (data) {
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        let field = data.field
        let str = ["false", "false", "false", "false", "false"]
        for (let i = 0; i < str.length; i++) {
          if (field[`checkbox${i}`]) {
            str[i] = "true"
          }
        }
        
        field.requirement = str.join()
        let orgIds = []
        for (let i = 0; i < orgList.length; i++) {
          if (field[`org${i}`]) {
            orgIds.push(field[`org${i}`])
          }
        }
        field.orgIds = orgIds
        console.log(field)
        Submit(field)
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    }
  )


  //添加与会负责人
  const [modalAddAttendeesVisible, setModalAddAttendeesVisible] = useState(false);
  const environment = props.environment


  //添加负责人返回
  let modalAddAttendeesCallback = (a, d) => {
    setModalAddAttendeesVisible(false);
    console.log(a, d)
  }

  function goBack() {
    history.goBack()
  }



  function Submit(values) {


    let date = values.date
    CreateMeeting.commit(
      props.environment,
      new Date(date + begin[values.beginTime].val).toISOString(),
      values.roomId,
      new Date(date + values.endTime).toISOString(),
      values.meetingName,
      values.organizer,
      'configuration',
      values.intro,
      values.orgIds,
      values.requirement,
      'reportUnit',
      values.attendLeader,
      values.meetingType,
      [],
      (response, errors) => {
        if (errors) {
          console.log(errors)
          // Modal.error({
          //   title: errors[0].message,
          // });
          layer.alert(errors[0].message,{title:'错误',icon: 2} ,function(index){
            //do something
            layer.close(index);
          }); 
        } else {
          console.log(response);
          // Modal.success({
          //   content: '提交成功',
          //   onOk() {
          //     history.push('/Meeting/Applicant')
          //   },
          // });
          /* global layer */
          layer.alert('提交成功',{title:'成功',icon: 1} ,function(index){
            //do something
            history.push('/Meeting/Applicant')
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

  };

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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card title="会议室现有状态预览图" bordered={false} style={{ marginTop: 10 }}>
        <Meeting environment={props.environment} />
      </Card>


      <Card title="填写会议室预订表" style={{ marginTop: 10 }}>
        <form className="layui-form" action="">
          <div className="layui-form-item">

            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>主办单位</label>
              <div className="layui-input-block">
                <input type="text" name="organizer" required lay-verify="required" autoComplete="off" className="layui-input" />
              </div>
            </div>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>会议名称</label>
              <div className="layui-input-block">
                <input type="text" name="meetingName" required lay-verify="required" autoComplete="off" className="layui-input" />
              </div>
            </div>

          </div>

          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>参会领导</label>
              <div className="layui-input-block">
                <input type="text" name="attendLeader" required lay-verify="required" autoComplete="off" className="layui-input" />
              </div>
            </div>

            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>会议类型</label>
              <div className="layui-input-block">
                <input type="radio" name="meetingType" value="MEETING_COMMON" title="普通会议" defaultChecked />
                <input type="radio" name="meetingType" value="MEETING_VIDEO" title="视频会议" />
              </div>
            </div>
          </div>
          <div className="layui-form-item">
            <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>参会部门</label>
            <div className="layui-input-block" id='org' style={{ width: 700 }}>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>会议时间</label>
              <div className="layui-input-inline" >
                <input type="text" name="date" className="layui-input" id="begindate" />
              </div>
              <div className="layui-form-mid">-</div>
              <div className="layui-input-inline" >
                <select name="beginTime" id="begin" lay-filter="begin" lay-verify="required">
                </select>
              </div>
              <div className="layui-form-mid">-</div>
              <div className="layui-input-inline" >
                <select name="endTime" id="end" lay-verify="required">
                </select>
              </div>
            </div>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>会议地点</label>
              <div className="layui-input-block">
                <select name="roomId" id="meetingroom" lay-verify="required">
                </select>
              </div>
            </div>
          </div>
          {/* <div className="layui-form-item">
            <div className="top_button">
              <div>参会人员</div>
              <div>
                <button type="button" onClick={open} lay-event="delAll" className="layui-btn layui-btn-sm">删除</button>
                <button type="button" onClick={() => { setModalAddAttendeesVisible(true) }} className="layui-btn layui-btn-sm">添加</button>
              </div>
            </div>
            <table id="demo" lay-filter="test"></table>
          </div> */}
          <div className="layui-form-item">
            <label className="layui-form-label" style={{ width: 100 }} >会场要求</label>
            <div className="layui-input-block">
              <input type="checkbox" name="checkbox0" lay-skin="primary" title="话筒" />
              <input type="checkbox" name="checkbox1" lay-skin="primary" title="电子屏或投影仪" />
              <input type="checkbox" name="checkbox2" lay-skin="primary" title="茶水" />
              <input type="checkbox" name="checkbox3" lay-skin="primary" title="科信保障" />
              <input type="checkbox" name="checkbox4" lay-skin="primary" title="物业服务员(涉密会议原则上不安排服务员)" />
            </div>
            <div className="layui-input-block">
              其他需求
              <textarea name="intro" placeholder="请输入内容" className="layui-textarea"></textarea>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-input-block">
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">立即提交</button>
              <button type="reset" className="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>

        <script type="text/html" id="bar">
          <button type='button' lay-event="go" className='layui-btn layui-btn-normal layui-btn-xs'>
            <i className="layui-icon">&#xe6b2;</i>编辑
                </button>
          <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
            <i className="layui-icon">&#xe640;</i>删除
                </button>
        </script>
      </Card>

      {/* <Col span={24}>
        <Form.Item style={{ marginLeft: '41%' }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: '50px' }}>
            确认
              </Button>
          <Button onClick={goBack}>
            取消
              </Button>
        </Form.Item>
      </Col> */}


      <ModalAddAttendees environment={environment} Visible={modalAddAttendeesVisible} callback={modalAddAttendeesCallback.bind(this)} />
    </>

  )

}

const AddMeeting2 = Form.create({ name: 'horizontal_login' })(AddMeeting)

function Home(props) {

  const environment = props.environment;



  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 0px 0px' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>会议室申请</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      {/* <Divider /> */}

      <QueryRenderer
        environment={environment}
        query={query}
        render={({ error, props, retry }) => {
          if (error) {
            return (
              <div>
                <h1>Error!</h1><br />{error.message}
              </div>)
          } else if (props) {
            if (props.meetingRoomList) {

              return (
                <>
                  <AddMeeting2 environment={environment} meetingRoomList={props.meetingRoomList} orgList={props.orgList} ref="children" />
                </>
              )
            }
          }
          return <div>Loading</div>;
        }}
      />

    </div>
  );
}

export default Home;