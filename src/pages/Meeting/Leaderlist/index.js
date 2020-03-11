import React, { Component,useState } from 'react'
import Calendar from '../../../components/Calendar/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Tabs, Divider,Input } from 'antd';
import './index.css';
import Tabledeal from './components/Tabledeal/index'
import Tableme from './components/Tableme/index'
import Tablewait from './components/Tablewait/index'
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
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card bordered={false} >
        <Breadcrumb>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>领导会议页面</Breadcrumb.Item>
        </Breadcrumb>
        {/* <ButtonGroup style={{ margin: '10px 0px', marginLeft: '75%' }}>
        <Link to={"/Meeting/Creatmeeting"}>
            <Button>会议申请</Button>
          </Link>
          <Button>会议纪要</Button>
        </ButtonGroup> */}
      </Card>
      <Card bordered={false} style={{marginTop:10}}>
      <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }} tabBarExtraContent={operations}>
        <TabPane tab="全部会议" key="1">
          <Tabledeal environment={environment}  searchKey={searchKey}/>
        </TabPane>
        <TabPane tab="待审会议" key="2">
          <Tableme environment={environment}  searchKey2={searchKey2}/>
        </TabPane>
				 <TabPane tab="待开会议" key="3">
				  <Tablewait environment={environment}  searchKey3={searchKey3}/>
				</TabPane>
      </Tabs>
      </Card>
    </div>
  )
  // }
}
export default Lists;
