import React from 'react';
import { Breadcrumb } from 'antd';

export default function Dashboard() {
    return (
        <>
            <Breadcrumb style={{ margin: '15px 0px' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div>Dashboard</div>
        </>
    );
}