import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import { Table } from 'antd';
// import { createPaginationContainer, graphql } from 'react-relay';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];


const _data = [];
for (let i = 0; i < 5; i++) {
    _data.push({
        key: i,
        name: `Edward King ${i}`,
        gender: 32,
        email: `London, Park Lane no. ${i}`,
    });
}

function UserList() {
    let [pagination, setPagination] = useState({ total: 200, pageSize: 10, current: 1 });
    let [data, setData] = useState(_data);

    console.log(pagination);

    let handleTableChange = (_pagination, filters, sorter) => {
        console.log(_pagination, filters, sorter);
        const pager = { ...pagination };
        pager.current = _pagination.current;
        setPagination(pager);

        let data2 = [];
        for (let i = pager.current; i < pager.current + 5; i++) {
            data2.push({
                key: i,
                name: `Edward King ${i}`,
                gender: 32,
                email: `London, Park Lane no. ${i}`,
            });
        }
        setData(data2);

        // this.fetch({
        //     results: pagination.pageSize,
        //     page: pagination.current,
        //     sortField: sorter.field,
        //     sortOrder: sorter.order,
        //     ...filters,
        // });
    };

    return (
        <>
            <Breadcrumb style={{ margin: '15px 0px' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>

            <Table
                columns={columns}
                rowKey={record => record.key}
                dataSource={data}
                pagination={pagination}
                loading={false}
                onChange={handleTableChange}
            />
        </>
    );
}

export default UserList;