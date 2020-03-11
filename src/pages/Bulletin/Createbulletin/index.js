import React, { useState } from 'react';
import CreateBulletin from '../Mutations/CreateBulletin'
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
  Divider,Upload,Icon,
  Modal
} from 'antd';

//上传
const { Dragger } = Upload;
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
      // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
};

var childrenMsg = {}
function AddMeeting(props) {
  let history = useHistory();
  const environment = props.environment
  const loading = false
  //提交
  function handleSubmit(e) {
    let obj = childrenMsg
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        CreateBulletin.commit(
          props.environment,
          values.name,
          values.source,
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
            <Form.Item label="公文名称" >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入公文名称!' }],
              })(
                <Input
                  placeholder="请输入公文名称"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="公文来源" >
              {getFieldDecorator('source', {
                rules: [{ required: true, message: '请输入公文来源!' }],
              })(
                <Input
                  placeholder="请输入公文来源"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12} style={{ marginLeft: '25%' }}>
            <Form.Item label="公文上传" >
                <Dragger {...uploadfile} style={{ minHeight:'250px',}}>
                    <p className="ant-upload-drag-icon" style={{ marginTop: '50px'}}>
                    <Icon type="upload" />
                    </p>
                    <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                    <p className="ant-upload-hint">支持文件扩展名：.rar .zip .doc .pdf .jpg...</p>
                </Dragger>
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
  const environment = props.environment;
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 15px 0px' }}>
          <Breadcrumb.Item>公文管理</Breadcrumb.Item>
          <Breadcrumb.Item>新增公文</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Divider />

      <QueryRenderer
        environment={environment}
        render={({ error, props, retry }) => {
          if (error) {
            return (
              <div>
                <h1>Error!</h1><br />{error.message}
              </div>)
          } else if (props) {
            if (props) {

              return (
                <>
                  <AddMeeting2 environment={environment} ref="children" />
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