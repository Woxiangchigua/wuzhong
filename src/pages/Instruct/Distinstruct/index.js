import React, { useState,useEffect } from 'react';
import Deplist from '../Mutations/Depdist'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import ModalAddAttendees from '@/components/ModalAddAttendees';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'
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
  DatePicker,
  Modal
} from 'antd';
const { Option } = Select;
const query = graphql`
query Distinstruct_ListQuery($id:ID!){
  accounts{
    edges{
      username
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
  const insid = props.insid
  const id = props.instructions.id
  let history = useHistory();
  const Detail = props.instructions;
  var layui = window.layui
  var table = window.layui.table;
  var laydate = layui.laydate;
  var tree = layui.tree;
  var form = layui.form;
  const $ = window.$
  const environment = props.environment

  const policelist = props.accounts.edges

  const data = [];
  var dataBak = [];
  var newdep = []
  var data1 = [{
    title: '分局部门'
    ,children: [{
      title: '办公室'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '政治处'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '监察室'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '指挥中心'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '巡特警大队'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '交警大队'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    }]
  },{
    title: '下辖派出所'
    ,children: [{
      title: '东山所'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '郭巷所'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '临湖所'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '木渎所'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '横泾所'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },{
      title: '甪直所'
      ,children: [{
        title: '管理人员'
      },{
        title: '申请人'
      },{
        title: '普通用户'
      },{
        title: '内勤'
      }]
    },]
  }]
  
  useEffect(
        () => {
      init(data)
    /* global layer */
          layui.use(['form', 'laydate', 'tree',], function () {
       //执行一个laydate实例
            laydate.render({
              elem: '#test1',
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
        //责任民警
        $("#police").empty();
        for (let i = 0; i < policelist.length; i++) {
          $('#police').append(`<input type="checkbox" value=${policelist[i].username} name="org${i}" lay-skin="primary" title=${policelist[i].username} />`);
        }
            form.render();
          });
          //提交
          form.on('submit(formDemo)', function(data){
            // console.log(dataBak)
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
            let field = data.field
            let disposePeople = []
            for (let i = 0; i < policelist.length; i++) {
              if (field[`org${i}`]) {
                disposePeople.push(field[`org${i}`])
              }
            }
            field.disposePeople = disposePeople
            Submit(data.field)//提交
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
          });
        }
      )
    //提交
    function Submit(values) {
      Deplist.commit(
        props.environment,
        values.require,
        id,
        newdep,
        "INSTRUCTIONSTODO_MAIN",
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
                history.push('/Instruct/Deplist/')
              // if(insid.listid == 1){
              //   history.push('/Instruct/Deplist/')
              // }else if(insid.listid == 2){
              //   history.push('/Instruct/Assdep/')
              // }
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
    history.push('/Instruct/Deplist/')
    // if(insid.listid == 1){
    //   history.push('/Instruct/Deplist/')
    // }else if(insid.listid == 2){
    //   history.push('/Instruct/Assdep/')
    // }
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
              {Detail.classify === "INSTRUCTIONS_CASE" ? '事件督导' : Detail.classify === "INSTRUCTIONS_NOTICE" ? '会议通知' : 
               Detail.classify === "INSTRUCTIONS_OTHERS" ? '其他' : Detail.classify === "INSTRUCTIONS_INFORM" ? '通知通报' :  Detail.classify === "INSTRUCTIONS_EMPHASIS" ? '重点人员下发' : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="指令发起人">
            <span>
              {Detail.initiator === "account-1" ? '王建国' :  ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="指令状态">
            <span>
              {Detail.status === "INSTRUCTIONS_DEPARTMENT_ISSUE" ? '进行中' : Detail.status === "INSTRUCTIONS_SUBOFFICE_CHECK" ? '待审核' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_REJECT_OK" ? '已终止' : Detail.status === "INSTRUCTIONS_DEPARTMENT_ASK_REPLY" ? '已批示' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" ? '已完成' : Detail.status === "INSTRUCTIONS_SUBOFFICE_NOT_ISSUE" ? '未下发' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_ISSUE" ? '已下发' : Detail.status === "INSTRUCTIONS_DEPARTMENT_SUBMIT" ? '待确认' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_REJECT_NOT" ? '进行中' : Detail.status === "INSTRUCTIONS_DEPARTMENT_ASK" ? '待批示' : ''}
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
        <Card title="下发信息">
        <form className="layui-form"  action="">
          <div className="layui-form-item">
            {/* <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>责任民警</label>
              <div className="layui-input-block" id='police' style={{ width: 700 }}>
            </div> */}
              <label className="layui-form-label" style={{ width: 100 }}><span style={{ color: 'red', marginRight: 4 }}>*</span>责任民警</label>
              <br/>
              <br/>
              <div id="treedep" className="demo-tree demo-tree-box"></div>
          </div>
          <div className="layui-form-item">
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>指令要求</label>
              <div className="layui-input-block" style={{ width:'612px' }}>
                <textarea name="require" placeholder="请输入指令要求" className="layui-textarea"></textarea>
              </div>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-input-block">
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">提交</button>
              <button className="layui-btn layui-btn-primary" onClick={goBack}>取消</button>
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
  const insid =JSON.parse(props.id)
  const environment = props.environment;
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 15px 0px' }}>
          <Breadcrumb.Item>指令管理</Breadcrumb.Item>
          <Breadcrumb.Item>指令下发</Breadcrumb.Item>
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
            if (props.accounts) {
              return (
                <>
                  <AddMeeting2 environment={environment} accounts={props.accounts} instructions={props.instructions} insid={insid} id={props.id} ref="children" />
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