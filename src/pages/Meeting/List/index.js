import React, { Component, useState } from 'react'
import Calendar from '../../../components/CalendarQuery/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Input, Tabs, } from 'antd';
import './index.css';
import TableAwait from './components/TableAwait/index'
import TableOccupy from './components/TableOccupy/index'
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
    meetingList: this.props.meetingList.edges.map(function (edge, index) {
      return {
        title: edge.meetingName,
        start: new Date(edge.beginTime),
        end: new Date(edge.endTime),
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
    }

  }

  return (

    <div  style={{ backgroundColor: '#f0f2f5' }}>
      <Card bordered={false} >
        <Breadcrumb>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>管理人员会议主页</Breadcrumb.Item>
        </Breadcrumb>
        {/* <ButtonGroup style={{ margin: '10px 0px', marginLeft: '75%' }}>
          <Link to={"/Meeting/Creatmeeting"}>
            <Button>会议申请</Button>
          </Link>
          <Button>会议纪要</Button>
        </ButtonGroup> */}
      </Card>
      <Card bordered={false} style={{ marginTop: 10 }}>
        <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }} tabBarExtraContent={operations}>
          <TabPane tab="全部审批" key="1">
            <TableAwait environment={environment} searchKey={searchKey} />
          </TabPane>
          <TabPane tab="待批会议" key="2">
            <TableTODOAll environment={environment} searchKey2={searchKey2} />
          </TabPane>
          <TabPane tab="已批会议" key="3">
            <TableOccupy environment={environment} searchKey3={searchKey3} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
  // }
}
export default Lists;
