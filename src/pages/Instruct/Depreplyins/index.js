import React, { useState,useEffect } from 'react';
import Depreply from '../Mutations/Depreply'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import ModalAddAttendees from '@/components/ModalAddAttendees';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'
import UploadFile from '../Mutations/Upload';
import './index.css';
import {
  Breadcrumb,
  Form,
  Input,
  Card,
  Col,
  Button,
  Descriptions,
  Badge,
  Select,
  Divider,
  DatePicker,Upload,Icon,message,
  Modal
} from 'antd';
const { Option } = Select;
const query = graphql`
query Depreplyins_ListQuery($id:ID!){
  instructions(id:$id){
    annex{
      name
      url
    }
    classify
    deadline
    hostDepartment
    id
    initiator
    isNeedReceipt
    jointlyDepartment
    kind
    name
    priority
    receiptAnnex{
      name
      url
    }
    receiptReply
    receiptReply
    require
    source
    sourceTime
    startDepartment
    startTime
    status
  }
}`
var childrenMsg = {}
function AddMeeting(props) {
  const id = props.instructions.id
  let history = useHistory();
  const Detail = props.instructions;
  var layui = window.layui
  var table = window.layui.table;
  var laydate = layui.laydate;
  var form = layui.form;
  const $ = window.$
  const environment = props.environment

  const data = [];
  var dataBak = [];
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
      init(data)
    /* global layer */
          layui.use(['form', 'laydate'], function () {
       //执行一个laydate实例
            form.render();
          });
          //提交
          form.on('submit(formDemo)', function(data){
            // console.log(dataBak)
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
            Submit(data.field)//提交
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
          });
        }
      )
    //提交
    function Submit(values) {
      Depreply.commit(
        props.environment,
        id,
        values.receiptReply,
        annex,
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
              history.push('/Instruct/Deplist')
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
  function init(data) {
    /* global layer */
    //第一个实例
  }
  const loading = false

  function goBack() {
    history.push('/Instruct/Deplist')
  }

  const { getFieldDecorator } = props.form;
  return (
    <>
    <Card title="基本信息" >
    <Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
          <Descriptions.Item label="指令名称">{Detail.name}</Descriptions.Item>
          <Descriptions.Item label="指令来源">{Detail.source}</Descriptions.Item>
          <Descriptions.Item label="指令分类">
            <span>
              {Detail.classify === "INSTRUCTIONS_CASE" ? '案件督导' : Detail.classify === "INSTRUCTIONS_NOTICE" ? '会议通知' : 
               Detail.classify === "INSTRUCTIONS_OTHERS" ? '其他' : Detail.classify === "INSTRUCTIONS_INFORM" ? '通知通报' :  Detail.classify === "INSTRUCTIONS_EMPHASIS" ? '重点人员下发' : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="指令发起人">
            <span>
              {Detail.initiator === 1 ? '王建国' :  ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="指令状态">
            <span>
              {Detail.status === "INSTRUCTIONS_DEPARTMENT_REJECT" ? '部门驳回' : Detail.status === "INSTRUCTIONS_POLICE_REJECT" ? '警员驳回' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_NOT_ISSUE" ? '分局未下发' : Detail.status === "INSTRUCTIONS_SUBOFFICE_ISSUE" ? '分局已批示' : 
               Detail.status === "INSTRUCTIONS_POLICE_ASK" ? '警员请示' :  Detail.status === "INSTRUCTIONS_DEPARTMENT_REPLY" ? '部门已回复' : 
               Detail.status === "INSTRUCTIONS_DEPARTMENT_ISSUE" ? '部门、派出所已批示' : Detail.status === "INSTRUCTIONS_POLICE_DISPOSE" ? '警员已处理' : 
               Detail.status === "INSTRUCTIONS_DEPARTMENT_ASK" ? '部门请示' :  ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="来源时间">{dateFormat("YYYY-mm-dd", new Date(Detail.sourceTime))}</Descriptions.Item>
          <Descriptions.Item label="开始时间">{dateFormat("YYYY-mm-dd", new Date(Detail.startTime))}</Descriptions.Item>
          <Descriptions.Item label="截至时间">{dateFormat("YYYY-mm-dd", new Date(Detail.deadline))}</Descriptions.Item>
          <Descriptions.Item label="回执">
            <span>
              {Detail.isNeedReceipt === "INSTRUCTIONS_NOT_NEED" ? '不需要回执' : Detail.isNeedReceipt === "INSTRUCTIONS_NEED" ? '需要回执' : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="发起部门">{Detail.startDepartment}</Descriptions.Item>
          <Descriptions.Item label="主办部门">{Detail.hostDepartment}</Descriptions.Item>
          <Descriptions.Item label="协办部门">{Detail.jointlyDepartment.join('，')}</Descriptions.Item>
        </Descriptions>
        <Descriptions size="small" column={2} style={{ marginTop: "20px" }}>
          <Descriptions.Item label="回执内容">{Detail.receiptReply}</Descriptions.Item>
          <Descriptions.Item label="工作要求">{Detail.require}</Descriptions.Item>
        </Descriptions>
        </Card>
        <Card title="回执信息">
        <form className="layui-form"  action="">
          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>回执内容</label>
              <div className="layui-input-block" style={{ width:'612px' }}>
                <textarea name="receiptReply" placeholder="请输入回执内容" className="layui-textarea"></textarea>
              </div>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>附件上传</label>
              <div className="layui-input-block" style={{ width:'612px' }}>
                 <Upload {...uploadlist}>
                  <Button>点击上传</Button>
                </Upload>
              </div>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-input-block">
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">提交</button>
              <button className="layui-btn layui-btn-primary" onClick={goBack}>取消</button>
            </div>
          </div>
        </form>
        </Card>
      <script type="text/html" id="bar">
        <button type='button' lay-event="bao" className='layui-btn layui-btn-success layui-btn-xs'>
          <i className="layui-icon">&#xe640;</i>保存
        </button>
        <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
          <i className="layui-icon">&#xe640;</i>删除
        </button>
      </script>
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
          <Breadcrumb.Item>指令管理</Breadcrumb.Item>
          <Breadcrumb.Item>指令回执</Breadcrumb.Item>
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
            if (props.instructions) {
              return (
                <>
                  <AddMeeting2 environment={environment} instructions={props.instructions} id={props.id} ref="children" />
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