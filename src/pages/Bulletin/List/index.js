import React, { Component, useState } from 'react'
import Archive from '../Mutations/Archive'
import Tablelist from '../List/components/Tablelist/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Input, Tabs,Table,Divider,Modal } from 'antd';
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";
const { Search } = Input;
const ButtonGroup = Button.Group;

const query = graphql`
query List_BulletinListQuery( 
  $order: String = ""
  $name: String = ""
  $source: String = ""
  $status: [enumTypeBulletinStatus]!
){
  bulletinList(first:100000,skip:0,order:$order,name:$name,source:$source,status:$status){
    edges{
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
    totalCount
  }
}`

function Lists(props) {
  const environment = props.environment;

  return (
    
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px', float: 'left' }}>
          <Breadcrumb.Item>公文管理</Breadcrumb.Item>
          <Breadcrumb.Item>公文列表</Breadcrumb.Item>
        </Breadcrumb>
        <ButtonGroup style={{ margin: '10px 0px', marginLeft: '85%' }}>
          <Link to={"/Bulletin/Createbulletin"}>
            <Button>新增公文</Button>
          </Link>
        </ButtonGroup>
      </Card>
      <Card title="" bordered={false} style={{marginTop:10}}>
        <Tablelist environment={environment} />
      </Card>
    </div>
  )
}
export default Lists;
