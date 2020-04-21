import React, { Component, useState } from 'react'
import Asslist from '../Assdep/components/Asslist/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Input, Tabs,Table,Divider,Modal } from 'antd';
import './index.css';
import {
  useHistory, Link
} from "react-router-dom";
const { Search } = Input;
const ButtonGroup = Button.Group;


function Lists(props) {
  const environment = props.environment;

  return (
    
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <Card bordered={false} >
        <Breadcrumb style={{ margin: '15px 0px', float: 'left' }}>
          <Breadcrumb.Item>指令管理</Breadcrumb.Item>
          <Breadcrumb.Item>协办部门指令列表</Breadcrumb.Item>
        </Breadcrumb>
        {/* <ButtonGroup style={{ margin: '10px 0px', marginLeft: '80%' }}>
          <Link to={"/Instruct/DepCreateinstruct"}>
            <Button>新增指令</Button>
          </Link>
        </ButtonGroup> */}
      </Card>
      <Card title="" bordered={false} style={{marginTop:10}}>
        <Asslist environment={environment} />
      </Card>
    </div>
  )
}
export default Lists;
