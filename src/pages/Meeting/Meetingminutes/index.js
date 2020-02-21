import React, { Component } from 'react'
import Calendar from '../../../components/Calendar/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Divider } from 'antd';
import './index.css';

const ButtonGroup = Button.Group;
const query = graphql`
    query Meetingminutes_MeetingListQuery{
        meetingList(first:1000,skip:0){
            edges{
              applyUserId,
              beginTime,
              configuration,
              createdAt,
              deletedAt,
              endTime,
              id,
              intro,
              meetingName,
              meetingRoom{
                id,
                name
              },
              number,
              organizer,
              review,
              reviewUserId,
              status,
              updatedAt
            }
          }
    }`
const columns = [
    {
        title: '申请编号',
        dataIndex: 'sqnumber',
        key: 'sqnumber',
        className: 'tabcolums'
    },
    {
        title: '会议名称',
        dataIndex: 'meetingName',
        key: 'meetingName',
        className: 'tabcolums'
    },
    {
        title: '会议纪要',
        dataIndex: 'meetingminutes',
        key: 'meetingminutes',
        className: 'tabcolums'
    },
    {
        title: '申请人',
        dataIndex: 'applyUserId',
        key: 'applyUserId',
        className: 'tabcolums'
    },
    {
        title: '日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'tabcolums'
    },
    {
        title: '主办部门',
        dataIndex: 'organizer',
        key: 'organizer',
        className: 'tabcolums'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a>详情</a>
                <Divider type="vertical" />
            </span>
        ),
    },
];

class TableAwait extends Component {
    state = {
        environment: this.props.environment,
        resourceMap: this.props.meetingList.edges,
        loading: false,
    };
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.resourceMap} />
            </div>
        )
    }
}
// const data = [
//   {
//     key: '1',
//     number: '2020020312',
//     meetingname: '治安管理大会',
//     meetingminutes: '张三',
//     name: '张三',
//     age: "0001",
//     date: '2020-02-18',
//     dep: '治安大队',
//   }
// ];

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
      
      <Card title="" bordered={false} style={{ margin: '0px 0 10px 0' }}>
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
                        if (props.meetingList) {
                            return (
                                <TableAwait environment={environment} meetingList={props.meetingList} />
                            )
                        }
                    }
                    return <div>Loading</div>;
                }}
            />
        </Card>
    </div>
  )
  // }
}
export default Lists;
