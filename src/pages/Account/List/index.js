import React from 'react';
import {
    Breadcrumb,
    Table,
    Divider,
    Input, 
    Button,
    Tag
} from 'antd';

import {
    Link
} from "react-router-dom";

import moment from 'moment';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import AccountStatusView from '../../../components/AccountStatusView';

const { Search } = Input;

const columns = [
  { title: '编号', dataIndex: 'id', key: 'id' },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '权限角色', dataIndex: 'roles', key: 'roles', width: 200, render: roles => (
      <span>
        {roles.map(role => {
          return (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          );
        })}
      </span>
    ),
  },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '状态', dataIndex: 'status', key: 'status', render: status=>(<AccountStatusView status={status} />)},
  {
    title: '操作',
    key: 'more',
    dataIndex: 'more',
    render: (more, record) => (<Link to={"/Account/Detil/"+ record.id}>编辑</Link>),
  },
];

const query = graphql`
query List_AccountsQuery(
    $first: Int
    $skip: Int,
    $role: String
) {
    accounts(
        first: $first
        skip: $skip,
        role: $role
    ) {
        totalCount
        edges {
          id
          username
          roles
          status
          createdAt
        }
    }
    authoritys(
      first: 100, 
      skip: 0
    ) {
      totalCount
      edges {
        role
      }
    }
}`

class TableView extends React.Component {
    state = {
        environment: this.props.environment,
        data: this.props.accounts.edges.map(function (edge) {
            return {
                "id": edge.id,
                "key": edge.id,
                "username": edge.username,
                "roles": edge.roles,
                "status": edge.status,
                "createdAt": moment(new Date(edge.createdAt)).format('YYYY-MM-DD HH:mm:ss'),
            }
        }),
        pagination: {
            total: this.props.accounts.totalCount
        },
        loading: false,
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        console.log(pagination, filters, sorter)
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

        fetchQuery(this.state.environment, query, {
            first: 10,
            skip: pagination.current * 10 - 10
        }).then(data => {
            this.setState({
                loading: false,
                data: data.accounts.edges.map(function (edge) {
                    return {
                        "id": edge.id,
                        "key": edge.id,
                        "username": edge.username,
                        "roles": edge.roles,
                        "status": edge.status,
                        "createdAt": moment(new Date(edge.createdAt)).format('YYYY-MM-DD HH:mm:ss')
                    }
                })
            });
        });
    };
    searchRole = ( role )=>{
        fetchQuery(this.state.environment, query, {
            first: 10,
            skip: 0,
            role: role || ""
        }).then(data => {
            this.setState({
                loading: false,
                pagination: {
                    total: data.accounts.totalCount
                },
                data: data.accounts.edges? data.accounts.edges.map(function (edge) {
                    return {
                        "id": edge.id,
                        "key": edge.id,
                        "username": edge.username,
                        "roles": edge.roles,
                        "status": edge.status,
                        "createdAt": moment(new Date(edge.createdAt)).format('YYYY-MM-DD HH:mm:ss'),
                    }
                }):[]
            });
        });
    }
    render() {
        return (
            <>
                <Breadcrumb style={{ margin: '15px 0px' }}>
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item>账号管理</Breadcrumb.Item>
                </Breadcrumb>
                <Divider />
                
                <div style={{  "textAlign":"" }}>
                  <Search
                    placeholder="请输入角色名"
                    onSearch={this.searchRole}
                    style={{ width: 300 , "margin": '0 10px 15px 20px'}}
                    enterButton
                  />
                </div>
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </>
        );
    }
}

function List(props) {
    const environment = props.environment;
    return (<QueryRenderer
        environment={environment}
        query={query
        }
        variables={{
            count: 10,
            skip: 0
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                if (props.accounts) {
                    return <TableView environment={environment} accounts={props.accounts} />
                }
            }
            return <div>Loading</div>;
        }}
    />);
}

export default List;