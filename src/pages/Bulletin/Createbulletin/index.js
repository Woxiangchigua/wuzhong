import React, { useState,useEffect } from 'react';
import CreateBulletin from '../Mutations/CreateBulletin'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import ModalAddAttendees from '@/components/ModalAddAttendees';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import UploadFile from '../Mutations/Uploadbull';
import './index.css';
import {
  Breadcrumb,
  Form,
  Input,
  Card,
  Col,
  Button,
  Divider,Upload,Icon,message,
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

var childrenMsg = {}
function AddMeeting(props) {
  let history = useHistory();
  var layui = window.layui
  var form = layui.form;
  const environment = props.environment
  const deplist = props.orgList.edges
  const loading = false
  const $ = window.$
  var annex= []
  const uploadlist = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload(file, fileList) {
      console.log("beforeUpload:", file, fileList);
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      const inputs = { [filename]: null }
      const uploadables = { [filename]: file }
      UploadFile.commit(
        props.environment,
        inputs,
        uploadables,
        (response, errors) => {
          if (errors) {
            onError(errors, response);
          } else {
            onSuccess(response);
          }
        },
        onError
      )
      return false;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const list = info.fileList
        for(let i in list){
          annex.push({name:list[i].response.singleUpload.id,url:list[i].response.singleUpload.url})
        }
        for (var i = 0; i < annex.length; i++) {
          for (var j = i + 1; j < annex.length; j++) {
            if (annex[i].name == annex[j].name) {
              //第一个等同于第二个，splice方法删除第二个
              annex.splice(j, 1);
              j--;
            }
          }
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(
    () => {
      /* global layer */
      layui.use('form', function () {
         //执行一个laydate实例
       $("#dep").empty();
       $('#dep').append(`<option value=""></option>`)
          console.log($('#dep'))
         for (let i = 0; i <deplist.length; i++) {
                      $('#dep').append(`<option value=${deplist[i].name}>${deplist[i].name}</option>`);
         }
          form.render();
       });

        form.on('submit(formDemo)', function(data){
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        Submit(data.field)
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
      annex,
      values.isNeedReceipt,
      values.receiptReq,
      (response, errors) => {
        if (errors) {
          /* global layer */
          layer.alert(errors[0].message,{title:'错误',icon: 2} ,function(index){
            //do something
            layer.close(index);
          });
        } else {
          layer.alert('提交成功',{title:'成功',icon: 1} ,function(index){
            //do something
            history.push('/Bulletin/List')
            layer.close(index);
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
              <label className="layui-form-label" style={{ width: 110 }}>公文名称<span style={{color:'red'}}>*</span></label>
              <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
                <input type="text" name="name" placeholder="请输入公文名称" required lay-verify="required" autoComplete="off" className="layui-input" />
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-70px',marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 110 }}>公文来源<span style={{color:'red'}}>*</span></label>
              <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
              <select name="source" id="dep" lay-verify="required">
                </select>
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
               <Upload {...uploadlist}>
                  <Button>点击上传</Button>
                </Upload>
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