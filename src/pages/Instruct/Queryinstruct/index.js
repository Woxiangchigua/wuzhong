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
  Divider
} from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../ utils/dateFormat'
import {
  useHistory, Link
} from "react-router-dom";
import "./index.css"

const query = graphql`
  query Queryinstruct_InstructDetailQuery($id:ID!){
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

function InstructDetail(props) {
  let history = useHistory();
  const Detail = props.insDetail;
  function goBack() {
    history.goBack()
  }
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px' }}>
          <Breadcrumb.Item>指令管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看指令详情</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Divider />
      <Card title="" bordered={false} >
        <Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
          <Descriptions.Item label="指令名称">{Detail.name}</Descriptions.Item>
					<Descriptions.Item label="指令状态">
					  <span>
            {Detail.status === "INSTRUCTIONS_DEPARTMENT_ISSUE" ? '进行中' : Detail.status === "INSTRUCTIONS_SUBOFFICE_CHECK" ? '待审核' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_REJECT_OK" ? '已终止' : Detail.status === "INSTRUCTIONS_DEPARTMENT_ASK_REPLY" ? '已批示' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_AFFIRM" ? '已完成' : Detail.status === "INSTRUCTIONS_SUBOFFICE_NOT_ISSUE" ? '未下发' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_ISSUE" ? '已下发' : Detail.status === "INSTRUCTIONS_DEPARTMENT_SUBMIT" ? '待确认' : 
               Detail.status === "INSTRUCTIONS_SUBOFFICE_REJECT_NOT" ? '驳回无效' : Detail.status === "INSTRUCTIONS_DEPARTMENT_ASK" ? '待批示' : ''}
					  </span>
					</Descriptions.Item>
				</Descriptions>
				<Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
					<Descriptions.Item label="指令分类">
					  <span>
					    {Detail.classify === "INSTRUCTIONS_CASE" ? '事件督导' : Detail.classify === "INSTRUCTIONS_NOTICE" ? '会议通知' : 
					     Detail.classify === "INSTRUCTIONS_OTHERS" ? '其他' : Detail.classify === "INSTRUCTIONS_INFORM" ? '通知通报' :  Detail.classify === "INSTRUCTIONS_EMPHASIS" ? '重点人员下发' : ''}
					  </span>
					</Descriptions.Item>
          <Descriptions.Item label="指令来源">{Detail.source}</Descriptions.Item>
					<Descriptions.Item label="指令发起人">
					  <span>
					    {Detail.initiator === "account-1" ? '王建国' :  ''}
					  </span>
					</Descriptions.Item>
				</Descriptions>
				<Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
					<Descriptions.Item label="发起部门">{Detail.startDepartment}</Descriptions.Item>
					<Descriptions.Item label="主办部门">{Detail.hostDepartment}</Descriptions.Item>
					<Descriptions.Item label="协办部门">{Detail.jointlyDepartment.join('，')}</Descriptions.Item>
				</Descriptions>
				<Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
          
          
          <Descriptions.Item label="来源时间">{dateFormat("YYYY-mm-dd", new Date(Detail.sourceTime))}</Descriptions.Item>
          <Descriptions.Item label="开始时间">{dateFormat("YYYY-mm-dd", new Date(Detail.startTime))}</Descriptions.Item>
          <Descriptions.Item label="截至时间">{dateFormat("YYYY-mm-dd", new Date(Detail.deadline))}</Descriptions.Item>
          
          
        </Descriptions>
        <Descriptions size="small" column={1} style={{ marginTop: "20px" }}>
					<Descriptions.Item label="指令要求">{Detail.require}</Descriptions.Item>
				</Descriptions>
				<Descriptions size="small" column={1} style={{ marginTop: "20px" }}>
					<Descriptions.Item label="回执">
						<span>
							{Detail.isNeedReceipt === "INSTRUCTIONS_NOT_NEED" ? '不需要回执' : Detail.isNeedReceipt === "INSTRUCTIONS_NEED" ? '需要回执' : ''}
						</span>
					</Descriptions.Item>
          <Descriptions.Item label="回执内容">{Detail.receiptRequire}</Descriptions.Item>
        </Descriptions>
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