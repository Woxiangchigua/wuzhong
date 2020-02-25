import React, { Component } from 'react'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider } from 'antd';
import dateFormat from '../../../../../ utils/dateFormat'
import { Link } from "react-router-dom";

const query = graphql`
    query TableTODOAll1_MeetingListQuery(
      $order: String = ""
      $meetingName: String = ""
){
        applyAllAwaitMeetingList(order: $order,first: 10,skip: 0,meetingName: $meetingName){
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
        dataIndex: 'id',
        key: 'id',
        className: 'tabcolums'
      },
      {
        title: '会议名称',
        dataIndex: 'meetingName',
        key: 'meetingName',
        className: 'tabcolums'
      },
      {
        title: '预定状态',
        dataIndex: 'status',
        key: 'status',
        className: 'tabcolums',
        render: (text, record) => (
            <span>
              {record.status === 'MEETING_END' ? '会议结束' : record.status === 'MEETING_CANCEL' ? '已取消' : record.status === 'MEETING_AWAIT' ? '未开始' : ''}
            </span>
          ),
      },
      {
        title: '会议室',
        dataIndex: 'meetmeetingRoomnamename',
        key: 'meetingRoomname',
        className: 'tabcolums',
        render: (text, record) => (
            <span>
                {record.meetingRoom.name}
            </span>
        ),
      },
      {
        title: '日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'tabcolums',
        render: (text, record) => (
            <span>
              {dateFormat("YYYY-mm-dd",new Date(record.createdAt))}
            </span>
          ),
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
        className: 'tabcolums',
        render: (text, record) => (
            <span>
              {dateFormat("HH:MM",new Date(record.beginTime))}
            </span>
          ),
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        className: 'tabcolums',
        render: (text, record) => (
            <span>
              {dateFormat("HH:MM",new Date(record.endTime))}
            </span>
          ),
      },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Link to={"/Meeting/Querymeeting/" + record.id}>详情</Link>
              <Divider type="vertical" />
              <a>删除</a>
            </span>
          ),
        },
      ];

class TableTODOAll extends Component {
    state = {
        environment: this.props.environment,
        resourceMap: this.props.meetingList.edges,
        loading: false,
    };
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.resourceMap} pagination={false} />
            </div>
        )
    }
}

function Lists(props) {
    const environment = props.environment;
    return (
        <div>

            <QueryRenderer
                environment={environment}
                query={query
                }
				variables={{
				    order:'',
				    meetingName:props.searchKey2
				}}
                render={({ error, props, retry }) => {
                    if (error) {
                        return (
                            <div>
                                <h1>Error!</h1><br />{error.message}
                            </div>)
                    } else if (props) {
                        if (props.applyAllAwaitMeetingList) {
                            return (
                                <TableTODOAll environment={environment} meetingList={props.applyAllAwaitMeetingList} />

                            )
                        }
                    }
                    return <div>Loading</div>;
                }}
            />
        </div>
    )
    // }
}
export default Lists;
