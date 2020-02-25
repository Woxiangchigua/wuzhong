import React, { Component, useState } from 'react'
import Calendar from '../../../components/CalendarQuery/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Tabs, Divider, Input } from 'antd';
import './index.css';
import TableAwait from './components/TableAwait1/index'
import TableTODO from './components/TableTODO1/index'
import TableTODOAll from './components/TableTODOAll1/index'
import {
  useHistory,Link
} from "react-router-dom";
const { Search } = Input;

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const query = graphql`
    query Applicant_MeetingRoomListQuery{
        meetingRoomList{
        edges{
            id,
            name
        }
        }
    }`

class AddMeeting extends Component {
  state = {
    environment: this.props.environment,
    resourceMap: this.props.meetingRoomList.edges.map(function (edge, index) {
      return { 'resourceId': edge.id, 'resourceTitle': edge.name }
    }),
    loading: false,
  };
  render() {
    return (
      <div style={{ height: 500 }}>
        <Calendar resourceMap={this.state.resourceMap} />
      </div>
    )
  }
}



function callback(key) {
  console.log(key);
}

function Lists(props) {
  const [searchKey, setSearchKey] = useState('');
  const [searchKey2, setSearchKey2] = useState('');
  const [searchKey3, setSearchKey3] = useState('');
  const environment = props.environment;
  const operations = <Search
    placeholder="输入会议名称"
    onSearch={search}
    style={{ width: 200 }}
  />;
  let defaultActiveKey = "1"
  function callback(key) {
  
    defaultActiveKey = key
    console.log(defaultActiveKey);
  }
  
  function search(value) {
    switch (defaultActiveKey) {
      case "1":
        setSearchKey(value)
        break;
      case "2":
        setSearchKey2(value)
        break;
      case "3":
        setSearchKey3(value)
        break;
      default:
        break;
    }
  
  }
  return (
    <div>
      <Card bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px', float: 'left' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>会议室预定表</Breadcrumb.Item>
        </Breadcrumb>
        <ButtonGroup style={{ margin: '10px 0px', marginLeft: '75%' }}>
        <Link to={"/Meeting/Creatmeeting"}>
          <Button>会议申请</Button>
          </Link>
          <Button>会议纪要</Button>
        </ButtonGroup>
      </Card>
      <div className={'divclear'}></div>
      <QueryRenderer
        environment={environment}
        query={query
        }
        render={({ error, props, retry }) => {
          if (error) {
            return (
              <div>
                <h1>Error!</h1><br />{error.message}
              </div>)
          } else if (props) {
            if (props.meetingRoomList) {
              return (
                <AddMeeting environment={environment} meetingRoomList={props.meetingRoomList} />

              )
            }
          }
          return <div>Loading</div>;
        }}
      />
      <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }} tabBarExtraContent={operations}>
        <TabPane tab="待处理" key="1">
          <TableAwait environment={environment} searchKey={searchKey}/>
        </TabPane>
        <TabPane tab="全部待开会议" key="2">
          <TableTODOAll environment={environment} searchKey2={searchKey2}/>
        </TabPane>
        <TabPane tab="我的待开会议" key="3">
          <TableTODO environment={environment} searchKey3={searchKey3}/>
        </TabPane>
      </Tabs>
    </div>
  )
  // }
}
export default Lists;
