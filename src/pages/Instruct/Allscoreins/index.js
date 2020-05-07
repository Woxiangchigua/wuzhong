import React, { useState,useEffect } from 'react';
import Allscore from '../Mutations/Allscore'
import Calendar from '../../../components/Calendar/index'
import { useHistory } from "react-router-dom";
import ModalAddAttendees from '@/components/ModalAddAttendees';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'
import './index.css';
import {
  Breadcrumb,
  Input,
  Card,
  Col,
  Button,
  Descriptions,
  Badge,
  Select,
  Divider,
  DatePicker,Upload,
  Modal
} from 'antd';
import {Icon}  from '@ant-design/compatible';
import { Form, Mention } from '@ant-design/compatible';
const { Option } = Select;
const query = graphql`
query Allscoreins_InstructDetailQuery($id:ID!){
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
  const id = props.Detail.id
  let history = useHistory();
  const Detail = props.Detail;
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
        () => {
      init(data)
    /* global layer */
          layui.use(['form', 'laydate'], function () {
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
          form.on('submit(formDemo)', function(data){
            // console.log(dataBak)
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
            Submit(data.field,stars)//提交
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
          });
        }
      )
    //提交
    function Submit(values,stars) {
      Allscore.commit(
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
    <Card title="指令详情" >
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
        <Card title="评分信息">
        <form className="layui-form"  action="">
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
              {/* <button className="layui-btn layui-btn-primary" onClick={goBack}>取消</button> */}
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
            if (props) {
              return (
                <>
                  <AddMeeting2 environment={environment} Detail={props.instructions} id={props.id} ref="children" />
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