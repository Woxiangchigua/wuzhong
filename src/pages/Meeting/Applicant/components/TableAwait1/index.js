import React, { Component, useState } from 'react'
import DeleteMeeting from '../../../Mutations/DeleteMeeting'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider, Badge, Modal, Button } from 'antd';
import dateFormat from '../../../../../ utils/dateFormat'
import { useHistory, Link } from "react-router-dom";
import CommitCheckMeeting from '../../../Mutations/CommitCheckMeeting'
import AbrogateMeeting from '../../../Mutations/AbrogateMeeting'

function Lists(props) {
    const [meetingList, setmeetingList] = useState([]);
    let history = useHistory();
    const { confirm } = Modal;
    const query = graphql`
    query TableAwait1_MeetingListQuery(
            $order: String = ""
            $meetingName: String = ""
    ){
        applyPendingMeetingList(order: $order,first: 10,skip: 0,meetingName: $meetingName){
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
                <Badge
                    status={record.review === 'MEETING_EDIT_OR_FAIL' ? 'warning' : 'error'}
                    text={record.review === 'MEETING_EDIT_OR_FAIL' ? '待提交' : record.review === 'MEETING_CHECK_PENDING_MANAGE' ? '部门审核' : record.review === 'MEETING_CHECK_PENDING_ADMIN' ? '管理员审核' : ''} />
            ),

        },
        {
            title: '操作',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => (
                <span>
                    {/* <Button style={{ padding: 0, display: record.review === 'MEETING_EDIT_OR_FAIL' ? 'block' : 'none' }}
                        onClick={() => { showConfirm(record.id) }}
                        type="link">
                        提交审核
                    </Button>
                    <Divider style={{ display: record.review === 'MEETING_EDIT_OR_FAIL' ? 'block' : 'none' }} type="vertical" /> */}
                    <Link to={"/Meeting/Querymeeting/" + JSON.stringify({id:record.id,review:record.review})}>详情</Link>
                    {/* <Divider type="vertical" />
                    <Link
                        style={{ display: record.review === 'MEETING_EDIT_OR_FAIL' ? 'block' : 'none' }}
                        to={"/Meeting/Updatemeeting/" + record.id}>
                        编辑
                    </Link>
                    <Divider style={{ display: record.review === 'MEETING_EDIT_OR_FAIL' ? 'block' : 'none' }} type="vertical" />
                    <Button
                        style={{ padding: 0, display: record.review === 'MEETING_EDIT_OR_FAIL' ? 'block' : 'none' }}
                        onClick={() => { showDeleteConfirm(record.id) }}
                        type="link">
                        删除
                    </Button>
                    <Button
                        style={{ padding: 0, display: record.review === 'MEETING_EDIT_OR_FAIL' ? 'none' : 'block' }}
                        onClick={() => { showAbrogateConfirm(record.id) }}
                        type="link">
                        取消
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
                console.log('取消删除');
            },
        });
    }

    function showAbrogateConfirm(id) {
        confirm({
            title: '你确定要取消这条会议申请吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                AbrogateMeeting.commit(
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

    function getList() {
        fetchQuery(props.environment, query, {
            order: '',
            meetingName: props.searchKey
        }).then(data => {
            if (data) {
                if (data.applyPendingMeetingList) {
                    setmeetingList(data.applyPendingMeetingList)
                }
            }
        });
    }

    function showConfirm(id) {
        confirm({
            title: '你真的要提交这个会议吗?',
            content: '',
            onOk() {
                console.log('确认');
                CommitCheckMeeting.commit(
                    props.environment,
                    id,
                    (response, errors) => {
                        if (errors) {
                            // console.log(errors)
                            Modal.error({
                                title: errors[0].message,
                            });
                        } else {
                            // console.log(response);
                            Modal.success({
                                content: '提交成功',
                                onOk() {
                                    // history.goBack()
                                    getList()
                                },
                            });
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
                console.log('取消');
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
                    <Table bordered size="middle"
                        columns={columns}
                        dataSource={this.state.resourceMap}
                        pagination={false} 
                         />
                </div>
            )
        }
    }

    const environment = props.environment;
    return (
        <div>

            <QueryRenderer
                environment={environment}
                query={query
                }
                variables={{
                    order: '',
                    meetingName: props.searchKey
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
