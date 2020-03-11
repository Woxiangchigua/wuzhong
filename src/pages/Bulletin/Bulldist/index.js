import React, { Component, useState } from 'react'
import NeedAudit from '../Mutations/Needaudit'
import Audit from '../Mutations/Audit'
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
  bulletinDistributionList(first:10,skip:0,order:$order,name:$name,source:$source,status:$status,needReview:$needReview,isReview:$isReview){
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

const columns = [
  {
    title: '公文id',
    dataIndex: 'bulletinId',
    key: 'bulletinId',
    className: 'tabcolums'
  },{
    title: '公文名称',
    dataIndex: 'bulletinname',
    key: 'bulletinname',
    className: 'tabcolums'
  },{
    title: '公文来源',
    dataIndex: 'bulletinsource',
    key: 'bulletinsource',
    className: 'tabcolums'
  },
  {
    title: '部门id',
    dataIndex: 'depId',
    key: 'depId',
    className: 'tabcolums'
  },
  {
    title: '部门主管Id',
    dataIndex: 'depReviewId',
    key: 'depReviewId',
    className: 'tabcolums'
  },
  {
    title: '部门文员id',
    dataIndex: 'depClerkId',
    key: 'depClerkId',
    className: 'tabcolums'
  },
  {
    title: '是否需要签字审核',
    dataIndex: 'needReview',
    key: 'needReview',
    className: 'tabcolums',
    render: (text, record) => (
        <span>
            {record.needReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_NO' ? '不需要签字审核' : record.needReview === 'BULLETIN_DISTRIBUTION_NEED_REVIEW_YES' ? '需要签字审核' : ''}
        </span>
    ),
  },
  {
    title: '领导签字审核',
    dataIndex: 'isReview',
    key: 'isReview',
    className: 'tabcolums',
    render: (text, record) => (
        <span>
            {record.isReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_NO' ? '未签字审核' : record.isReview === 'BULLETIN_DISTRIBUTION_IS_REVIEW_YES' ? '已签字审核' : ''}
        </span>
    ),
  },
  {
    title: '归档状态',
    dataIndex: 'status',
    key: 'status',
    className: 'tabcolums',
    render: (text, record) => (
        <span>
            {record.status === 'BULLETIN_DISTRIBUTION_UNASSIGNED' ? '未处理' : record.status === 'BULLETIN_DISTRIBUTION_NOT_ARCHIVED' ? '未归档（处理中）' : record.status === 'BULLETIN_DISTRIBUTION_DEP_ARCHIVED' ? '部门已归档' : record.status === 'BULLETIN_DISTRIBUTION_ARCHIVED' ? '办公室确认归档' :''}
        </span>
    ),
  },
  // {
  //   title: '操作',
  //   key: 'action',
  //   render: (text, record) => (
  //     <span>
  //       {/* <Link to={"/Bulletin/Querybulletin/" + JSON.stringify({id:record.id})}>详情</Link>
  //       <Divider type="vertical" />
  //       <Link to={"/Bulletin/Distribution/" + JSON.stringify({id:record.id})}>分发</Link> */}
  //     </span>
  //   ),
  // },
];

  class List extends Component {
    state = {
      environment: this.props.environment,
      resourceMap: this.props.bulletinList.edges,
      loading: false,
      NeedAuditText: '你确定这些公文需要签字审核吗？',
      AuditText: '你确定审核这些公文吗？',
      DepArchiveText: '你确定归档这些公文吗？',
      ArchivedistText: '你确定归档这些公文吗？',
      NeedAuditvisible: false,
      Auditvisible: false,
      DepArchivevisible: false,
      Archivedistvisible: false,
      confirmLoading: false,
      selectedRowKeys: [],
  };
  //需要签字审核
  needaudit = () => {
    this.setState({
      NeedAuditvisible: true,
    });
  };
  NeedAudithandleOk = () => {
    const needkeyslist = this.rowKeys
    NeedAudit.commit(
        this.props.environment,
        needkeyslist,
        (response, errors) => {
            if (errors) {
                // console.log(errors)
                Modal.error({
                    title: errors[0].message,
                });
            } else {
                  Modal.success({
                      content: '保存成功！',
                  });
                  this.setState({
                    NeedAuditvisible: false,
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
  NeedAudithandleCancel = () => {
    this.setState({
      NeedAuditvisible: false,
    });
  };
  //签字审核
  audit = () => {
    this.setState({
      Auditvisible: true,
    });
  };
  AudithandleOk = () => {
    const auditkeyslist = this.rowKeys
    Audit.commit(
        this.props.environment,
        auditkeyslist,
        (response, errors) => {
            if (errors) {
                // console.log(errors)
                Modal.error({
                    title: errors[0].message,
                });
            } else {
                  Modal.success({
                      content: '审核成功！',
                  });
                  this.setState({
                    Auditvisible: false,
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
  AudithandleCancel = () => {
    this.setState({
      Auditvisible: false,
    });
  };
  //部门归档
  deparchive = () => {
    this.setState({
      DepArchivevisible: true,
    });
  };
  DeparchivehandleOk = () => {
    const depkeyslist = this.rowKeys
    Deparchive.commit(
        this.props.environment,
        depkeyslist,
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
                    DepArchivevisible: false,
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
  DeparchivehandleCancel = () => {
    this.setState({
      DepArchivevisible: false,
    });
  };
  //办公文员归档
  archivedist = () => {
    this.setState({
      Archivedistvisible: true,
    });
  };
  ArchivedisthandleOk = () => {
    const archivekeyslist = this.rowKeys
    Archivedist.commit(
        this.props.environment,
        archivekeyslist,
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
                    Archivedistvisible: false,
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
  ArchivedisthandleCancel = () => {
    this.setState({
      Archivedistvisible: false,
    });
  };
  onSelectChange = selectedRowKeys => {
    this.rowKeys = selectedRowKeys
    this.setState({ selectedRowKeys });
  };
  searchlist = (name,source) => {
    fetchQuery(this.state.environment, query, {
      first: 10,
      skip: 0,
      name: name || "",
      source: source || "",
      order:'',
      status: ["BULLETIN_DISTRIBUTION_ARCHIVED","BULLETIN_DISTRIBUTION_UNASSIGNED","BULLETIN_DISTRIBUTION_NOT_ARCHIVED","BULLETIN_DISTRIBUTION_DEP_ARCHIVED"],
      isReview: ["BULLETIN_DISTRIBUTION_IS_REVIEW_NO","BULLETIN_DISTRIBUTION_IS_REVIEW_YES"],
      needReview: ["BULLETIN_DISTRIBUTION_NEED_REVIEW_NO","BULLETIN_DISTRIBUTION_NEED_REVIEW_YES"],
    }).then(data => {
      this.setState({
        loading: false,
        pagination: {
            total: data.bulletinDistributionList.totalCount
        },
        data: data.bulletinDistributionList.edges? data.bulletinDistributionList.edges.map(function (edge) {
          return {
            "key": edge.id,
            "bulletinId": edge.bulletinId,
            "bulletinname": edge.bulletin.name,
            "bulletinsource": edge.bulletin.source,
            "depId": edge.depId,
            "depReviewId": edge.depReviewId,
            "depClerkId": edge.depClerkId,
            "needReview": edge.needReview,
            "isReview": edge.isReview,
            "status": edge.status,
          }
        }):[]
      });
    });
  };
  render() {
    const { NeedAuditvisible, Auditvisible, DepArchivevisible, Archivedistvisible, confirmLoading, loading, selectedRowKeys, NeedAuditText, AuditText, DepArchiveText, ArchivedistText } = this.state;
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
        bulletinId: i.bulletinId,
        bulletinname: i.bulletin.name,
        bulletinsource: i.bulletin.source,
        depId: i.depId,
        depReviewId: i.depReviewId,
        depClerkId: i.depClerkId,
        needReview: i.needReview,
        isReview: i.isReview,
        status: i.status,
      });
    }
      return (
          <div><div style={{ marginBottom: 16 }}>
          <Button onClick={this.needaudit} disabled={!hasSelected} loading={loading} style={{marginLeft:"20px"}}>
            需要签字审核
          </Button>
          <Modal
          title="需要签字审核"
          visible={NeedAuditvisible}
          onOk={this.NeedAudithandleOk}
          confirmLoading={confirmLoading}
          onCancel={this.NeedAudithandleCancel}
        >
          <p>{NeedAuditText}</p>
        </Modal>
          <Button onClick={this.audit} disabled={!hasSelected} loading={loading} style={{marginLeft:"20px"}}>
            签字审核
          </Button>
          <Modal
          title="签字审核"
          visible={Auditvisible}
          onOk={this.AudithandleOk}
          confirmLoading={confirmLoading}
          onCancel={this.AudithandleCancel}
        >
          <p>{AuditText}</p>
        </Modal>
          <Button onClick={this.deparchive} disabled={!hasSelected} loading={loading} style={{marginLeft:"20px"}}>
          部门公文归档
          </Button>
          <Modal
          title="部门公文归档"
          visible={DepArchivevisible}
          onOk={this.DeparchivehandleOk}
          confirmLoading={confirmLoading}
          onCancel={this.DeparchivehandleCancel}
        >
          <p>{DepArchiveText}</p>
        </Modal>
          <Button onClick={this.archivedist} disabled={!hasSelected} loading={loading} style={{marginLeft:"20px"}}>
          办公文员归档
          </Button>
          <Modal
          title="办公文员归档"
          visible={Archivedistvisible}
          onOk={this.ArchivedisthandleOk}
          confirmLoading={confirmLoading}
          onCancel={this.ArchivedisthandleCancel }
        >
          <p>{ArchivedistText}</p>
        </Modal>
        </div>
        <Search
          placeholder="input search text"
          onSearch={this.searchlist}
          // onSearch={() => {searchlist()}}
          style={{ width: 200 }}
        />
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={this.state.resourceMap.id} />
          </div>
      )
  }
  }

  // function searchlist(value){
  //   console.log("???",value)
  // }
function Lists(props) {
  const environment = props.environment;

  return (
    
    <div>
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
      <div className={'divclear'}></div>
      <QueryRenderer
                environment={environment}
                query={query}
                variables={{
                  order:'',
                  status: ["BULLETIN_DISTRIBUTION_ARCHIVED","BULLETIN_DISTRIBUTION_UNASSIGNED","BULLETIN_DISTRIBUTION_NOT_ARCHIVED","BULLETIN_DISTRIBUTION_DEP_ARCHIVED"],
                  isReview: ["BULLETIN_DISTRIBUTION_IS_REVIEW_NO","BULLETIN_DISTRIBUTION_IS_REVIEW_YES"],
                  needReview: ["BULLETIN_DISTRIBUTION_NEED_REVIEW_NO","BULLETIN_DISTRIBUTION_NEED_REVIEW_YES"],
                  // name:props.value
              }}
                render={({ error, props, retry }) => {
                    if (error) {
                        return (
                            <div>
                                <h1>Error!</h1><br />{error.message}
                            </div>)
                    } else if (props) {
                        if (props.bulletinDistributionList) {
                            return (
                                <List environment={environment} bulletinList={props.bulletinDistributionList} />
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
