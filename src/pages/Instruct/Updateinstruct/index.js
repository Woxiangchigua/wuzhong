import React, { useState, useEffect } from 'react';
import Updateinstruct from '../Mutations/Updateinstruct'
import Calendar from '../../../components/CalendarUpdate/index'
import { useHistory } from "react-router-dom";
import dateFormat from '../../../ utils/dateFormat'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import './index.css';
import {Breadcrumb,Card,Modal,message,Upload,Button,} from 'antd';
import { Form, Mention } from '@ant-design/compatible';
import UploadFile from '../Mutations/Upload';
import moment from 'moment';
import ModalAddAttendees from '@/components/ModalAddAttendees';

const data = [];

const query = graphql`
    query Updateinstruct_InstructListQuery($id:ID!){
      orgList(first:100000,skip:0){
        edges{
          id,
          name,
        }
      }
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
        require
        source
        sourceTime
        startDepartment
        startTime
				receiptRequire
        status
      }
    }`
var childrenMsg = {}
function AddMeeting(props) {
  console.log(props)
  let history = useHistory();
  const [modalAddAttendeesVisible, setModalAddAttendeesVisible] = useState(false);
  const environment = props.environment
  const insid = props.insid
  var layui = window.layui
  var rate = layui.rate;
  var tree = layui.tree;
  var form = layui.form;
  var laydate = layui.laydate;
  var table = window.layui.table;
  let orgList = props.orgList.edges
  const deplist = props.orgList.edges
  const Detail = props.Detail
  const $ = window.$
  var stars = ''
  var  typelist = [
    {value:'INSTRUCTIONS_INFORM',name:'通知通报'},
    {value:'INSTRUCTIONS_EMPHASIS',name:'重点人员下发'},
    {value:'INSTRUCTIONS_CASE',name:'事件督导'},
    {value:'INSTRUCTIONS_NOTICE',name:'会议通知'},
    {value:'INSTRUCTIONS_OTHERS',name:'其他'},
  ]
  var newdep = []
  for (let i = 0; i < orgList.length; i++) {
    for (let n = 0; n < Detail.jointlyDepartment.length; n++) {
      if (orgList[i].name === Detail.jointlyDepartment[n]) {
        newdep.push(orgList[i].name)
      }
    }
  }
  var data1 = [{
    title: '分局部门'
    ,children: [{
      title: '办公室'
    },{
      title: '政治处'
    },{
      title: '监察室'
    },{
      title: '指挥中心'
    },{
      title: '巡特警大队'
    },{
      title: '交警大队'
    }]
  },{
    title: '下辖派出所'
    ,children: [{
      title: '东山所'
    },{
      title: '郭巷所'
    },{
      title: '临湖所'
    },{
      title: '木渎所'
    },{
      title: '横泾所'
    },{
      title: '甪直所'
    },]
  }]
  
	var  sourcelist = [
	  {name:'市局官网'},
	  {name:'维稳平台'},
	  {name:'省厅通知'},
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
    () => {
      /* global layer */
      layui.use(['form', 'laydate', 'tree',], function () {
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
      tree.render({
        elem: '#treedep'
        ,data: data1
        ,showLine: false  //是否开启连接线
        ,showCheckbox: true //是否开启复选框
        ,oncheck: function(obj){
          // console.log(obj.data); //得到当前点击的节点数据
          // console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
          // console.log(obj.elem); //得到当前节点元素
          newdep.push(obj.data.title)
          if(obj.data.children && obj.checked == true){
            for (var i = 0; i < obj.data.children.length; i++) {
              newdep.push(obj.data.children[i].title)
            }
          }
          if(obj.data.children && obj.checked == false){
            newdep = []
          }
          for (var i = 0; i < newdep.length; i++) {
            for (var j = i + 1; j < newdep.length; j++) {
              if (newdep[i] == newdep[j]) {
                //第一个等同于第二个，splice方法删除第二个
                newdep.splice(j, 1);
                j--
              }
            }
          }
          if(obj.checked == false){
            for (var i = 0; i < newdep.length; i++) {
              if (newdep[i] == obj.data.title) {
                //第一个等同于第二个，splice方法删除第二个
                newdep.splice(i, 1);
                i--
              }
            }
          }
        }
      });
      //指令来源
     $("#dep").empty();
     $('#dep').append(`<option value=""></option>`)
       for (let i = 0; i <sourcelist.length; i++) {
         $('#dep').append(`<option value=${sourcelist[i].name}>${sourcelist[i].name}</option>`);
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

			$("#need").on('focus',function(){
				$(".hide").css("display","block")
			})
			$("#noneed").on('focus',function(){
				$(".hide").css("display","none")
			})
			
      form.on('submit(formDemo)', function (data) {
        let field = data.field
        let orgIds = []
        for (let i = 0; i < deplist.length; i++) {
          if (field[`org${i}`]) {
            orgIds.push(field[`org${i}`])
          }
        }
        field.orgIds = orgIds
        Submit(field)
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
			form.on('submit(formdist)', function (data) {
			  let field = data.field
			  let orgIds = []
			  for (let i = 0; i < deplist.length; i++) {
			    if (field[`org${i}`]) {
			      orgIds.push(field[`org${i}`])
			    }
			  }
			  field.orgIds = orgIds
			  DistSubmit(field)
			  return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
			});
      let detail = JSON.parse(JSON.stringify(Detail))
      detail.sourceTime = dateFormat("YYYY-mm-dd", new Date(Detail.sourceTime))
      detail.startTime = dateFormat("YYYY-mm-dd", new Date(Detail.startTime))
      detail.deadline = dateFormat("YYYY-mm-dd", new Date(Detail.deadline))
      for (let i = 0; i < orgList.length; i++) {
        for (let n = 0; n < detail.jointlyDepartment.length; n++) {
          if (orgList[i].name === detail.jointlyDepartment[n]) {
            detail[`org${i}`] = "on"
          }
        }
      }
      // $('#reportUnit').attr('value',detail.reportUnit)
      form.val("formDemo", detail);
    }
  )

  function Submit(values) {
    console.log(newdep)
    return;
    let id = insid.id
    //来源时间
    let onedate = values.sourceTime
    let sourceTime = new Date(onedate).toISOString()
    //开始时间
    let huidate = values.startTime
    let startTime = new Date(huidate).toISOString()
    //截至时间
    let twodate = values.deadline
    let deadline = new Date(twodate).toISOString()
    Updateinstruct.commit(
      props.environment,
      id,
      values.classify,
      newdep,
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
			values.receiptRequire,
      (response, errors) => {
        if (errors) {
          console.log(errors)
          /* global layer */
          layer.alert(errors[0].message,{title:'错误',icon: 2} ,function(index){
            //do something
            layer.close(index);
          }); 
        } else {
          console.log(response);
          /* global layer */
          layer.alert('编辑成功',{title:'成功',icon: 1} ,function(index){
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
	
	function DistSubmit(values) {
	  let id = insid.id
	  //来源时间
	  let onedate = values.sourceTime
	  let sourceTime = new Date(onedate).toISOString()
	  //开始时间
	  let huidate = values.startTime
	  let startTime = new Date(huidate).toISOString()
	  //截至时间
	  let twodate = values.deadline
	  let deadline = new Date(twodate).toISOString()
	  Updateinstruct.commit(
	    props.environment,
	    id,
	    values.classify,
      newdep,
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
			values.receiptRequire,
	    (response, errors) => {
	      if (errors) {
	        console.log(errors)
	        /* global layer */
	        layer.alert(errors[0].message,{title:'错误',icon: 2} ,function(index){
	          //do something
	          layer.close(index);
	        }); 
	      } else {
	        console.log(response);
	        /* global layer */
	        layer.alert('编辑成功',{title:'成功',icon: 1} ,function(index){
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
	
  function goBack() {
    // if(insid.bian === 2){
    //   history.push('/Instruct/Deplist/')
    // }else{
      history.push('/Instruct/List/')
    // }
  }
	
  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card title="填写会议室预订表" style={{ marginTop: 10 }}>
        <form className="layui-form" lay-filter="formDemo" action="">
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
						{/* <div className="layui-inline">
							<label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>协办部门</label>
							<div className="layui-input-block" id='org' style={{ width: 700 }}>
							</div>
						</div> */}
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>协办部门</label>
              <div id="treedep" className="demo-tree demo-tree-box"></div> 
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
					    <div className="layui-input-block allhide">
					      <input type="radio" name="isNeedReceipt" value="INSTRUCTIONS_NOT_NEED" id="noneed" title="不需要" defaultChecked/>
					      <input type="radio" name="isNeedReceipt" value="INSTRUCTIONS_NEED" id="need" title="需要"/>
					    </div>
							<div className="layui-input-block" style={{ width:'612px' }}>
                <textarea name="receiptRequire"  placeholder="请输入回执内容" className="layui-textarea hide"></textarea>
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

        <script type="text/html" id="bar">
          <button type='button' lay-event="go" className='layui-btn layui-btn-normal layui-btn-xs'>
            <i className="layui-icon">&#xe6b2;</i>编辑
                </button>
          <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
            <i className="layui-icon">&#xe640;</i>删除
                </button>
        </script>
      </Card>
    </>
  )
}

const AddMeeting2 = Form.create({ name: 'horizontal_login' })(AddMeeting)

function Home(props) {
  const {id}=JSON.parse(props.id)
  const insid =JSON.parse(props.id)
  const environment = props.environment;

  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 15px 0px' }}>
          <Breadcrumb.Item>指令管理</Breadcrumb.Item>
          <Breadcrumb.Item>编辑指令</Breadcrumb.Item>
        </Breadcrumb>
      </Card>

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
                  <AddMeeting2 environment={environment}  Detail={props.instructions} insid={insid} orgList={props.orgList}  id={props.id} bian={props.bian} ref="children"  />
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