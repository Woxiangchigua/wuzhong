import React from 'react';
import CreateMeeting from '../Mutations/CreateMeeting'
import AuditMeeting from '../Mutations/AuditMeeting'
import {
  Breadcrumb,
  Form,
  Input,
  Steps,
  Badge,
  Descriptions,
  Card,
  Col,
  PageHeader,
  Table,
  Button,
  Modal,Upload, Icon, message,
  Divider
} from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'
import {
  useHistory, Link
} from "react-router-dom";
const { Dragger } = Upload;
const query = graphql`
query Queryendmeeting_MeetingDetailQuery($id:ID!){
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
      title: '负责人姓名',
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
  ];

  const data = [
    {
      key: '1',
      name: '张三',
      age: "0001",
      address: '治安大队',
    },{
      key: '2',
      name: '李四',
      age: "0002",
      address: '交警大队',
    },{
      key: '3',
      name: '王五',
      age: "0003",
      address: '刑侦大队',
    }
  ];const columns1 = [
    {
      title: '负责人姓名',
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
        dataIndex:'delete',
        key: 'delete',
        render: (text, record) => (
          <span>
            <Button type="link">删除</Button>
          </span>
        ),
    },
  ];

  const data1 = [
    {
      key: '1',
      name: '张三',
      age: "0001",
      address: '治安大队',
    },{
      key: '2',
      name: '李四',
      age: "0002",
      address: '交警大队',
    },{
      key: '3',
      name: '王五',
      age: "0003",
      address: '刑侦大队',
    }
  ];
  const columns2 = [
    {
      title: '会议纪要文件',
      dataIndex: 'file',
      key: 'file',
      className: 'tabcolums'
    },
    {
      title: '上传人',
      dataIndex: 'name',
      key: 'name',
      className: 'tabcolums'
    },
    {
      title: '上传日期',
      dataIndex: 'date',
      key: 'date',
      className: 'tabcolums'
    },
    {
        title: '操作',
        dataIndex:'delete',
        key: 'delete',
        render: (text, record) => (
          <span>
            <Button type="link" onClick={() => {showModal(record.id)}} type="link">发送通知</Button>
            <Divider type="vertical" />
            <Button type="link">下载</Button>
            <Divider type="vertical" />
            <Button type="link">删除</Button>
          </span>
        ),
    },
  ];

  const data2 = [
    {
      key: '1',
      file: '治安大队的会议文件',
      name: "曲丽丽",
      date: '2020-03-18',
    },{
      key: '2',
      file: '交警大队的会议文件',
      name: "曲丽丽",
      date: '2020-03-18',
    },{
      key: '3',
      file: '刑侦大队的会议文件',
      name: "曲丽丽",
      date: '2020-03-18',
    },{
      key: '4',
      file: '网警大队的会议文件',
      name: "曲丽丽",
      date: '2020-03-18',
    }
  ];
  function showModal(id){
    let value = '';
    confirm({
      content: (<div><Card title="通知内容" bordered={false}>
      <TextArea rows={4} onChange={(e)=>{value=e;console.log(e)}} />
    </Card>
      <div className='divline'></div>
        <Card title="通知人员" bordered={false} style={{ margin: '0px 0 10px 0' }}>
          <Table bordered size="middle" columns={columns1} dataSource={data1} pagination={false} />,
        </Card></div>),
      okText: '立即发送',
      cancelText: '添加通知人',
      width:'600px',
      onOk() {
        console.log('立即发送');
      },
      onCancel() {
        console.log('添加通知人');
      },
    });
  }
  function showConfirm() {
    confirm({
      title: '你真的要提交这个会议吗?',
      content: '',
      onOk() {
        console.log('确认');
        CreateMeeting.commit(
          props.environment,
          Detail.beginTime,
          Detail.meetingRoomId,
          Detail.number,
          Detail.endTime,
          Detail.meetingName,
          Detail.organizer,
          Detail.configuration,
          Detail.intro,
          [],
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
  function showDeleteConfirm() {
    confirm({
      title: '你需要审核这个会议',
      content: '',
      okText: '同意',
      cancelText: '不同意',
      onOk() {
        console.log('确认');
        AuditMeeting.commit(
          props.environment,
          Detail.id,
          'MEETING_PASS',
          (response, errors) => {
            if (errors) {
              // console.log(errors)
              Modal.error({
                title: errors[0].message,
              });
            } else {
              // console.log(response);
              Modal.success({
                content: '审核成功',
                onOk() {
                  history.goBack()
                },
              });
            }
          },
          (response, errors) => {
            if (errors) {
              // console.log(errors)
            } else {
              // console.log(response);
            }
          }
        );
      },
      onCancel() {
        console.log('取消');
        AuditMeeting.commit(
          props.environment,
          Detail.id,
          'MEETING_EDIT_OR_FAIL',
          (response, errors) => {
            if (errors) {
              // console.log(errors)
              Modal.error({
                title: errors[0].message,
              });
            } else {
              // console.log(response);
              Modal.success({
                content: '审核成功',
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
    });
  }
  function goBack() {
    history.goBack()
  }
  const uploadfile = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看会议纪要详情</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <div className='divline'></div>
      <Card title="" bordered={false} >
        <Card title="会议纪要及信息" bordered={false} >
        <div className='divline'></div>
        <Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
        <Descriptions.Item label="主办单位">{Detail.organizer}</Descriptions.Item>
          <Descriptions.Item label="会议名称">{Detail.meetingName}</Descriptions.Item>
          <Descriptions.Item label="会议室">{Detail.meetingRoom.name}</Descriptions.Item>
          <Descriptions.Item label="会议开始时间">{dateFormat("HH:MM", new Date(Detail.beginTime))}</Descriptions.Item>
          <Descriptions.Item label="参会人数">{Detail.number}</Descriptions.Item>
          <Descriptions.Item label="申请人">{Detail.applyUserId}</Descriptions.Item>
          <Descriptions.Item label="申请日期">{dateFormat("YYYY-mm-dd", new Date(Detail.beginTime))}</Descriptions.Item>
          <Descriptions.Item label="会议结束时间">{dateFormat("HH:MM", new Date(Detail.endTime))}</Descriptions.Item>
          <Descriptions.Item label="会议状态">
            <Badge
              status={Detail.status === 'MEETING_END' ? 'default' : Detail.status === 'MEETING_CANCEL' ? 'error' : Detail.status === 'MEETING_AWAIT' ? 'success' : ''}
              text={Detail.status === 'MEETING_END' ? '会议结束' : Detail.status === 'MEETING_CANCEL' ? '已取消' : Detail.status === 'MEETING_AWAIT' ? '未开始' : ''} />
          </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="参会人员" bordered={false} style={{ margin: '0px 0 10px 0' }}>
          <Table bordered size="middle" columns={columns} dataSource={data} pagination={false} />,
        </Card>
        <Card type="inner" title="备注信息" style={{ height: '400px',marginBottom:'20px' }}>
          <div style={{ marginTop: '30px',width:'40%',minHeight:'250px',float:'left'}}>
          <Dragger {...uploadfile} style={{ minHeight:'250px',}}>
            <p className="ant-upload-drag-icon" style={{ marginTop: '50px'}}>
              <Icon type="upload" />
            </p>
            <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
            <p className="ant-upload-hint">支持文件扩展名：.rar .zip .doc .pdf .jpg...</p>
          </Dragger>
          </div>
          <Table bordered size="middle" columns={columns2} dataSource={data2} pagination={false} style={{ marginTop: '30px',marginLeft:'2%', width:'58%',minHeight:'300px',float:'left'}}/>,
        </Card>
        <Col span={24}>
          <Link to={"/Meeting/Meetingminutes"}>
            <Button type="primary" style={{ marginLeft: "48%" }}>关闭</Button>
          </Link>
        </Col>
      </Card>
    </div>
  );
}

function List(props) {
  console.log(props)
  const environment = props.environment;
  return (<QueryRenderer
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
        if (props.meeting) {
          return <MeetingDetail environment={environment} meetingRoomDetail={props.meeting} />
        }
      }
      return <div>Loading</div>;
    }}
  />);
}

export default List;