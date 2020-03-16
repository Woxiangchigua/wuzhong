import React, { useState,useEffect } from 'react';
import Distribution from '../Mutations/Distribution'
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
query Distribution_OrgListListQuery($id:ID!){
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
      id
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
var childrenMsg = {}
function AddMeeting(props) {
  const id = props.bulletin.id
  let history = useHistory();
  const Detail = props.bulletin;
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
        () => {
      init(data)
    /* global layer */
          layui.use(['form', 'laydate'], function () {
       //执行一个laydate实例
            laydate.render({
              elem: '#test1',
            });
            //给下拉选择框动态赋值
            $('#dep').empty();
            $('#dep').append(`<option value=""></option>`)
            for (let i = 0; i <deplist.length; i++) {
              $('#dep').append(`<option value=${deplist[i].name}>${deplist[i].name}</option>`);
            }
            form.render();
          });
          //修改当前行
          table.on('edit(test)', function(obj){
            var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
          });
          //行点击事件
          table.on('tool(test)', function (obj) {
            let index = obj.data.id//获取到当前行的index
            var data = obj.data;
            if (obj.event === 'del') {
              layer.confirm('真的删除行么', function (index) {
                obj.del(obj); //删除对应行（tr）的DOM结构
                layer.close(index);
              });
            }
            //表格里的下拉选择赋值
            if(obj.event === 'depselect'){
              form.on('select(depId)', function(selectdata){
                console.log(selectdata.elem); //得到select原始DOM对象
                console.log(selectdata.value); //得到被选中的值
                console.log(selectdata.othis); //得到美化后的DOM对象
                dataBak[index].depId = selectdata.value
              });
            }
            //表格里的下拉选择赋值
            if(obj.event === 'huiselect'){
              form.on('select(isNeedReceipt)', function(selectdata){
                console.log(selectdata.elem); //得到select原始DOM对象
                console.log(selectdata.value); //得到被选中的值
                console.log(selectdata.othis); //得到美化后的DOM对象
                dataBak[index].isNeedReceipt = selectdata.value
              });
            }
            //保存当前行
            if (obj.event === 'bao') {
              //给当前行赋值
              dataBak[index].recedate = obj.data.recedate
              dataBak[index].receiptReq = obj.data.receiptReq
              table.reload("idTest",{
                data:dataBak   // 将新数据重新载入表格
              })
              console.log(data)
            }
            //表格里的时间控件
            var datedata = obj.datedata;
            var newdatedata = {};
            if (obj.event === 'date') {
              var field = $(this).data('field');
              laydate.render({
                elem: this.firstChild
                , show: true //直接显示
                , closeStop: this
                , done: function (value, date) {
                  newdatedata[field] = value;
                  obj.update(newdatedata);
                }
              });
            }
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
      var newdata =[]
      for(let i in dataBak){
        newdata.push({
          "depId":dataBak[i].depId,
          "isNeedReceipt":dataBak[i].isNeedReceipt,
          "receiptReq":dataBak[i].receiptReq,
        })
      }
      // console.log(newdata)
      let huidate = values.deadline
      let deadline = new Date(huidate).toISOString()
      // return;
      Distribution.commit(
        props.environment,
        deadline,
        newdata,
        id,
        0,
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
              history.push('/Bulletin/Bulldist')
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
    table.render({
      id: 'idTest',
      elem: '#demo',
      size: "",
      // url: '', //数据接口
      data: data
      , cols: [[ //表头 
        // { field: 'id', title: '#', width: 130 , }
        , { field: 'depId', title: '部门', width: 200, event:'depselect', templet: '#org2' }
        , { field: 'isNeedReceipt', title: '回执', width: 130, event:'huiselect', templet: '#selectSex' }
        , { field: 'recedate', title: '回执时间', width: 150, event: 'date', data_field: "recedate"}
        , { field: 'receiptReq', title: '工作要求', edit: 'text' }
        , { field: '', title: "操作", align: "center", toolbar: "#bar", width: 150, edit: 'text' }
      ]],
      //表格里的时间控件
      datedata: [{
        recedate: '',
      }],
      //给表格的下拉选择框赋值
      done: function (res, curr, count) {
        $('#org').empty();
        $('#org').append(`<option value=""></option>`)
        for (let i = 0; i <deplist.length; i++) {
          $('#org').append(`<option value=${deplist[i].id}>${deplist[i].name}</option>`);
        }
        form.render('select');
      },
    });
  }
  //新增可编辑行
  function needopen() {
     dataBak = [];
    var tableBak = table.cache.idTest; 
    for (var i = 0; i < tableBak.length; i++) {
        dataBak.push(tableBak[i]);      //将之前的数组备份
    }
    //新增一行
    dataBak.push({
      "id": dataBak.length,
      "depId":'',
      "isNeedReceipt":'',
      "recedate":'',
      "receiptReq":''
    })
    table.reload("idTest",{
      done: function (res, curr, count) {
        // 渲染之前组装select的option选项值 
        layui.each($("select[name='depId']"), function (index, item) {
            var elem = $(item);
            elem.val(elem.data('value'));
        });
        layui.each($("select[name='isNeedReceipt']"), function (index, item) {
          var elem = $(item);
          elem.val(elem.data('value'));
        });
        form.render('select');
      },
      data:dataBak   // 将新数据重新载入表格
    })
  }
  const loading = false

  function goBack() {
    history.push('/Bulletin/List')
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
              {Detail.sponsorUserId === 'user-1' ? '王建国' :  ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{dateFormat("YYYY-mm-dd HH:MM", new Date(Detail.createdAt))}</Descriptions.Item>
          <Descriptions.Item label="归档状态">
            <Badge
                status={Detail.status === 'BULLETIN_ARCHIVED' ? 'success' : Detail.status === 'BULLETIN_UNASSIGNED' ? 'error' : Detail.status === 'BULLETIN_NOT_ARCHIVED' ? 'warning' : ''}
                text={Detail.status === 'BULLETIN_ARCHIVED' ? '已归档' : Detail.status === 'BULLETIN_UNASSIGNED' ? '未分发' : Detail.status === 'BULLETIN_NOT_ARCHIVED' ? '已分发未归档' : ''} />
          </Descriptions.Item>
        </Descriptions>
        </Card>
        <Card title="分发信息">
          <form className="layui-form"  action="">
            <div className="layui-form-item" style={{ marginTop: '-20px',marginLeft: '-75px' }}>
              <div className="layui-inline">
                <label className="layui-form-label" style={{ width: 110 }}>截至时间<span style={{color:'red'}}>*</span></label>
                <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
                  <input type="text" name="deadline" className="layui-input" id="test1" placeholder="请选择截至日期" required lay-verify="required"/>
                </div>
              </div>
  {/*             <div className="layui-inline">
                <label className="layui-form-label" style={{ width: 100 }}>分发部门</label>
                <div className="layui-input-block" style={{ marginLeft:'30px',width:'612px' }}>
                <select name="source" id="dep" lay-verify="required" lay-filter="source" xm-select="source" xm-select-type="1">
                  </select>
                </div>
              </div> */}
            </div>
            <div className="layui-form-item">
              <div className="topBtn">
                <div>
                  <button type="button" onClick={needopen} lay-event="need" className="layui-btn layui-btn-sm" style={{float:"left"}}>新增分发</button>
                </div>
              </div>
              <div style={{clear:"both"}}></div>
              <table id="demo" lay-filter="test"></table>
            </div>
            <div className="layui-form-item" style={{ marginTop: '-70px',marginLeft: '-80px' }}>
              <div className="layui-input-block" style={{ marginLeft:'30px' }}>
                <button className="layui-btn"  lay-submit="true" lay-filter="formDemo">确定</button>
                <button className="layui-btn layui-btn-primary" onClick={goBack} >取消</button>
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
  
      <script type="text/html" id="org2">
        <select name="depId" id="org" lay-filter="depId" lay-verify="required" lay-search='' data-value="{{d.depId}}"> </select>
      </script>

      <script type="text/html" id="selectSex">
        <select name='isNeedReceipt' lay-filter='isNeedReceipt' lay-search='' data-value="{{d.isNeedReceipt}}">
          <option value="BULLETIN_DISTRIBUTION_IS_NEED_RECEIPT_NO">不需要</option>
          <option value="BULLETIN_DISTRIBUTION_IS_NEED_RECEIPT_YES">需要</option>
        </select>
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
          <Breadcrumb.Item>公文管理</Breadcrumb.Item>
          <Breadcrumb.Item>公文分发</Breadcrumb.Item>
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
                  <AddMeeting2 environment={environment} orgList={props.orgList} bulletin={props.bulletin} id={props.id} ref="children" />
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