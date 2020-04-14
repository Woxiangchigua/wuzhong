import React, { useState,useEffect } from 'react';
import CreateInstruct from '../Mutations/CreateInstruct'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import ModalAddAttendees from '@/components/ModalAddAttendees';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import UploadFile from '../Mutations/Upload';
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
query Createinstruct_OrgListListQuery{
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
  var laydate = layui.laydate;
  var rate = layui.rate;
  const environment = props.environment
  const deplist = props.orgList.edges
  const loading = false
  const $ = window.$
  var stars = ''
  var  typelist = [
    {value:'INSTRUCTIONS_CASE',name:'案件督导'},
    {value:'INSTRUCTIONS_NOTICE',name:'会议通知'},
    {value:'INSTRUCTIONS_OTHERS',name:'其他'},
    {value:'INSTRUCTIONS_INFORM',name:'通知通报'},
    {value:'INSTRUCTIONS_EMPHASIS',name:'重点人员下发'},
  ]
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
      layui.use(['form', 'laydate'], function () {
         //执行一个laydate实例
        //来源时间
        laydate.render({
          elem: '#test1',
        });
        //截至时间
        laydate.render({
          elem: '#test2',
        });
        //开始时间
        laydate.render({
          elem: '#test3',
        });
        rate.render({
          elem: '#star'
          ,value: 2 //初始值
          ,text: true //开启文本
          // ,half: true //开启半星
          ,choose: function(value){
            // if(value > 4) alert( '么么哒' )
            stars = value
            console.log(stars)
          }
        });
        //指令来源
       $("#dep").empty();
       $('#dep').append(`<option value=""></option>`)
         for (let i = 0; i <deplist.length; i++) {
           $('#dep').append(`<option value=${deplist[i].name}>${deplist[i].name}</option>`);
         }
  //发起部门
   $("#startdep").empty();
   $('#startdep').append(`<option value=""></option>`)
       for (let i = 0; i <deplist.length; i++) {
       $('#startdep').append(`<option value=${deplist[i].name}>${deplist[i].name}</option>`);
       }
//主办部门
       $("#hostdep").empty();
       $('#hostdep').append(`<option value=""></option>`)
       for (let i = 0; i <deplist.length; i++) {
          $('#hostdep').append(`<option value=${deplist[i].name}>${deplist[i].name}</option>`);
        }
//指令分类
       $("#fenlei").empty();
       $('#fenlei').append(`<option value=""></option>`)
             for (let i = 0; i <typelist.length; i++) {
          $('#fenlei').append(`<option value=${typelist[i].value}>${typelist[i].name}</option>`);
        }
//协办部门
        $("#org").empty();
        for (let i = 0; i < deplist.length; i++) {
          $('#org').append(`<input type="checkbox" value=${deplist[i].name} name="org${i}" lay-skin="primary" title=${deplist[i].name} />`);
        }
          form.render();
       });
//提交
      form.on('submit(formDemo)', function(data){
        console.log(stars)
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        let field = data.field
        let orgIds = []
        for (let i = 0; i < deplist.length; i++) {
          if (field[`org${i}`]) {
            orgIds.push(field[`org${i}`])
          }
        }
        field.orgIds = orgIds
        Submit(data.field)
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
      form.on('submit(formdist)', function(data){
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        let field = data.field
        let orgIds = []
        for (let i = 0; i < deplist.length; i++) {
          if (field[`org${i}`]) {
            orgIds.push(field[`org${i}`])
          }
        }
        field.orgIds = orgIds
        distSubmit(data.field)
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    }
  )
  //提交
  function Submit(values) {
    //来源时间
    let onedate = values.sourceTime
    let sourceTime = new Date(onedate).toISOString()
    //开始时间
    let huidate = values.startTime
    let startTime = new Date(huidate).toISOString()
    //截至时间
    let twodate = values.deadline
    let deadline = new Date(twodate).toISOString()
    CreateInstruct.commit(
      props.environment,
      values.classify,
      values.orgIds,
      sourceTime,
      'INSTRUCTIONS_SUBOFFICE_NOT_ISSUE',  //指令状态，分局未下发
      deadline,
      annex,
      values.isNeedReceipt,
      values.source,
      values.hostDepartment,
      1,
      values.require,
      0,
      values.name,
      values.startDepartment,
      startTime,
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
            history.push('/Instruct/List')
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
  //下发
  function distSubmit(values) {
    //来源时间
    let onedate = values.sourceTime
    let sourceTime = new Date(onedate).toISOString()
    //开始时间
    let huidate = values.startTime
    let startTime = new Date(huidate).toISOString()
    //截至时间
    let twodate = values.deadline
    let deadline = new Date(twodate).toISOString()
    CreateInstruct.commit(
      props.environment,
      values.classify,
      values.orgIds,
      sourceTime,
      'INSTRUCTIONS_SUBOFFICE_ISSUE',  //指令状态，分局未下发
      deadline,
      annex,
      values.isNeedReceipt,
      values.source,
      values.hostDepartment,
      1,
      values.require,
      0,
      values.name,
      values.startDepartment,
      startTime,
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
            history.push('/Instruct/List')
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
//返回
  function goBack() {
    history.goBack()
  }
	 function check(){  
    alert(111)
  }  
	
  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card title="基本信息" style={{ marginTop: 10 }}>
      <div className='divline'></div>
        <form className="layui-form"  action="">
          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>指令名称</label>
              <div className="layui-input-block">
                <input type="text" name="name" required lay-verify="required" autoComplete="off" className="layui-input" style={{ width: 405 }}/>
              </div>
            </div>
						<div className="layui-inline">
						  <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>指令分类</label>
						  <div className="layui-input-block">
						  <select name="classify" id="fenlei" required lay-verify="required" lay-search="" placeholder="请选择指令分类"></select>
						  </div>
						</div>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>指令来源</label>
              <div className="layui-input-block">
              <select name="source" id="dep" required lay-verify="required" lay-search="" placeholder="请选择指令来源"></select>
              </div>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>发起部门</label>
              <div className="layui-input-block">
                <select name="startDepartment" id="startdep" required lay-verify="required" lay-search="" placeholder="请选择发起部门"></select>
              </div>
            </div>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>主办部门</label>
              <div className="layui-input-block">
                <select name="hostDepartment" id="hostdep" required lay-verify="required" lay-search="" placeholder="请选择主办部门"></select>
              </div>
            </div>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>协办部门</label>
              <div className="layui-input-block" id='org' style={{ width: 700 }}>
              </div>
            </div>
          </div>
					<div className="layui-form-item">
					  <div className="layui-inline">
					    <label className="layui-form-label" style={{ width: 100 }}>来源时间</label>
					    <div className="layui-input-block">
					      <input type="text" name="sourceTime" className="layui-input" id="test1" placeholder="请选择来源时间"/>
					    </div>
					  </div>
					  <div className="layui-inline">
					    <label className="layui-form-label" style={{ width: 100 }}>开始时间</label>
					    <div className="layui-input-block">
					      <input type="text" name="startTime" className="layui-input" id="test3" placeholder="请选择开始时间"/>
					    </div>
					  </div>
					  <div className="layui-inline">
					    <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>截至时间</label>
					    <div className="layui-input-block">
					      <input type="text" name="deadline" className="layui-input" id="test2"  required lay-verify="required"placeholder="请选择截至时间"/>
					    </div>
					  </div>
					  {/* <div className="layui-inline">
					    <label className="layui-form-label" style={{ width: 100 }}>评分</label>
					    <div className="layui-input-block">
					      <div name="xing" id="star"></div>
					    </div>
					  </div> */}
					</div>
          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>指令要求</label>
              <div className="layui-input-block" style={{ width:'612px' }}>
                <textarea name="require" placeholder="请输入指令要求" required lay-verify="required" className="layui-textarea"></textarea>
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
					  <div className="layui-inline">
					    <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>是否回执</label>
					    <div className="layui-input-block">
					      <input type="radio" name="isNeedReceipt" value="INSTRUCTIONS_NOT_NEED" title="不需要" defaultChecked/>
					      <input type="radio" name="isNeedReceipt" value="INSTRUCTIONS_NEED" onClick={check} title="需要"/>
					    </div>
					  </div>
					</div>
          <div className="layui-form-item">
            <div className="layui-input-block">
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">保存</button>
              <button className="layui-btn" lay-submit="true" lay-filter="formdist">下发</button>
              <button className="layui-btn layui-btn-primary" onClick={goBack}>取消</button>
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
          <Breadcrumb.Item>指令管理</Breadcrumb.Item>
          <Breadcrumb.Item>新增指令</Breadcrumb.Item>
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