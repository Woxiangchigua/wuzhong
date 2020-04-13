import React, { Component, useState } from 'react'
import NeedAudit from '../Mutations/Needaudit'
import Audit from '../Mutations/Audit'
import Tabledist from '../Bulldist/components/Tabledist/index'
import Deparchive from '../Mutations/Deparchive'
import Archivedist from '../Mutations/Archivedist'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Input, Tabs,Table,Divider,Modal } from 'antd';
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";
const { Search } = Input;
const ButtonGroup = Button.Group;

const query = graphql`
query Bulldist_BulldistListQuery( 
  $order: String = ""
  $name: String = ""
  $source: String = ""
  $status: [enumTypeBulletinDistributionStatus]!
  $needReview: [enumTypeBulletinDistributionNeedReview]!
  $isReview: [enumTypeBulletinDistributionIsReview]!
){
  bulletinDistributionList(first:100000,skip:0,order:$order,name:$name,source:$source,status:$status,needReview:$needReview,isReview:$isReview){
    edges{
      id,
      bulletinId,
      bulletin{
        name,
        source
      },
      depId,
      depReviewId,
      depClerkId,
      isReview,
      needReview,
      status
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
          <Breadcrumb.Item>公文分发列表</Breadcrumb.Item>
        </Breadcrumb>
        <ButtonGroup style={{ margin: '10px 0px', marginLeft: '80%' }}>
          <Link to={"/Bulletin/Createbulletin"}>
            <Button>新增公文</Button>
          </Link>
        </ButtonGroup>
      </Card>
      <Card title="" bordered={false} style={{marginTop:10}}>
        <Tabledist environment={environment} />
      </Card>
    </div>
  )
}
export default Lists;
