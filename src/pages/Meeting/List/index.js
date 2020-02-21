import React, { Component } from 'react'
import Calendar from '../../../components/CalendarQuery/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Tabs, Divider } from 'antd';
import './index.css';
import TableAwait from './components/TableAwait/index'
import TableOccupy from './components/TableOccupy/index'
import TableTODO from './components/TableTODO/index'
import TableTODOAll from './components/TableTODOAll/index'

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const query = graphql`
    query List_MeetingRoomListQuery{
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
  const environment = props.environment;
  return (
    <div>
      <Card bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px', float: 'left' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>会议室预定表</Breadcrumb.Item>
        </Breadcrumb>
        <ButtonGroup style={{ margin: '10px 0px', marginLeft: '75%' }}>
          <Button>会议申请</Button>
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
      <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }}>
        <TabPane tab="待处理" key="1">
          <TableAwait environment={environment} />
        </TabPane>
        <TabPane tab="全部待开会议" key="2">
          <TableTODOAll environment={environment} />
        </TabPane>
        <TabPane tab="占用中" key="3">
          <TableOccupy environment={environment} />
        </TabPane>
        <TabPane tab="我的待开会议" key="4">
          <TableTODO environment={environment} />
        </TabPane>
      </Tabs>
    </div>
  )
  // }
}
export default Lists;
