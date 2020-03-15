import React, { useState,useEffect } from 'react';
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

const query = graphql`
query Createbulletin_OrgListListQuery{
  orgList(first:100000,skip:0){
    edges{
      id,
      name,
    }
  }
}`
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
  var layui = window.layui
  var form = layui.form;
  const environment = props.environment
  const deplist = props.orgList.edges
  const loading = false
  const $ = window.$
  useEffect(
    () => {
      /* global layer */
       layui.use('form', function () {
         //执行一个laydate实例
       $("#dep").empty();
          $('#dep').append(`<option value="">sds</option>`)
          console.log($('#dep'))
         for (let i = 0; i <deplist.length; i++) {
            console.log(deplist[i])
           $('#dep').append(`<option value=${deplist[i].id}>${deplist[i].name}</option>`);
         }
         form.render();
       });

      form.on('submit(formDemo)', function(data){
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        Submit()
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    }
  )
  //提交
  function Submit(values) {
    CreateBulletin.commit(
      props.environment,
      values.name,
      values.source,
      [],
      values.isNeedReceipt,
      values.receiptReq,
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
  };

  function goBack() {
    history.goBack()
  }

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card title="基本信息" style={{ marginTop: 10 }}>
      <div className='divline'></div>
        <form className="layui-form"  action="">
          <div className="layui-form-item" style={{ marginTop: '-20px',marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>公文名称</label>
              <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
                <input type="text" name="name" placeholder="请输入公文名称" required lay-verify="required" autoComplete="off" className="layui-input" />
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-70px',marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>公文来源</label>
              <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
                <input type="text" name="name" placeholder="请输入公文来源" required lay-verify="required" autoComplete="off" className="layui-input" />
{/*               <select name="source" id="dep" lay-verify="required">
                </select> */}
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-70px',marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 74 }}>回执</label>
              <div className="layui-input-block" style={{ marginLeft:'74px', marginTop:'-20px' }}>
                <input type="radio" name="isNeedReceipt" value="BULLETIN_IS_NEED_RECEIPT_NO" title="不需要" defaultChecked/>
                <input type="radio" name="isNeedReceipt" value="BULLETIN_IS_NEED_RECEIPT_YES" title="需要"/>
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-20px',marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>工作要求</label>
              <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
              <textarea name="receiptReq" placeholder="请输入内容" className="layui-textarea"></textarea>
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-70px',marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>附件上传</label>
              <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
                <Dragger {...uploadfile} style={{ minHeight:'250px' }}>
                  <p className="ant-upload-drag-icon" style={{ marginTop: '30px' }}>
                    <Icon type="upload" />
                  </p>
                  <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                  <p className="ant-upload-hint">支持文件扩展名：.rar .zip .doc .pdf .jpg...</p>
                </Dragger>
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-70px',marginLeft: '-80px' }}>
            <div className="layui-input-block" style={{ marginLeft:'30px' }}>
              <button className="layui-btn"  lay-submit="true" lay-filter="formDemo">确定</button>
              <button className="layui-btn layui-btn-primary" onClick={goBack} >取消</button>
            </div>
          </div>
        </form>
      </Card>
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
        query={query}
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
                  <AddMeeting2 environment={environment}  orgList={props.orgList} ref="children" />
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