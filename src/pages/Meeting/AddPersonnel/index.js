import React, { useState, useEffect } from 'react';
import UpdateMeeting from '../Mutations/UpdateMeeting'
import Addperson from '../Mutations/Addperson'
import Calendar from '../../../components/CalendarUpdate/index'
import { useHistory } from "react-router-dom";
import dateFormat from '../../../ utils/dateFormat'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import Meeting from '../../../components/MeetingUpdate'
import './index.css';
import {
  Breadcrumb,
  Form,
	Descriptions,
  Card,
	Badge,
  Modal,

} from 'antd';
import moment from 'moment';
import ModalAddAttendees from '@/components/ModalAddAttendees';



const data = [

];

const query = graphql`
    query AddPersonnel_MeetingRoomListQuery($id:ID!){
        meetingRoomList{
        edges{
            id,
            name
        }
        }
        meeting(id:$id){
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
          meetingRoomId,
          organizer,
          review,
          reviewUserId,
          status,
          updatedAt,
          attendLeader,
          meetingType,
          reportUnit,
          requirement
        }
    }`
var childrenMsg = {}
function AddMeeting(props) {
	const Detail = props.meetingDetail;
  let history = useHistory();
  const [modalAddAttendeesVisible, setModalAddAttendeesVisible] = useState(false);
  const environment = props.environment
  const meetingId = props.id
	console.log(props.meetingId)
  var layui = window.layui
  var form = layui.form;
  var laydate = layui.laydate;
  var table = window.layui.table;
  let meetingroom = props.meetingRoomList.edges
  const meetingDetail = props.meetingDetail
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
  let end = [

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
    { lable: "21:00", val: "T13:00:00Z" },
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
      init(data)
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
        $("#end").empty();
        $('#end').append(`<option value="">请选择结束时间</option>`)
        for (let i = 0; i < end.length; i++) {
          $('#end').append(`<option value=${end[i].val}>${end[i].lable}</option>`);
        }
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
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        let field = data.field
        let str = ["false", "false", "false", "false", "false"]
        if (field.checkbox0) {
          str[0] = "true"
        }  if (field.checkbox1) {
          str[1] = "true"
        }  if (field.checkbox2) {
          str[2] = "true"
        }
         if (field.checkbox3) {
          str[3] = "true"
        }
         if (field.checkbox4) {
          str[4] = "true"
        }
        field.requirement = str.join()
        Submit(field)
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });

      let detail = JSON.parse(JSON.stringify(meetingDetail))
      detail.date = dateFormat("YYYY-mm-dd", new Date(meetingDetail.beginTime))
      detail.roomId = meetingDetail.meetingRoomId
      detail.endTime = "T" + meetingDetail.endTime.split("T")[1]
      for (let i = 0; i < begin.length; i++) {
        if ("T" + meetingDetail.beginTime.split("T")[1] === begin[i].val) {
          detail.beginTime = i
        }
      }
      let requirementList = meetingDetail.requirement.split(",")
      console.log(requirementList)
      for (let i = 0; i < requirementList.length; i++) {
        if (requirementList[i] === 'true') {
          detail[`checkbox${i}`] = "on"
        }
      }
      console.log(detail)
      // $('#reportUnit').attr('value',detail.reportUnit)

      form.val("formDemo", detail);

    }
  )


  console.log(meetingDetail)


  function init(data) {
    /* global layer */
    //第一个实例
    table.render({
      id: 'idTest',
      elem: '#demo',
      size: "",
      // url: '', //数据接口
      data: data
      , page: { count: 100 } //开启分页
      , cols: [[ //表头 
        { checkbox: true }
        , { field: 'id', title: 'ID', sort: true }
        , { field: 'name', title: '参会人姓名' }
        , { field: 'age', title: '警员编号' }
        , { field: 'org_id', title: '所属部门' }
        , { field: '', title: "操作", align: "center", toolbar: "#bar" }
      ]]
    });
  }

  let begin3 = JSON.parse(JSON.stringify(begin))
  begin3.splice(0, 1)
  begin3.push({ lable: "21:00", val: "T13:00:00Z" })
  // const [end, setEnd] = useState(begin3);




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


  function Submit(values) {

    let date = values.date
    Addperson.commit(
      props.environment,
      props.meetingId,
      "depid-1",
      ["account-1",
			"account-2",
			"account-3",
			"account-4",
			"account-5",
			"account-6"],
      (response, errors) => {
        if (errors) {
          console.log(errors)
          Modal.error({
            title: errors[0].message,
          });
        } else {
          console.log(response);
          Modal.success({
            content: '提交成功',
            onOk() {
              history.push('/Meeting/Applicant')
            },
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
  function goBack() {
    history.goBack()
  }

  let modalAddAttendeesCallback = (a, d) => {
    setModalAddAttendeesVisible(false);
    console.log(a, d)
  }


  const { getFieldDecorator } = props.form;
  return (
    <>

      <Card title="会议基本信息" style={{ marginTop: 10 }}>
          <Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
            <Descriptions.Item label="主办单位">{Detail.organizer}</Descriptions.Item>
            <Descriptions.Item label="会议名称">{Detail.meetingName}</Descriptions.Item>
            <Descriptions.Item label="会议室">{Detail.meetingRoom.name}</Descriptions.Item>
            <Descriptions.Item label="申请人">
             <span>
               {Detail.applyUserId === 'user-1' ? '王建国' :  ''}
             </span>
            </Descriptions.Item>
            <Descriptions.Item label="参会人数">{Detail.number}</Descriptions.Item>
            <Descriptions.Item label="会议日期">{dateFormat("YYYY-mm-dd", new Date(Detail.beginTime))}</Descriptions.Item>
          	 <Descriptions.Item label="会议开始时间">{dateFormat("HH:MM", new Date(Detail.beginTime))}</Descriptions.Item>
            <Descriptions.Item label="会议结束时间">{dateFormat("HH:MM", new Date(Detail.endTime))}</Descriptions.Item>
            <Descriptions.Item label="会议状态" style={{ display: Detail.review === 'MEETING_PASS' ? 'block' : 'none' }}>
              <Badge
                status={Detail.status === 'MEETING_END' ? 'default' : Detail.status === 'MEETING_CANCEL' ? 'error' : Detail.status === 'MEETING_AWAIT' ? 'success' : ''}
                text={Detail.status === 'MEETING_END' ? '会议结束' : Detail.status === 'MEETING_CANCEL' ? '已取消' : Detail.status === 'MEETING_AWAIT' ? '未开始' : ''} />
            </Descriptions.Item>
            <Descriptions.Item label="审核状态" style={{ display: Detail.review === 'MEETING_PASS' ? 'none' : 'block' }}>
              <Badge
                status={Detail.review === 'MEETING_EDIT_OR_FAIL' ? 'warning' : Detail.review === 'MEETING_PASS' ? 'success' : 'error'}
                text={Detail.review === 'MEETING_EDIT_OR_FAIL' ? '待提交' : Detail.review === 'MEETING_CHECK_PENDING_MANAGE' ? '部门审核' : Detail.review === 'MEETING_CHECK_PENDING_ADMIN' ? '管理员审核' : Detail.review === 'MEETING_PASS' ? '审核通过' :''} />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions size="small" column={4} style={{ marginTop: "0px" }}>,
          	<Descriptions.Item label="会场需求">{Detail.intro}</Descriptions.Item>
          </Descriptions>
			</Card>
          
			 <Card title="添加参会人员" style={{ marginTop: 10 }}>
				<form className="layui-form" lay-filter="formDemo" action="">
          <div className="layui-form-item">
            <div className="top_button">
              <div>
                <button type="button" onClick={open} lay-event="delAll" className="layui-btn layui-btn-sm">删除</button>
                <button type="button" onClick={() => { setModalAddAttendeesVisible(true) }} className="layui-btn layui-btn-sm">添加</button>
              </div>
            </div>
            <table id="demo" lay-filter="test"></table>
          </div>
          <div className="layui-form-item">
            <div className="layui-input-block" align="center">
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">立即提交</button>
              <button type="reset" className="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>

        <script type="text/html" id="bar">
          <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
            <i className="layui-icon">&#xe640;</i>删除
                </button>
        </script>
      </Card>
      <ModalAddAttendees environment={environment} Visible={modalAddAttendeesVisible} callback={modalAddAttendeesCallback.bind(this)} />
    </>

  )

}

const AddMeeting2 = Form.create({ name: 'horizontal_login' })(AddMeeting)

function Home(props) {
  const {id}=JSON.parse(props.id)
  console.log(id)
  const environment = props.environment;



  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 15px 0px' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>修改会议室申请</Breadcrumb.Item>
        </Breadcrumb>
        {/* <PageHeader
          title="会议室预定表"
          subTitle="用于内部各个会议室的预定功能"
        /> */}
      </Card>

      <QueryRenderer
        environment={environment}
        query={query}
        variables={{ id: id }}
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
                  <AddMeeting2 environment={environment} meetingRoomList={props.meetingRoomList} meetingDetail={props.meeting} meetingId={id} ref="children" />
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