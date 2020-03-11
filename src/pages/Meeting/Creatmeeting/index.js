import React, { useState,useEffect } from 'react';
import CreateMeeting from '../Mutations/CreateMeeting'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import Meeting from '../../../components/Meeting'
import './index.css';
import {
  Breadcrumb,
  Form,
  Input,
  Card,
  Col,
  Row,
  Table,
  Button,
  Divider,
  Modal,
  InputNumber,
  DatePicker,
  Select
} from 'antd';

import ModalAddAttendees from '@/components/ModalAddAttendees';

const { Option } = Select;
const { TextArea } = Input;
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    className: 'tabcolums'
  },
  {
    title: '参会人姓名',
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
  {
    title: '操作',
    className: 'tabcolums',
    key: 'action',
    render: (text, record) => (
      <Button type="danger" size="small">删除</Button>
    ),
  },
];

const data = [
  {
    key: '1',
    id: '001',
    name: '张三',
    age: "0001",
    address: '治安大队',
  }
];

const query = graphql`
    query Creatmeeting_MeetingRoomListQuery{
        meetingRoomList{
        edges{
            id,
            name
        }
        }
    }`

var childrenMsg = {}
function AddMeeting(props) {
  let history = useHistory();
  var layui = window.layui
  useEffect(
    ()=>{
      layui.use('form',function(){
        var form = layui.form;
      
         //刷新界面 所有元素
      
         form.render();
      
      });
    }
  )
  //添加与会负责人
  const [modalAddAttendeesVisible, setModalAddAttendeesVisible] = useState(false);
  const [end, setEnd] = useState([]);
  const environment = props.environment
  const resourceMap = props.meetingRoomList.edges.map(function (edge, index) {
    return (
      <Option value={edge.id} key={edge.id}>{edge.name}</Option>
    )
  })

  //添加负责人返回
  let modalAddAttendeesCallback = (a, d) => {
    setModalAddAttendeesVisible(false);
    console.log(a, d)
  }

  function getChildrenMsg(result, msg) {
    console.log(msg)
    // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数

    childrenMsg = msg
    console.log(childrenMsg)
  }



  function goBack() {
    history.goBack()
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
    console.log(e)
    // return false
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let date = values['date'].format('YYYY-MM-DD')
        console.log('Received values of form: ', values);
        CreateMeeting.commit(
          props.environment,
          new Date(date + begin[values.beginTime].val).toISOString(),
          values.roomId,
          values.number,
          new Date(date + values.endTime).toISOString(),
          values.meetingName,
          values.organizer,
          'configuration',
          values.intro,
          ["user-5",
            "user-6"
          ],
          "false,false,false,false,false",
          "reportUnit",
          "attendLeader",
          "MEETING_COMMON",
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
      }
    });
  };

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
            <label className="layui-form-label">输入框</label>
            <div className="layui-input-block">
              <input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autoComplete="off" className="layui-input" />
            </div>
          </div>

          <div className="layui-form-item">
            <label className="layui-form-label">选择框</label>
            <div className="layui-input-block">
              <select name="city" lay-verify="required">
                <option value=""></option>
                {/* <option value="0">北京</option>
                <option value="1">上海</option>
                <option value="2">广州</option>
                <option value="3">深圳</option>
                <option value="4">杭州</option> */}
                {beginList}
              </select>
            </div>
          </div>


          <div className="layui-form-item">
            <label className="layui-form-label">单选框</label>
            <div className="layui-input-block">
              <input type="radio" name="sex" value="男" title="男" />
              <input type="radio" name="sex" value="女" title="女"  />
            </div>
          </div>
          <div className="layui-form-item layui-form-text">
            <label className="layui-form-label">文本域</label>
            <div className="layui-input-block">
              <textarea name="desc" placeholder="请输入内容" className="layui-textarea"></textarea>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-input-block">
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">立即提交</button>
              <button type="reset" className="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>
        {/* <Row>

          <Col span={12}>
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
        </Row>
        <Row>
          <Col span={5}>
            <Form.Item label="会议室" >
              {getFieldDecorator('roomId', {
                rules: [{ required: true, message: '请选择会议室!' }],
              })(
                <Select placeholder="请选择会议室" style={{ width: 170 }}>
                  {resourceMap}
                </Select>,
              )}

            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="参会人数" >
              {getFieldDecorator('number', {
                rules: [{ required: true, message: '请输入参会人数!' }],
              })(
                <InputNumber min={0} />,
              )}

            </Form.Item>
          </Col>
          <Col span={4}>
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
        </Row>
        <Row>
          <Col span={5}>
            <Form.Item label="参会日期" >
              {getFieldDecorator('date', {
                rules: [{ required: true, message: '请输入参会人数!' }],
              })(
                <DatePicker />
              )}

            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="开始时间" >
              {getFieldDecorator('beginTime', {
                rules: [{ required: true, message: '请输入开始时间!' }],
              })(
                <Select placeholder="请选择开始时间" style={{ width: 150 }} onChange={handleSelectChange}>
                  {beginList}
                </Select>,
              )}

            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="结束时间" >
              {getFieldDecorator('endTime', {
                rules: [{ required: true, message: '请输入结束时间!' }],
              })(
                <Select placeholder="请选择结束时间" style={{ width: 150 }}>
                  {endList}
                </Select>,
              )}

            </Form.Item>
          </Col>
        </Row>

        <Col span={16} className="meeting_requirements">
          <Form.Item label="会议要求" >
            {getFieldDecorator('intro', {
              rules: [{ required: true, message: '请输入会议要求!' }],
            })(
              <TextArea
                placeholder="请输入会议要求"
                autoSize={{ minRows: 5 }}
              />
            )}

          </Form.Item>
        </Col> */}

      </Card>

      <Card title="参会人员" style={{ margin: '10px 0 20px 0' }}>

        <Col span={24}>
          <div className="top_button">
            <Button type="primary" icon="plus" onClick={() => { setModalAddAttendeesVisible(true) }}>
              添加负责人
              </Button>
          </div>
          <Table bordered size="middle" rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
        </Col>
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


      <ModalAddAttendees environment={environment} Visible={modalAddAttendeesVisible} callback={modalAddAttendeesCallback.bind(this)} />
    </>

  )

}

const AddMeeting2 = Form.create({ name: 'horizontal_login' })(AddMeeting)

function Home(props) {

  console.log(props)
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
                  <AddMeeting2 environment={environment} meetingRoomList={props.meetingRoomList} ref="children" />
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