import React, { Component, useState } from 'react'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Tabs, Divider, Input } from 'antd';
import './index.css';
import TableAll from './components/TableAll/index'
import {
  useHistory, Link
} from "react-router-dom";
const { Search } = Input;

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const query = graphql`
    query Applicant_PreordainAboutMeMeetingListQuery(
      $beginTime: DateTime
      $endTime: DateTime
      ){
        meetingRoomList{
        edges{
            id,
            name
        }
        }
        preordainAboutMeMeetingList(
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



function Lists(props) {
  const [searchKey, setSearchKey] = useState('');
  const environment = props.environment;

  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 0px 0px' }}>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>会议过审及过往纪要</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      {/* <Divider /> */}

      <Card title="" bordered={false} style={{marginTop:10}}>
        <TableAll environment={environment} />
      </Card>
    </div>
  )
  // }
}
export default Lists;
