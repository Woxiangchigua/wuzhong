import React from 'react';
import {
  Breadcrumb,
  Input,
  Steps,
  Badge,
  Descriptions,
  Card,
  Col,
  Table,
  Button,
  Modal,
  Timeline,
  Divider
} from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'
import {
  useHistory, Link
} from "react-router-dom";
import "./index.css"

const query = graphql`
  query Timeline_InstructDetailQuery($id:ID!){
    instructions(id:$id){
      id
      status
      policeToDoList{
        totalCount
        edges{
          askFor
          deadline
          grade
          id
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
      }
    }
  }`

function InstructDetail(props) {
  let history = useHistory();
  const Detail = props.insDetail.policeToDoList.edges;
  function goBack() {
    history.goBack()
  }
  var show = []
  for (let i in Detail){
    show.push(
      <Timeline.Item color={ Detail[i].status === "INSTRUCTIONSTODO_NOT" ? "red" : Detail[i].status === "INSTRUCTIONSTODO_YES" ? "green" : 
        Detail[i].status === "INSTRUCTIONSTODO_ASK" ? "" :Detail[i].status === "INSTRUCTIONSTODO_REJECT" ? "red" :"" }>
        <p>{Detail.status === "INSTRUCTIONSTODO_REJECT_NOT" ? '进行中' : Detail.status === "INSTRUCTIONSTODO_SUBMIT" ? '已完成' : 
          Detail.status === "INSTRUCTIONSTODO_YES" ? '进行中' : Detail.status === "INSTRUCTIONSTODO_ASK" ? '待批示' :
          Detail.status === "INSTRUCTIONSTODO_REPLY" ? '已批示' : Detail.status === "INSTRUCTIONSTODO_REJECT" ? '待处理' :
          Detail.status === "INSTRUCTIONSTODO_REJECT_OK" ? '已终止' : ''}
        </p>
        <p>{ "开始时间：" + dateFormat("YYYY-mm-dd", new Date(Detail[i].startTime)) }</p>
        <p>{ "指令要求：" + Detail[i].askFor }</p>
        <p>{ "请示内容：" + Detail[i].require }</p>
        <p>{ "回执内容：" + Detail[i].receiptReply }</p>
        <p>{ "驳回内容：" + Detail[i].reject }</p>
        <p>{ "截至时间：" + dateFormat("YYYY-mm-dd", new Date(Detail[i].deadline)) }</p>
      </Timeline.Item>
    )
  }
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px' }}>
          <Breadcrumb.Item>指令管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看指令进程</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Divider />
      <Card title="" bordered={false} >
        
      <Timeline>
          {show}
        </Timeline>
        
        <Col span={24} style={{ marginTop: "40px" }}>
          <Button type="primary" onClick={goBack} style={{ marginLeft: "48%" }}>
            关闭
            </Button>
        </Col>
      </Card>
    </div>
  );
}

function List(props) {
  const {id}=JSON.parse(props.id)
  const environment = props.environment;
  return (<QueryRenderer
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
          return <InstructDetail environment={environment} insDetail={props.instructions} id={props.id} />
        }
      }
      return <div>Loading</div>;
    }}
  />);
}

export default List;