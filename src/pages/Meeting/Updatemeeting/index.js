import React from 'react';
import UpdateMeeting from '../Mutations/UpdateMeeting'
import Calendar from '../../../components/CalendarUpdate/index'
import { useHistory } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
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
  Modal
} from 'antd';


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
    return { 'resourceId': edge.id, 'resourceTitle': edge.name }
  })
  const meetingDetail = props.meetingDetail
  const loading = false
  const events = []
  events.push({
    title: meetingDetail.meetingName,
    start: new Date(meetingDetail.beginTime),
    end: new Date(meetingDetail.endTime),
    resourceId: meetingDetail.meetingRoomId,
  })

  console.log(meetingId)

  function getChildrenMsg(result, msg) {
    console.log(msg)
    // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数

    childrenMsg = msg
    console.log(childrenMsg)
  }

  function handleSubmit(e) {
    let obj = childrenMsg
    // console.log(obj)
    // return false
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        UpdateMeeting.commit(
          props.environment,
          meetingId,
          new Date(obj.start).toISOString(),
          obj.resourceId,
          values.number,
          new Date(obj.end).toISOString(),
          values.meetingName,
          values.organizer,
          'configuration',
          values.intro,
          [],
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
  function goBack(){
    history.goBack()
  }

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card title="会议室和会议时间" bordered={false} >
        <div style={{ height: 500 }}>
          <Calendar resourceMap={resourceMap} item={events} parent={getChildrenMsg} />
        </div>

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
                <Input
                  placeholder="请输入参会人数"
                />,
              )}

            </Form.Item>
          </Col>
          <Col span={12} className="meeting_requirements">
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
          <Table columns={columns} dataSource={data} pagination={false} />
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
  const meetingId=props.id
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