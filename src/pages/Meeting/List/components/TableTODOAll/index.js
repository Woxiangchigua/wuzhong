import React, { Component } from 'react'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider } from 'antd';


const query = graphql`
    query TableTODOAll_MeetingListQuery{
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
        dataIndex: 'snumber',
        key: 'snumber',
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
        className: 'tabcolums'
      },
      {
        title: '会议室',
        dataIndex: 'meetmeetingRoomnamename',
        key: 'meetingRoomname',
        className: 'tabcolums'
      },
      {
        title: '日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'tabcolums'
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
        className: 'tabcolums'
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        className: 'tabcolums'
      },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a>详情</a>
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
                render={({ error, props, retry }) => {
                    if (error) {
                        return (
                            <div>
                                <h1>Error!</h1><br />{error.message}
                            </div>)
                    } else if (props) {
                        if (props.meetingList) {
                            return (
                                <TableTODOAll environment={environment} meetingList={props.meetingList} />

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
