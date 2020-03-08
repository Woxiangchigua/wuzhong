import React, { Component } from 'react'
import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider, Popconfirm, Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import dateFormat from '../../../../../ utils/dateFormat'

function Lists(props) {
  const { confirm } = Modal;
  const query = graphql`
    query Tableme_MeetingListQuery(
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
      title: 'ID',
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
      title: '申请人',
      dataIndex: 'applyUserId',
      key: 'applyUserId',
      className: 'tabcolums'
    },
    
    {
      title: '会议室',
      dataIndex: 'meetingRoomname',
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
          {dateFormat("YYYY-mm-dd", new Date(record.createdAt))}
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
          {dateFormat("HH:MM", new Date(record.beginTime))}
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
          {dateFormat("HH:MM", new Date(record.endTime))}
        </span>
      ),
    },
    {
      title: '会议状态',
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={"/Meeting/Querymeeting/" + JSON.stringify({id:record.id,review:record.review})}>详情</Link>
          {/* <Divider type="vertical" />
          <Button onClick={() => { showDeleteConfirm(JSON.stringify({id:record.id,review:record.review})) }} type="link">
            审核
          </Button> */}
        </span>
      ),
    },
  ];

  function showDeleteConfirm(id) {
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
        console.log('取消成功');
      },
    });
  }
  class TableOccupy extends Component {
    state = {
      environment: this.props.environment,
      resourceMap: this.props.meetingList.edges,
      loading: false,
    };
    render() {
      return (
        <div>
          <Table bordered size="middle" columns={columns} dataSource={this.state.resourceMap} pagination={false} />
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
          order: '',
          meetingName: props.searchKey2
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
                <TableOccupy environment={environment} meetingList={props.myAwaitMeetingList} />

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
