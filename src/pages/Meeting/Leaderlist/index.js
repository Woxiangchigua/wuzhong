import React, { Component,useState } from 'react'
import Calendar from '../../../components/Calendar/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Tabs, Divider,Input } from 'antd';
import './index.css';
import Tabledeal from './components/Tabledeal/index'
import Tableme from './components/Tableme/index'
import { Link } from "react-router-dom";

const { Search } = Input;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const query = graphql`
    query Leaderlist_MeetingRoomListQuery{
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


function Lists(props) {
  const [searchKey, setSearchKey] = useState('');
  const [searchKey2, setSearchKey2] = useState('');
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
      default:
        break;
    }

  }
  return (
    <div>
      <Card bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px', float: 'left' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>领导会议页面</Breadcrumb.Item>
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
          <Tabledeal environment={environment}  searchKey={searchKey}/>
        </TabPane>
        <TabPane tab="我的待开会议" key="2">
          <Tableme environment={environment}  searchKey2={searchKey2}/>
        </TabPane>
      </Tabs>
    </div>
  )
  // }
}
export default Lists;
