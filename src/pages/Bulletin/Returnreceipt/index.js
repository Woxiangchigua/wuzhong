import React, { useState, useEffect } from 'react';
import Returnreceipt from '../Mutations/Returnreceipt'
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
  Divider, Upload, Icon,
  DatePicker,
  Modal
} from 'antd';
const { Option } = Select;
const query = graphql`
query Returnreceipt_OrgListListQuery($id:ID!){
  orgList(first:100000,skip:0){
    edges{
      id,
      name,
    }
  }
  bulletin(id:$id){
    annex{
      name,
      url
  },
  bulletinDistribution{
      id,
      bulletinId,
      createdAt,
      depId,
      depReviewId,
      depClerkId,
      isNeedReceipt,
      isReview,
      needReview,
      receiptReply,
      receiptReq,
      status,
  },
  id,
  name,
  createdAt,
  isNeedReceipt,
  source,
  status,
  priority,
  sponsorUserId
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
  const id = props.bulletin.id
  let history = useHistory();
  const Detail = props.bulletin;
  var dist = []

  for (let i in Detail.bulletinDistribution) {
    if (props.distid == Detail.bulletinDistribution[i].id) {
      dist.distdepId = Detail.bulletinDistribution[i].depId;
      dist.distdepReviewId = Detail.bulletinDistribution[i].depReviewId;
      dist.distdepClerkId = Detail.bulletinDistribution[i].depClerkId;
      dist.diststatus = Detail.bulletinDistribution[i].status;
      dist.distisNeedReceipt = Detail.bulletinDistribution[i].isNeedReceipt;
      dist.distisReview = Detail.bulletinDistribution[i].isReview;
      dist.distneedReview = Detail.bulletinDistribution[i].needReview;
      dist.distreceiptReply = Detail.bulletinDistribution[i].receiptReply;
    }
  }
  // Detail.push({dist})
  // console.log(Detail)
  var layui = window.layui
  var table = window.layui.table;
  var laydate = layui.laydate;
  var form = layui.form;
  const $ = window.$
  const environment = props.environment

  const deplist = props.orgList.edges
  const children = deplist.map(function (edge, index) {
    return (
      <Option value={edge.id} key={edge.id}>
        {edge.name}
      </Option>
    )
  })

  const data = [];
  var dataBak = [];
  useEffect(
    () => {
      /* global layer */
      layui.use(['form', 'laydate'], function () {
        //执行一个laydate实例
        laydate.render({
          elem: '#test1',
        });
        //给下拉选择框动态赋值
        $('#dep').empty();
        $('#dep').append(`<option value=""></option>`)
        for (let i = 0; i < deplist.length; i++) {
          $('#dep').append(`<option value=${deplist[i].name}>${deplist[i].name}</option>`);
        }
        form.render();
      });
      //提交
      form.on('submit(formDemo)', function (data) {
        // console.log(dataBak)
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        Submit(data.field)//提交
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    }
  )
  //提交
  function Submit(values) {
    // var newdata =[]
    // for(let i in dataBak){
    //   newdata.push({
    //     "depId":dataBak[i].depId,
    //     "isNeedReceipt":dataBak[i].isNeedReceipt,
    //     "receiptReq":dataBak[i].receiptReq,
    //   })
    // }
    // // console.log(newdata)
    // let huidate = values.deadline
    // let deadline = new Date(huidate).toISOString()
    return;
    // Returnreceipt.commit(
    //   props.environment,
    //   deadline,
    //   newdata,
    //   id,
    //   0,
    //   (response, errors) => {
    //     if (errors) {
    //       /* global layer */
    //       layer.alert(errors[0].message,{title:'错误',icon: 2} ,function(index){
    //         //do something
    //         layer.close(index);
    //       });
    //     } else {
    //       layer.alert('提交成功',{title:'成功',icon: 1} ,function(index){
    //         //do something
    //         history.push('/Bulletin/Bulldist')
    //         layer.close(index);
    //       });

    //     }
    //   },
    //   (response, errors) => {
    //     if (errors) {
    //       console.log(errors)
    //     } else {
    //       console.log(response);
    //     }
    //   }
    // );
  };
  const loading = false

  function goBack() {
    history.push('/Bulletin/Bulldist')
  }

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Card title="基本信息" >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="公文名称">{Detail.name}</Descriptions.Item>
          <Descriptions.Item label="公文来源">{Detail.source}</Descriptions.Item>
          <Descriptions.Item label="公文发起人">
            <span>
              {Detail.sponsorUserId === 'user-1' ? '王建国' : ''}
            </span>
          </Descriptions.Item>
          {/* <Descriptions.Item label="创建时间">{dateFormat("YYYY-mm-dd HH:MM", new Date(Detail.createdAt))}</Descriptions.Item> */}
          <Descriptions.Item label="部门">
            <span>
              {dist.distdepId === 'dep-1' ? 'rootOrg' : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="主管">
            <span>
              {dist.distdepReviewId === 'user-0' ? '张队' : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="部门">
            <span>
              {dist.distdepClerkId === 'user-0' ? '李警官' : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="回执">
            <Badge
              status={dist.distisNeedReceipt === 'BULLETIN_DISTRIBUTION_IS_NEED_RECEIPT_NO' ? 'default' : dist.distisNeedReceipt === 'BULLETIN_DISTRIBUTION_IS_NEED_RECEIPT_YES' ? 'success' : ''}
              text={dist.distisNeedReceipt === 'BULLETIN_DISTRIBUTION_IS_NEED_RECEIPT_NO' ? '无需' : dist.distisNeedReceipt === 'BULLETIN_DISTRIBUTION_IS_NEED_RECEIPT_YES' ? '需要' : ''} />
          </Descriptions.Item>
          <Descriptions.Item label="签字审核">
            <Badge
              status={dist.distneedReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_NO' ? 'default' : dist.distneedReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_YES' ? 'success' : ''}
              text={dist.distneedReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_NO' ? '无需' : dist.distneedReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_YES' ? '需要' : ''} />
          </Descriptions.Item>
          <Descriptions.Item label="审核">
            <Badge
              status={dist.distisReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_YES' ? 'success' : dist.distisReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_NO' ? 'error' : ''}
              text={dist.distisReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_YES' ? '已审' : dist.distisReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_NO' ? '未审' : ''} />
          </Descriptions.Item>
          <Descriptions.Item label="归档状态">
            <Badge
              status={dist.diststatus === 'BULLETIN_DISTRIBUTION_ARCHIVED' ? 'success' : dist.diststatus === 'BULLETIN_DISTRIBUTION_UNASSIGNED' ? 'error' : dist.diststatus === 'BULLETIN_DISTRIBUTION_NOT_ARCHIVED' ? 'warning' : dist.diststatus === 'BULLETIN_DISTRIBUTION_DEP_ARCHIVED' ? 'processing' : ''}
              text={dist.diststatus === 'BULLETIN_DISTRIBUTION_ARCHIVED' ? '办公室归档' : dist.diststatus === 'BULLETIN_DISTRIBUTION_UNASSIGNED' ? '未处理' : dist.diststatus === 'BULLETIN_DISTRIBUTION_NOT_ARCHIVED' ? '未归档（处理中）' : dist.diststatus === 'BULLETIN_DISTRIBUTION_DEP_ARCHIVED' ? '部门已归档' : ''} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="回执信息">
        <form className="layui-form" action="">
          <div className="layui-form-item" style={{ marginTop: '-20px', marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>回执内容</label>
              <div className="layui-input-block" style={{ marginLeft: '30px', width: '612px' }}>
                <textarea name="receiptReq" placeholder="请输入内容" className="layui-textarea"></textarea>
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-50px', marginLeft: '-75px' }}>
            <div className="layui-inline">
              <label className="layui-form-label" style={{ width: 100 }}>附件上传</label>
              <div className="layui-input-block" style={{ marginLeft: '30px', width: '612px' }}>
                <Dragger {...uploadfile} style={{ minHeight: '250px' }}>
                  <p className="ant-upload-drag-icon" style={{ marginTop: '30px' }}>
                    <Icon type="upload" />
                  </p>
                  <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                  <p className="ant-upload-hint">支持文件扩展名：.rar .zip .doc .pdf .jpg...</p>
                </Dragger>
              </div>
            </div>
          </div>
          <div className="layui-form-item" style={{ marginTop: '-70px', marginLeft: '-80px' }}>
            <div className="layui-input-block" style={{ marginLeft: '30px' }}>
              <button className="layui-btn" lay-submit="true" lay-filter="formDemo">确定</button>
              <button className="layui-btn layui-btn-primary" onClick={goBack} >取消</button>
            </div>
          </div>
        </form>
      </Card>
    </>
  )
}

const AddMeeting2 = Form.create({ name: 'horizontal_login' })(AddMeeting)

function Home(props) {
  const { id, distid } = JSON.parse(props.id, props.distid)
  // const {distid}=JSON.parse(props.distid)
  const environment = props.environment;
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 15px 0px' }}>
          <Breadcrumb.Item>公文管理</Breadcrumb.Item>
          <Breadcrumb.Item>公文回执</Breadcrumb.Item>
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
                  <AddMeeting2 environment={environment} orgList={props.orgList} bulletin={props.bulletin} id={id} distid={distid} ref="children" />
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