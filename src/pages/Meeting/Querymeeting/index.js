import React from 'react';
import CommitCheckMeeting from '../Mutations/CommitCheckMeeting'
// import AuditMeeting from '../Mutations/AuditMeeting'
import AbrogateMeeting from '../Mutations/AbrogateMeeting'
import CancelMeeting from '../Mutations/CancelMeeting'
import {
  Breadcrumb,
  Input,
  Steps,
  Badge,
  Descriptions,
  Card,
  Col,
  Table,
  Button,
  Modal,
  Divider
} from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'
import {
  useHistory, Link
} from "react-router-dom";
import "./index.css"

const query = graphql`
query Querymeeting_MeetingDetailQuery($id:ID!){
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
    updatedAt
  }
  }`



function MeetingDetail(props) {
  let history = useHistory();
  console.log(props)
  const Detail = props.meetingRoomDetail
  // const { getFieldDecorator } = props.form;
  const { Step } = Steps;
  const ButtonGroup = Button.Group;
  const { confirm } = Modal;
  const { TextArea } = Input;
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'tabcolums'
    },
    {
      title: '负责人姓名',
      dataIndex: 'name',
      key: 'name',
      className: 'tabcolums'
    },
    {
      title: '警员编号',
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
  ];

  const data = [
    {
      key: '1',
      id:'001',
      name: '张三',
      age: "0001",
      address: '治安大队',
    }
  ];

  function showConfirm() {
    confirm({
      title: '你真的要提交这个会议吗?',
      content: '',
      onOk() {
        console.log('确认');
        CommitCheckMeeting.commit(
          props.environment,
          Detail.id,
          (response, errors) => {
            if (errors) {
              // console.log(errors)
              Modal.error({
                title: errors[0].message,
              });
            } else {
              // console.log(response);
              Modal.success({
                content: '提交成功',
                onOk() {
                  history.goBack()
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
      },
      onCancel() {
        console.log('取消');
      },
    });
  }
  function showAuditConfirm() {
    confirm({
      title: '你需要审核这个会议',
      content: '',
      okText: '同意',
      cancelText: '不同意',
      onOk() {
        console.log('确认');
      },
      onCancel() {
        console.log('取消');
      },
    });
  }
  function showAbrogateConfirm() {
    confirm({
      title: '你真的要取消这个会议吗?',
      content: '',
      okType: 'danger',
      onOk() {
        console.log('确认');
        AbrogateMeeting.commit(
          props.environment,
          Detail.id,
          (response, errors) => {
            if (errors) {
              // console.log(errors)
              Modal.error({
                title: errors[0].message,
              });
            } else {
              // console.log(response);
              Modal.success({
                content: '取消成功',
                onOk() {
                  history.goBack()
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
      },
      onCancel() {
        console.log('取消');
      },
    });
  }
  function showDeleteConfirm() {
    confirm({
      title: '你真的要删除这个会议吗?',
      content: '',
      okType: 'danger',
      onOk() {
        console.log('确认');
        CancelMeeting.commit(
          props.environment,
          Detail.id,
          (response, errors) => {
            if (errors) {
              // console.log(errors)
              Modal.error({
                title: errors[0].message,
              });
            } else {
              // console.log(response);
              Modal.success({
                content: '删除成功',
                onOk() {
                  history.goBack()
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
      },
      onCancel() {
        console.log('取消');
      },
    });
  }
  function goBack() {
    history.goBack()
  }
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看会议详情</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Card title="" bordered={false}  style={{marginTop:10}}>
        <Col span={24}>
          <div className="top">
            <div>
              <p style={{ float: "left", lineHeight: '30px', fontSize: '18px' }}>会议预约详情</p>
            </div>
            <div style={{ marginLeft: 0 }}>
              <Link
               style={{ display: props.review === 'MEETING_EDIT_OR_FAIL' ? 'inline-block' : 'none' }} 
               to={"/Meeting/Updatemeeting/" + Detail.id}>
                <Button>编辑</Button>
              </Link>
              <Button
               style={{ display: props.review === 'MEETING_EDIT_OR_FAIL' ? 'inline-block' : 'none', marginLeft: 10 }} 
               onClick={showConfirm}>提交审核</Button>
              <Button
               style={{ display: props.review === 'MEETING_CHECK_PENDING_MANAGE'|| props.review === 'MEETING_CHECK_PENDING_ADMIN'? 'inline-block' : 'none', marginLeft: 10 }} type="primary" 
               onClick={showAuditConfirm}>
                审核
              </Button>
              <Button
               style={{ display: props.review !== 'MEETING_EDIT_OR_FAIL' ? 'inline-block' : 'none', marginLeft: 10 }} type="danger" 
               onClick={showAbrogateConfirm}>
                取消
              </Button>
              <Button
               style={{ display: props.review === 'MEETING_EDIT_OR_FAIL' ? 'inline-block' : 'none', marginLeft: 10 }} type="danger" 
               onClick={showDeleteConfirm}>
                删除
              </Button>
            </div>
          </div>
        </Col>
        <Divider />
        <Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
          <Descriptions.Item label="主办单位">{Detail.organizer}</Descriptions.Item>
          <Descriptions.Item label="会议名称">{Detail.meetingName}</Descriptions.Item>
          <Descriptions.Item label="会议室">{Detail.meetingRoom.name}</Descriptions.Item>
          <Descriptions.Item label="会议开始时间">{dateFormat("HH:MM", new Date(Detail.beginTime))}</Descriptions.Item>
          <Descriptions.Item label="参会人数">{Detail.number}</Descriptions.Item>
          <Descriptions.Item label="申请人">
          <span>
              {Detail.applyUserId === 'user-1' ? '王建国' :  ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="申请日期">{dateFormat("YYYY-mm-dd", new Date(Detail.beginTime))}</Descriptions.Item>
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
        <Card title="参会人员" bordered={false} style={{ margin: '0px 0 10px 0' }}>
          <Table bordered size="middle" columns={columns} dataSource={data} pagination={false} />,
        </Card>
        <Card title="会场需求" bordered={false} style={{ margin: '0px 0 20px 0' }}>
          <p style={{
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.85)',
            marginBottom: 16,
            fontWeight: 500,
          }}
          ></p>
          <Card type="inner" title="备注信息" style={{ height: '300px' }}>
            {Detail.intro}
          </Card>
        </Card>

        <Col span={24}>
          <Button type="primary" onClick={goBack} style={{ marginLeft: "48%" }}>
            关闭
            </Button>
        </Col>
      </Card>
    </div>
  );
}

function List(props) {
  console.log(props)
  const {id,review}=JSON.parse(props.id)
  const environment = props.environment;
  return (<QueryRenderer
    environment={environment}
    query={query}
    // variables={{ id: props.id }}
    variables={{ id: id }}
    render={({ error, props, retry }) => {
      if (error) {
        return (
          <div>
            <h1>Error!</h1><br />{error.message}
          </div>)
      } else if (props) {
        if (props.meeting) {
          return <MeetingDetail environment={environment} meetingRoomDetail={props.meeting} id={props.id} review={review} />
        }
      }
      return <div>Loading</div>;
    }}
  />);
}

export default List;