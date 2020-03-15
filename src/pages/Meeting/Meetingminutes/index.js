import React, { Component } from 'react'
import Calendar from '../../../components/Calendar/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Button, Breadcrumb, Card, Table, Divider,Icon } from 'antd';
import './index.css';
import dateFormat from '../../../ utils/dateFormat'
import { Link } from "react-router-dom";

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
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className: 'tabcolums'
    },
    {
        title: '会议名称',
        dataIndex: 'meetingName',
        key: 'meetingName',
        className: 'tabcolums',
        render: (text, record) => (
            <span>
                {record.meetingRoom.name}
            </span>
        ),
    },
    {
        title: '会议纪要',
        dataIndex: 'meetingminutes',
        key: 'meetingminutes',
        className: 'tabcolums',
        render: (text, record) => (
            <Icon type="profile" style={{marginLeft:'8%',fontSize:'26px'}}/>
            // <Badge status={'warning'}/>
        ),
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
        className: 'tabcolums',
        render: (text, record) => (
            <span>
                {dateFormat("YYYY-mm-dd", new Date(record.createdAt))}
            </span>
        ),
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
                <Link to={"/Meeting/Queryendmeeting/" + record.id}>
                    <Button type="link">详情</Button>
                </Link>
                {/* <Divider type="vertical" /> */}
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
                <Table bordered size="middle" columns={columns} dataSource={this.state.resourceMap} />
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
    <div  style={{ backgroundColor: '#f0f2f5' }}>
      <Card bordered={false} >
        <Breadcrumb>
          <Breadcrumb.Item>会议室管理</Breadcrumb.Item>
          <Breadcrumb.Item>会议纪要</Breadcrumb.Item>
        </Breadcrumb>
        {/* <ButtonGroup style={{ margin: '10px 0px', marginLeft: '75%' }}>
          <Link to={"/Meeting/Creatmeeting"}>
            <Button>会议申请</Button>
          </Link>
          <Button>会议纪要</Button>
        </ButtonGroup> */}
      </Card>
      
      <Card title="" bordered={false} style={{ margin: '10px 0 10px 0' }}>
      <QueryRenderer
                environment={environment}
                query={query
                }
                variables={{
                    order:'',
                    status:'MEETING_END',
                    review:'MEETING_PASS',
                    meetingName:props.searchKey
                }}
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
