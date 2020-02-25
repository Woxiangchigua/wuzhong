import React, { Component } from 'react'
import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider,Popconfirm,Modal,Button } from 'antd';
import { Link } from "react-router-dom";

const { confirm } = Modal;

function Lists(props) {
const query = graphql`
    query Tableuser_MeetingListQuery(
      $order: String = ""
      $meetingName: String = ""
){
  myAwaitMeetingList(
      order: $order
      first: 10000
      skip: 0
      meetingName: $meetingName
      ){
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
        dataIndex: 'meetingRoomname',
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
              <Link to={"/Meeting/Querymeeting/" + record.id}>详情</Link>
              <Divider type="vertical" />
      <Button onClick={() => {showDeleteConfirm(record.id)}} type="link">
      删除
    </Button>
            </span>
          ),
        },
      ];
      function showDeleteConfirm(id){
          confirm({
            title: '你确定要删除这条会议申请吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              DeleteMeeting.commit(
                  props.environment,
                  id,
                  (response, errors) => {
                      if (errors) {
                      console.log(errors)
                      } else {
                      console.log(response);
                      }
                  },
                  (response, errors) => {
                      if (errors) {
                      console.log(errors)
                      } else {
                      console.log(response);
                      }
                  }
              );
            },
            onCancel() {
              console.log('取消删除');
            },
          });
        }

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

    const environment = props.environment;
    return (
        <div>

            <QueryRenderer
                environment={environment}
                query={query}
                variables={{
                  order:'',
                  meetingName:props.searchKey
              }}
                render={({ error, props, retry }) => {
                    if (error) {
                        return (
                            <div>
                                <h1>Error!</h1><br />{error.message}
                            </div>)
                    } else if (props) {
                        if (props.myAwaitMeetingList) {
                            return (
                                <TableTODO environment={environment} meetingList={props.myAwaitMeetingList} />

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
