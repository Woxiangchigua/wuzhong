import React, { Component } from 'react'
import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider, Modal, Button,Badge } from 'antd';
import dateFormat from '../../../../../ utils/dateFormat'
import { Link } from "react-router-dom";

function Lists(props) {
    const { confirm } = Modal;
    const query = graphql`
    query TableAwait_MeetingListQuery(
            $order: String = ""
            $status: enumTypeMeetingStatus!
            $review: EnumTypeAuditMeetingType!
            $meetingName: String = ""
    ){
        adminPendingMeetingList(
            order: $order
            first: 10000
            skip: 0
            status: $status
            review: $review
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
                // <span>
                //     {record.status === 'MEETING_END' ? '会议结束' : record.status === 'MEETING_CANCEL' ? '已取消' : record.status === 'MEETING_AWAIT' ? '未开始' : ''}
                // </span>
                <Badge status="error" text="管理员审核" />
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
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => (
                <span>
                    <Link to={"/Meeting/Querymeeting/" + record.id}>详情</Link>
                    <Divider type="vertical" />
                    <Button onClick={() => { showDeleteConfirm(record.id) }} type="link">
                        删除
                    </Button>
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
                console.log('取消删除');
            },
        });
    }

    class TableAwait extends Component {
        constructor(props){
            super(props)
            this.state = {
                environment: props.environment,
                resourceMap: props.meetingList.edges,
                loading: false,
                
            };
            
        }
        
        
        
        render() {
            return (
                <div>
                    <Table
                        columns={columns}
                        dataSource={this.state.resourceMap}
                        pagination={false} />
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
                    status:'MEETING_AWAIT',
                    review:'MEETING_CHECK_PENDING_ADMIN',
                    meetingName:props.searchKey
                }}
                render={({ error, props, retry }) => {
                    if (error) {
                        return (
                            <div>
                                <h1>Error!</h1><br />{error.message}
                            </div>)
                    } else if (props) {
                        if (props.adminPendingMeetingList) {
                            return (
                                <TableAwait environment={environment} meetingList={props.adminPendingMeetingList} />

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
