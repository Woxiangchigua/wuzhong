import React, { Component, useState } from 'react'
import Archive from '../Mutations/Archive'
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
  bulletinList(first:10,skip:0,order:$order,name:$name,source:$source,status:$status){
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

const columns = [
  {
    title: '公文id',
    dataIndex: 'id',
    key: 'id',
    className: 'tabcolums'
  },
  {
    title: '公文名称',
    dataIndex: 'name',
    key: 'name',
    className: 'tabcolums'
  },
  {
    title: '公文来源',
    dataIndex: 'source',
    key: 'source',
    className: 'tabcolums'
  },
  {
    title: '公文发起人',
    dataIndex: 'sponsorUserId',
    key: 'sponsorUserId',
    className: 'tabcolums'
  },
  {
    title: '归档状态',
    dataIndex: 'status',
    key: 'status',
    className: 'tabcolums',
    render: (text, record) => (
        <span>
            {record.status === 'BULLETIN_ARCHIVED' ? '已归档' : record.status === 'BULLETIN_UNASSIGNED' ? '未分发' : record.status === 'BULLETIN_NOT_ARCHIVED' ? '已分发未归档' : ''}
        </span>
    ),
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
    className: 'tabcolums'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={"/Bulletin/Querybulletin/" + JSON.stringify({id:record.id})}>详情</Link>
        <Divider type="vertical" />
        <Link to={"/Bulletin/Distribution/" + JSON.stringify({id:record.id})}>分发</Link>
      </span>
    ),
  },
];
  class List extends Component {
    state = {
      environment: this.props.environment,
      resourceMap: this.props.bulletinList.edges,
      loading: false,
      ModalText: '你确定对这些公文进行归档吗？',
      visible: false,
      confirmLoading: false,
      selectedRowKeys: [],
  };
  start = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    const keyslist = this.rowKeys
    Archive.commit(
        this.props.environment,
        keyslist,
        (response, errors) => {
            if (errors) {
                // console.log(errors)
                Modal.error({
                    title: errors[0].message,
                });
            } else {
                  Modal.success({
                      content: '归档成功！',
                  });
                  this.setState({
                    visible: false,
                    confirmLoading: false,
                    selectedRowKeys: [],
                    loading: false,
                  });
            }
        },
        (response, errors) => {
            if (errors) {
                // console.log(errors)
            } else {
                // console.log(response);
            }
        }
    );
    
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  onSelectChange = selectedRowKeys => {
    this.rowKeys = selectedRowKeys
    this.setState({ selectedRowKeys });
  };
  render() {
    const { visible, confirmLoading, loading, selectedRowKeys,ModalText } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const data = [];
    const tablelist = this.state.resourceMap
    for (let i of tablelist) {
      data.push({
        key: i.id,
        id: i.id,
        name: i.name,
        source: i.source,
        sponsorUserId: i.sponsorUserId,
        status: i.status,
        priority: i.priority,
      });
    }
      return (
          <div>
            <div style={{ marginBottom: 16 }}>
          <Button onClick={this.start} disabled={!hasSelected} loading={loading} style={{marginLeft:"20px"}}>
            公文归档
          </Button>
          <Modal
          title="公文归档"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
        </div>
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={this.state.resourceMap.id}/>
          </div>
      )
  }
  }

function Lists(props) {
  const environment = props.environment;

  return (
    
    <div>
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
      <div className={'divclear'}></div>
      <QueryRenderer
                environment={environment}
                query={query}
                variables={{
                  order:'',
                  status:["BULLETIN_UNASSIGNED","BULLETIN_UNASSIGNED","BULLETIN_NOT_ARCHIVED"],
                  // name:props.searchKey
              }}
                render={({ error, props, retry }) => {
                    if (error) {
                        return (
                            <div>
                                <h1>Error!</h1><br />{error.message}
                            </div>)
                    } else if (props) {
                        if (props.bulletinList) {
                            return (
                                <List environment={environment} bulletinList={props.bulletinList} />
                            )
                        }
                    }
                    return <div>Loading</div>;
                }}
            />
    </div>
  )
}
export default Lists;
