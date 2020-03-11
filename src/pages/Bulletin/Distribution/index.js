import React, { useState } from 'react';
import Distribution from '../Mutations/Distribution'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import ModalAddAttendees from '@/components/ModalAddAttendees';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import './index.css';
import {
  Breadcrumb,
  Form,
  Input,
  Card,
  Col,
  Button,
  Select,
  Divider,
  DatePicker,
  Modal
} from 'antd';
const { Option } = Select;
const query = graphql`
query Distribution_OrgListListQuery($id:ID!){
  orgList(first:100000,skip:0){
    edges{
      id,
      name,
    }
  }
  bulletin(id:$id){
    id,
  }
}`
var childrenMsg = {}
function AddMeeting(props) {
  const id = props.bulletin.id
  let history = useHistory();
  const environment = props.environment

  const deplist = props.orgList.edges

  const children = deplist.map(function (edge, index) {
    return (
      <Option value={edge.id} key={edge.id}>
        {edge.name}
      </Option>
    )
  })

  const loading = false
  //提交
  function handleSubmit(e) {
    let obj = childrenMsg
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      let depidlist = values.depIds
      console.log(depidlist)
      let deadline = new Date(values['deadline'].format('YYYY-MM-DD')).toISOString()
      console.log(deadline)
      // return;
      if (!err) {
        Distribution.commit(
          props.environment,
          deadline,
          depidlist,
          id,
          0,
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

  function goBack() {
    history.goBack()
  }

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Form layout="inline" onSubmit={handleSubmit} style={{ margin: '0px' }}>
        <Card title="基本信息" >
          <Col span={12}>
            <Form.Item label="截至时间" >
              {getFieldDecorator('deadline', {
                rules: [{ required: true, message: '请选择截至时间!' }],
              })(
                <DatePicker style={{ width: "100%" }} />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="分发部门" >
              {getFieldDecorator('depIds', {
                rules: [{ required: true, message: '请选择部门!' }],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择部门"
                >
                  {children}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Card>
        <div style={{ clear: "both" }}></div>
        <Divider />
        <Col span={24}>
          <Form.Item style={{ marginLeft: '45%' }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '50px' }}>
              确认
              </Button>
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
  const {id}=JSON.parse(props.id)
  const environment = props.environment;
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 15px 0px' }}>
          <Breadcrumb.Item>公文管理</Breadcrumb.Item>
          <Breadcrumb.Item>公文分发</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Divider />

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
            if (props.orgList) {
              return (
                <>
                  <AddMeeting2 environment={environment} orgList={props.orgList} bulletin={props.bulletin} id={props.id} ref="children" />
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