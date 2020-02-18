import React from 'react';
import CreateMeeting from '../Mutations/CreateMeeting'
import Calendar from '../../../components/Calendar/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import './index.css';
import {
  Breadcrumb,
  Form,
  Input,
  Steps,
  Descriptions,
  Card,
  Col,
  PageHeader,
  Table,
  Button,
  Divider
} from 'antd';

const query = graphql`
    query Addtwo_MeetingRoomListQuery{
        meetingRoomList{
        edges{
            id,
            name
        }
        }
    }`
    class AddMeeting extends React.Component {
        state = {
            environment: this.props.environment,
            resourceMap: this.props.meetingRoomList.edges.map(function (edge,index) {
                return { 'resourceId': edge.id, 'resourceTitle': edge.name }
            }),
            loading: false,
        };
        render() {
            return (
                <div style={{ height: 500 }}>
                    <Calendar resourceMap={this.state.resourceMap}/>
                </div>
            )
        }
    }
function Home(props) {
  const environment = props.environment;
  const { getFieldDecorator } = props.form;
  const { Step } = Steps;
  const { TextArea } = Input; const columns = [
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
    },
    {
      key: '2',
      name: '李四',
      age: "0002",
      address: '交警大队',
    },
    {
      key: '3',
      name: '王五',
      age: "0003",
      address: '刑侦大队',
    },
  ];
  let handleSubmit = e => {
    // console.log(props.environment,)
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        CreateMeeting.commit(
          props.environment,
          new Date().toISOString(),
          5,
          values.number,
          new Date().toISOString(),
          values.meetingName,
          values.organizer, 
          'configuration',
          values.intro,
          (response, errors) => {
            if (errors) {
              console.log(errors)
            } else {
              console.log(response);
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
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>会议室预定表</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader
          title="会议室预定表"
          subTitle="用于内部各个会议室的预定功能"
        />,
        </Card>
      {/* <Divider />
        <PageHeader 
            subTitle="流程进度"
        />,
        <Steps progressDot current={1} style={{width:'80%',margin:'auto'}}>
            <Step title="选择会议室和会议时间"/>
            <Step title="填写基础信息" />
            <Step title="申请成功"/>
        </Steps> */}

      <Divider />
      {/* <Card title="会议室和会议时间" bordered={false} >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="会议室">1502</Descriptions.Item>
          <Descriptions.Item label="开始时间">14:30</Descriptions.Item>
          <Descriptions.Item label="结束时间">16:30</Descriptions.Item>
          <Descriptions.Item label="会议日期">2020-03-17</Descriptions.Item>
        </Descriptions>
      </Card> */}
      <Card title="会议室和会议时间" bordered={false} >
<QueryRenderer
        environment={environment}
        query={query
        }
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                if (props.meetingRoomList) {
                    return <AddMeeting environment={environment} meetingRoomList={props.meetingRoomList} />
                }
            }
            return <div>Loading</div>;
        }}
    />
    </Card> 
      <Divider />

      {/* <PageHeader 
            subTitle="基本信息"
        />, */}
      <Form layout="inline" onSubmit={handleSubmit} style={{ margin: '0px' }}>
        <Card title="基本信息" >
          <Col span={8}>
            <Form.Item label="主办单位" >
              {getFieldDecorator('organizer', {
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
                rules: [{ required: true, message: '请输入参会人数!' }],
              })(
                <Input
                  placeholder="请输入参会人数"
                />,
              )}

            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="会议要求" >
              {getFieldDecorator('intro', {
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
          <Table columns={columns} dataSource={data} pagination={false} />,
       <Button icon="plus" style={{ margin: '5px 0 20px 0', width: '100%' }}>
            添加负责人
              </Button></Card>
        <Col span={24}>
          <Form.Item style={{ marginLeft: '41%' }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '50px' }}>
              确认
              </Button>
            <Button type="primary" htmlType="submit" style={{ marginRight: '50px' }}>
              暂存
              </Button>
            <Button>
              上一步
              </Button>
          </Form.Item>
        </Col>
      </Form>
    </div>
  );
}

export default Form.create({ name: 'Home' })(Home);