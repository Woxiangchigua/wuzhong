import React, { Component } from 'react'
import LeaderCheckMeeting from '../../../Mutations/LeaderCheckMeeting'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider,Badge,Modal,Button,Input  } from 'antd';
import { Link } from "react-router-dom";
import dateFormat from '../../../../../ utils/dateFormat'

const { TextArea } = Input;
function Lists(props) {
const { confirm } = Modal;
const query = graphql`
    query Tabledeal_MeetingListQuery(
        $order: String = ""
        $meetingName: String = ""
    ){
        applyPendingMeetingList(first:10,skip:0,meetingName:$meetingName,order:$order){
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
        title: '申请人',
        dataIndex: 'applyUserId',
        key: 'applyUserId',
        className: 'tabcolums'
    },
    {
        title: '预定状态',
        dataIndex: 'status',
        key: 'status',
        className: 'tabcolums',
        render: (text, record) => (
            <Badge
          status={record.review === 'MEETING_EDIT_OR_FAIL' ? 'warning' : 'error'}
          text={record.review === 'MEETING_EDIT_OR_FAIL' ? '待提交' : record.review === 'MEETING_CHECK_PENDING_MANAGE' ? '部门审核' : record.review === 'MEETING_CHECK_PENDING_ADMIN' ? '管理员审核' : ''} />
  ),
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
        title: '操作',
        dataIndex:'delete',
        key: 'delete',
        render: (text, record) => (
            <span>
            <Link to={"/Meeting/Querymeeting/" + record.id}>详情</Link>
                <Divider type="vertical" />
      <Button onClick={() => {showModal(record.id)}} type="link">
      {/* <Button onClick={this.showModal} type="link"> */}
      审核
    </Button>
            </span>
        ),
    },
];
function showModal(id){
    let value = '';
    confirm({
      title: '你需要审核这个会议任务',
      content: (<TextArea rows={4} onChange={(e)=>{value=e;console.log(e)}} />),
      okText: '同意',
      cancelText: '不同意',
      onOk() {
        LeaderCheckMeeting.commit(
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
        console.log('不同意');
      },
    });
  }
class TableAwait extends Component {
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
                        if (props.applyPendingMeetingList) {
                            return (
                                <TableAwait environment={environment} meetingList={props.applyPendingMeetingList} />

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
