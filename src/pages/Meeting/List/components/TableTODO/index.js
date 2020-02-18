import React, { Component } from 'react'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider } from 'antd';


const query = graphql`
    query TableTODO_MeetingListQuery{
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
          dataIndex: 'number',
          key: 'number',
          className: 'tabcolums'
        },
        {
          title: '会议名称',
          dataIndex: 'meetingname',
          key: 'meetingname',
          className: 'tabcolums'
        },
        {
          title: '预定状态',
          dataIndex: 'state',
          key: 'state',
          className: 'tabcolums'
        },
        {
          title: '会议室',
          dataIndex: 'meetname',
          key: 'meetname',
          className: 'tabcolums'
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          className: 'tabcolums'
        },
        {
          title: '开始时间',
          dataIndex: 'starttime',
          key: 'starttime',
          className: 'tabcolums'
        },
        {
          title: '结束时间',
          dataIndex: 'endtime',
          key: 'endtime',
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

class TableTODO extends Component {
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
                                <TableTODO environment={environment} meetingList={props.meetingList} />

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
