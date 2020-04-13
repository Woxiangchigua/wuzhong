import React, { useState,useEffect } from 'react';
import Score from '../Mutations/Score'
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
  DatePicker,Upload,Icon,
  Modal
} from 'antd';
const { Option } = Select;
const query = graphql`
query Policescore_ListQuery($id:ID!){
  queryPoliceToDo(id:$id){
    askFor
    deadline
    id
    instructions{
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
    receiptAnnex{
      name
      url
    }
    receiptReply
    reject
    require
    startTime
    status
  }
}`
var childrenMsg = {}
function AddMeeting(props) {
  const id = props.queryPoliceToDo.id
  const listid = props.queryPoliceToDo.instructions.id
  console.log(listid)
  let history = useHistory();
  const Detail = props.queryPoliceToDo;
  var layui = window.layui
  var table = window.layui.table;
  var laydate = layui.laydate;
  var rate = layui.rate;
  var form = layui.form;
  const $ = window.$
  const environment = props.environment
  var stars = ''

  const data = [];
  var dataBak = [];
  useEffect(
        () => {
      init(data)
    /* global layer */
          layui.use(['form', 'laydate'], function () {
       //执行一个laydate实例
            form.render();
          });
          rate.render({
            elem: '#star'
            ,value: 0 //初始值
            ,text: true //开启文本
            // ,half: true //开启半星
            ,choose: function(value){
              // if(value > 4) alert( '么么哒' )
              stars = value
              console.log(stars)
            }
          });
          //提交
          form.on('submit(formDemo)', function(data){
            // console.log(dataBak)
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
            Submit(data.field,stars)//提交
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
          });
        }
      )
    //提交
    function Submit(values,stars) {
      Score.commit(
        props.environment,
        stars,
        id,
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
              history.goBack()
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

  // function goBack() {
  //   history.push('/Instruct/Policechild')
  // }

  const { getFieldDecorator } = props.form;
  return (
    <>
    <Card title="基础信息" bordered={false} >
    <Descriptions size="small" column={4}>
      <Descriptions.Item label="指令状态">
        <span>
          {Detail.status === "INSTRUCTIONSTODO_NOT" ? '未完成' : Detail.status === "INSTRUCTIONSTODO_YES" ? '已完成' : 
          Detail.status === "INSTRUCTIONSTODO_ASK" ? '警员请示' : Detail.status === "INSTRUCTIONSTODO_REJECT" ? '警员反驳' : ''}
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="开始时间">{dateFormat("YYYY-mm-dd", new Date(Detail.startTime))}</Descriptions.Item>
      <Descriptions.Item label="截至时间">{dateFormat("YYYY-mm-dd", new Date(Detail.deadline))}</Descriptions.Item>
    </Descriptions>
    <Descriptions size="small" column={2} style={{ marginTop: "20px" }}>
      <Descriptions.Item label="回执内容">{Detail.receiptReply}</Descriptions.Item>
      <Descriptions.Item label="工作要求">{Detail.require}</Descriptions.Item>
      <Descriptions.Item label="驳回内容">{Detail.reject}</Descriptions.Item>
    </Descriptions>
  </Card>
    <Card title="原指令详情" >
    <Descriptions size="small" column={4}>
            <Descriptions.Item label="指令名称">{Detail.instructions.name}</Descriptions.Item>
            <Descriptions.Item label="指令来源">{Detail.instructions.source}</Descriptions.Item>
            <Descriptions.Item label="指令分类">
              <span>
                {Detail.instructions.classify === "INSTRUCTIONS_CASE" ? '案件督导' : Detail.instructions.classify === "INSTRUCTIONS_NOTICE" ? '会议通知' : 
                Detail.instructions.classify === "INSTRUCTIONS_OTHERS" ? '其他' : Detail.instructions.classify === "INSTRUCTIONS_INFORM" ? '通知通报' :
                Detail.instructions.classify === "INSTRUCTIONS_EMPHASIS" ? '重点人员下发' : ''}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="指令发起人">
              <span>
                {Detail.instructions.initiator === 1 ? '王建国' :  ''}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="指令状态">
              <span>
                {Detail.instructions.status === "INSTRUCTIONS_DEPARTMENT_REJECT" ? '部门驳回' : Detail.instructions.status === "INSTRUCTIONS_POLICE_REJECT" ? '警员驳回' : 
                Detail.instructions.status === "INSTRUCTIONS_SUBOFFICE_NOT_ISSUE" ? '分局未下发' : Detail.instructions.status === "INSTRUCTIONS_SUBOFFICE_ISSUE" ? '分局已批示' : 
                Detail.instructions.status === "INSTRUCTIONS_POLICE_ASK" ? '警员请示' :  Detail.instructions.status === "INSTRUCTIONS_DEPARTMENT_REPLY" ? '部门已回复' : 
                Detail.instructions.status === "INSTRUCTIONS_DEPARTMENT_ISSUE" ? '部门、派出所已批示' : Detail.instructions.status === "INSTRUCTIONS_POLICE_DISPOSE" ? '警员已处理' : 
                Detail.instructions.status === "INSTRUCTIONS_DEPARTMENT_ASK" ? '部门请示' :  ''}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="来源时间">{dateFormat("YYYY-mm-dd", new Date(Detail.instructions.sourceTime))}</Descriptions.Item>
            <Descriptions.Item label="开始时间">{dateFormat("YYYY-mm-dd", new Date(Detail.instructions.startTime))}</Descriptions.Item>
            <Descriptions.Item label="截至时间">{dateFormat("YYYY-mm-dd", new Date(Detail.instructions.deadline))}</Descriptions.Item>
            <Descriptions.Item label="回执">
              <span>
                {Detail.instructions.isNeedReceipt === "INSTRUCTIONS_NOT_NEED" ? '不需要回执' : Detail.instructions.isNeedReceipt === "INSTRUCTIONS_NEED" ? '需要回执' : ''}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="发起部门">{Detail.instructions.startDepartment}</Descriptions.Item>
            <Descriptions.Item label="主办部门">{Detail.instructions.hostDepartment}</Descriptions.Item>
            <Descriptions.Item label="协办部门">{Detail.instructions.jointlyDepartment.join('，')}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="small" column={2} style={{ marginTop: "20px" }}>
            <Descriptions.Item label="回执内容">{Detail.instructions.receiptReply}</Descriptions.Item>
            <Descriptions.Item label="工作要求">{Detail.instructions.require}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="评分信息">
        <form className="layui-form"  action="">
          <div className="layui-form-item">
            <div className="layui-inline">
            <label className="layui-form-label" style={{ width: 100 }}>评分</label>
              <div className="layui-input-block">
                <div name="xing" id="star"></div>
              </div>
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-input-block">
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">提交</button>
              {/* <button className="layui-btn layui-btn-primary" onClick={goBack}>取消</button> */}
            </div>
          </div>
        </form>
        </Card>
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
          <Breadcrumb.Item>指令评分</Breadcrumb.Item>
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
            if (props.queryPoliceToDo) {
              return (
                <>
                  <AddMeeting2 environment={environment} queryPoliceToDo={props.queryPoliceToDo} id={props.id} ref="children" />
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