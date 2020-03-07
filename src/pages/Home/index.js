import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import Meeting from '../../components/Meeting'
import './index.css';

const list = [
    { title: '会议1', message: '这是会议1' },
    { title: '会议2', message: '这是会议2' },
    { title: '会议3', message: '这是会议3' },
    { title: '会议4', message: '这是会议4' },
    { title: '会议4', message: '这是会议4' },
    { title: '会议4', message: '这是会议4' },
]


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: list
        }
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '15px 0px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Meeting  environment={this.props.environment} />
            </div>
        )
    }

}
