import React, { useState } from 'react';
import UpdateMeeting from '../Mutations/UpdateMeeting'
import Calendar from '../../../components/CalendarUpdate/index'
import { useHistory } from "react-router-dom";
import dateFormat from '../../../ utils/dateFormat'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import Meeting from '../../../components/MeetingUpdate'
import './index.css';
import {
  Breadcrumb,
  Form,
  Input,
  Card,
  Col,
  PageHeader,
  Table,
  Button,
  Divider,
  Modal,
  InputNumber,
  DatePicker,
  Select
} from 'antd';
import moment from 'moment';

const dateFormat2 = 'YYYY-MM-DD';

const { Option } = Select;
const { TextArea } = Input;
const columns = [
  {
    title: '参会人姓名',
    dataIndex: 'name',
    key: 'name',
    className: 'tabcolums'
  },
  {
    title: '工号',
    dataIndex: 'age',
    key: 'age',
    className: 'tabcolums'
  },
  {
    title: '所属部门',
    dataIndex: 'address',
    key: 'address',
    className: 'tabcolums'
  },
  {
    title: '操作',
    className: 'tabcolums',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>删除</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    age: "0001",
    address: '治安大队',
  }
];

const query = graphql`
    query Updatemeeting_MeetingRoomListQuery($id:ID!){
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
          number,
          organizer,
          review,
          reviewUserId,
          status,
          updatedAt
        }
    }`
var childrenMsg = {}
function AddMeeting(props) {
  let history = useHistory();
  
  const environment = props.environment
  const meetingId = props.meetingId
  const resourceMap = props.meetingRoomList.edges.map(function (edge, index) {
    return <Option value={edge.id} key={edge.id}>{edge.name}</Option>
  })
  const meetingDetail = props.meetingDetail
  console.log(meetingDetail)
  const events = []
  events.push({
    title: meetingDetail.meetingName,
    start: new Date(meetingDetail.beginTime),
    end: new Date(meetingDetail.endTime),
    resourceId: meetingDetail.meetingRoomId,
  })

  function getChildrenMsg(result, msg) {
    console.log(msg)
    // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数

    childrenMsg = msg
    console.log(childrenMsg)
  }

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

  let begin3 = JSON.parse(JSON.stringify(begin))
  begin3.splice(0, 1)
  begin3.push({ lable: "21:00", val: "T13:00:00Z" })
  const [end, setEnd] = useState(begin3);

  let beginIndex
  for (let i = 0; i < begin.length; i++) {
    if ("T" + meetingDetail.beginTime.split("T")[1] === begin[i].val) {
      beginIndex = i
    }
  }


  let beginList = begin.map((item, index) => {
    return (
      <Option value={index} key={item.val}>{item.lable}</Option>
    )
  })

  

  function handleSelectChange(val) {
    props.form.setFieldsValue({
      endTime: ``,
    });
    let begin2 = JSON.parse(JSON.stringify(begin))
    begin2.splice(0, val + 1)
    begin2.push({ lable: "21:00", val: "T13:00:00Z" })
    setEnd(begin2)
  }

  let endList = end.map((item) => {
    return (
      <Option value={item.val} key={item.val}>{item.lable}</Option>
    )
  })

  function handleSubmit(e) {
    // let obj = childrenMsg

    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let date=values['date'].format('YYYY-MM-DD')
        UpdateMeeting.commit(
          props.environment,
          meetingId,
          new Date(date+begin[values.beginTime].val).toISOString(),
          values.roomId,
          values.number,
          new Date(date+values.endTime).toISOString(),
          values.meetingName,
          values.organizer,
          'configuration',
          values.intro,
          ["user-5",
          "user-6"],
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
                  history.push('/Meeting/List')
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
      }
    });
  };
  function goBack() {
    history.goBack()
  }

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card title="会议室现有状态预览图" bordered={false} >
        {/* <div style={{ height: 500 }}>
          <Calendar resourceMap={resourceMap} item={events} parent={getChildrenMsg} />
        </div> */}
        <Meeting environment={props.environment} date={dateFormat("YYYY-mm-dd", new Date(meetingDetail.beginTime))} />
      </Card>
      <Divider />

      <Form layout="inline" onSubmit={handleSubmit} style={{ margin: '0px' }}>
        <Card title="基本信息" >
          <Col span={8}>
            <Form.Item label="主办单位" >
              {getFieldDecorator('organizer', {
                initialValue: meetingDetail.organizer,
                rules: [{ required: true, message: '请输入呈报单位!' }],
              })(
                <Input
                  placeholder="请输入呈报单位"
                />,
              )}

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="会议名称" >
              {getFieldDecorator('meetingName', {
                initialValue: meetingDetail.meetingName,
                rules: [{ required: true, message: '请输入会议名称!' }],
              })(
                <Input
                  placeholder="请输入会议名称"
                />,
              )}

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="参会人数" >
              {getFieldDecorator('number', {
                initialValue: meetingDetail.number,
                rules: [{ required: true, message: '请输入参会人数!' }],
              })(
                <InputNumber style={{width:"100%"}} min={0} />,
              )}

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="参会日期" >
              {getFieldDecorator('date', {
                initialValue: moment(dateFormat("YYYY-mm-dd", new Date(meetingDetail.beginTime)), dateFormat2),
                rules: [{ required: true, message: '请输入参会人数!' }],
              })(
                <DatePicker style={{width:"100%"}} format={dateFormat2} />
              )}

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="开始时间" >
              {getFieldDecorator('beginTime', {
                initialValue: beginIndex,
                rules: [{ required: true, message: '请输入开始时间!' }],
              })(
                <Select placeholder="请选择开始时间" onChange={handleSelectChange}>
                  {beginList}
                </Select>,
              )}

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="结束时间" >
              {getFieldDecorator('endTime', {
                initialValue: "T" + meetingDetail.endTime.split("T")[1],
                rules: [{ required: true, message: '请输入结束时间!' }],
              })(
                <Select placeholder="请选择结束时间">
                  {endList}
                </Select>,
              )}

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="会议室" >
              {getFieldDecorator('roomId', {
                initialValue:  meetingDetail.meetingRoomId,
                rules: [{ required: true, message: '请选择会议室!' }],
              })(
                <Select placeholder="请选择会议室">
                  {resourceMap}
                </Select>,
              )}

            </Form.Item>
          </Col>
          <Col span={16} className="meeting_requirements">
            <Form.Item label="会议要求" >
              {getFieldDecorator('intro', {
                initialValue: meetingDetail.intro,
                rules: [{ required: true, message: '请输入会议要求!' }],
              })(
                <TextArea
                  placeholder="请输入会议要求"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              )}

            </Form.Item>
          </Col></Card>
        <div style={{ clear: "both" }}></div>
        <Divider />
        <Card title="参会人员" style={{ margin: '0px 0 20px 0' }}>
          <Table bordered size="middle" columns={columns} dataSource={data} pagination={false} />
          <Button icon="plus" style={{ margin: '5px 0 20px 0', width: '100%' }}>
            添加负责人
          </Button>
        </Card>
        <Col span={24}>
          <Form.Item style={{ marginLeft: '41%' }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '50px' }}>
              确认
              </Button>
            {/* <Button type="primary" htmlType="submit" style={{ marginRight: '50px' }}>
              暂存
              </Button> */}
            <Button onClick={goBack}>
              取消
              </Button>
          </Form.Item>
        </Col>
      </Form>
    </>

  )

}

const AddMeeting2 = Form.create({ name: 'horizontal_login' })(AddMeeting)

function Home(props) {
  const meetingId = props.id
  console.log(props.id)
  const environment = props.environment;



  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 15px 0px' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>修改会议室申请</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader
          title="会议室预定表"
          subTitle="用于内部各个会议室的预定功能"
        />
      </Card>
      <Divider />

      <QueryRenderer
        environment={environment}
        query={query}
        variables={{ id: props.id }}
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
                  <AddMeeting2 environment={environment} meetingRoomList={props.meetingRoomList} meetingDetail={props.meeting} meetingId={meetingId} ref="children" />
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