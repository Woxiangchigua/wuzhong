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
query Querybulletin_BulletinDetailQuery($id:ID!){
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
        source,
        status,
        priority,
        sponsorUserId
    }
  }`

function BulletinDetail(props) {
  let history = useHistory();
  const Detail = props.bullDetail;
  function goBack() {
    history.goBack()
  }
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px' }}>
          <Breadcrumb.Item>公文管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看公文详情</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Divider />
      <Card title="" bordered={false} >
        <Descriptions size="small" column={4} style={{ marginTop: "20px" }}>
          <Descriptions.Item label="公文名称">{Detail.name}</Descriptions.Item>
          <Descriptions.Item label="公文来源">{Detail.source}</Descriptions.Item>
          <Descriptions.Item label="公文发起人">
            <span>
              {Detail.sponsorUserId === 'user-1' ? '王建国' :  ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="归档状态">
            <Badge
                status={Detail.status === 'BULLETIN_ARCHIVED' ? 'success' : Detail.status === 'BULLETIN_UNASSIGNED' ? 'error' : Detail.status === 'BULLETIN_NOT_ARCHIVED' ? 'warning' : ''}
                text={Detail.status === 'BULLETIN_ARCHIVED' ? '已归档' : Detail.status === 'BULLETIN_UNASSIGNED' ? '未分发' : Detail.status === 'BULLETIN_NOT_ARCHIVED' ? '已分发未归档' : ''} />
          </Descriptions.Item>
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
        if (props.bulletin) {
          return <BulletinDetail environment={environment} bullDetail={props.bulletin} id={props.id}/>
        }
      }
      return <div>Loading</div>;
    }}
  />);
}

export default List;