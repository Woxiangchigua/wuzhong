import React, { Component, useState } from 'react'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Tabs, Divider, Input } from 'antd';
import './index.css';
import Tableone from './components/Tableone/index'
import Tabletwo from './components/Tabletwo/index'
import {
  useHistory, Link
} from "react-router-dom";
const { Search } = Input;

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}


function Lists(props) {
  const [searchKey, setSearchKey] = useState('');
  const environment = props.environment;

  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card title="" bordered={false} >
        <Breadcrumb style={{ margin: '0px 0px 0px 0px' }}>
          <Breadcrumb.Item>公文管理</Breadcrumb.Item>
          <Breadcrumb.Item>公安情报</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      {/* <Divider /> */}

      <Card title="" bordered={false} style={{marginTop:10}}>
        <Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane tab="公安情报" key="1">
						<Tableone />
					</TabPane>
					<TabPane tab="巡防指导" key="2">
						<Tabletwo />
					</TabPane>
				</Tabs>
				
      </Card>
    </div>
  )
  // }
}
export default Lists;
