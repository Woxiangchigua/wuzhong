import React, { Component, useState } from 'react'
import Calendar from '../../../components/CalendarQuery/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Input, Tabs, } from 'antd';
import './index.css';
import TableAwait from './components/TableAwait/index'
import TableOccupy from './components/TableOccupy/index'
import TableTODO from './components/TableTODO/index'
import TableTODOAll from './components/TableTODOAll/index'
import {
  useHistory, Link
} from "react-router-dom";
const { Search } = Input;
const { TextArea } = Input;

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const query = graphql`
    query List_MeetingRoomListQuery(
      $beginTime: DateTime
      $endTime: DateTime
      ){
        meetingRoomList{
        edges{
            id,
            name
        }
        }
        preordainMeetingList(
          beginTime: $beginTime,
          endTime: $endTime
          ){
            edges{
              applyUserId,
              beginTime,
              endTime,
              meetingName,
              meetingRoomId
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
    meetingList:this.props.meetingList.edges.map(function (edge, index) {
      return { 
        title: edge.meetingName,
        start: edge.beginTime,
        end: edge.endTime,
        resourceId: edge.meetingRoomId,
       }
    }),
    
  };
  render() {
    return (
      <div style={{ height: 500 }}>
        <Calendar resourceMap={this.state.resourceMap} events={this.state.meetingList} />
      </div>
    )
  }
}







function Lists(props) {
  const [searchKey, setSearchKey] = useState('');
  const [searchKey2, setSearchKey2] = useState('');
  const [searchKey3, setSearchKey3] = useState('');
  const [searchKey4, setSearchKey4] = useState('');
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
      case "4":
        setSearchKey4(value)
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
        query={query}
        variables={{
          beginTime:new Date(new Date().toLocaleDateString()).toISOString(),
          endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).toISOString()
        }}
        render={({ error, props, retry }) => {
          if (error) {
            return (
              <div>
                <h1>Error!</h1><br />{error.message}
              </div>)
          } else if (props) {
            if (props.meetingRoomList) {
              return (
                <AddMeeting environment={environment} meetingRoomList={props.meetingRoomList} meetingList={props.preordainMeetingList} />

              )
            }
          }
          return <div>Loading</div>;
        }}
      />
      <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }} tabBarExtraContent={operations}>
        <TabPane tab="待处理" key="1">
          <TableAwait environment={environment} searchKey={searchKey} />
        </TabPane>
        <TabPane tab="全部待开会议" key="2">
          <TableTODOAll environment={environment} searchKey2={searchKey2} />
        </TabPane>
        <TabPane tab="占用中" key="3">
          <TableOccupy environment={environment} searchKey3={searchKey3} />
        </TabPane>
        <TabPane tab="我的待开会议" key="4">
          <TableTODO environment={environment} searchKey4={searchKey4} />
        </TabPane>
      </Tabs>
    </div>
  )
  // }
}
export default Lists;
