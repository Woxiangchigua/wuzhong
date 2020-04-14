import React, { useState } from 'react'
import './index.css'
import {
    Breadcrumb,
    Button,
    Table,
    Tabs
} from 'antd';

import { QueryRenderer, graphql } from 'react-relay';

import CreateTitleForm from '../CreateTitle';
import CreateJobForm from '../CreateJob';
import CreateOfferCategoryForm from '../CreateOfferCategory';
import CreateOrgCategoryForm from '../CreateOrgCategory';
import UpdateBasicDataForm from '../UpdateBasicData';


const { TabPane } = Tabs;

const query = graphql`
    query BasicData_Query(
        $first: Int,
        $skip: Int
    ) {
        titleList(
            first: $first,
            skip: $skip
        ){
            edges {
              id
              name
              remark
              orderNumber
            }
            totalCount
        }
        jobList(
            first: $first,
            skip: $skip
        ){
            edges {
              id
              name
              remark
              orderNumber
            }
            totalCount
        }
        offerCategoryList(
            first:$first
            skip: $skip
        ) {
              
            edges {
                id
                name
                remark
                orderNumber
            }
            totalCount
        }
        orgCategoryList(
            first:$first
            skip: $skip
        ) {
              
            edges {
                id
                name
                remark
                orderNumber
            }
            totalCount
        }
}`

function Listview(props) {
    const data = props.data;
    const environment = props.environment;

    const titleData = props.titleList.edges.map((d)=>{
        return {
            key:d.key,
            id: d.id,
            name: d.name,
            remark: d.remark || "",
            orderNumber: d.orderNumber,
            title: "职称",
            action: "UpdateTitle"
        }
    });
    const jobData = props.jobList.edges.map((d)=>{
        return {
            key:d.key,
            id: d.id,
            name: d.name,
            remark: d.remark || "",
            orderNumber: d.orderNumber,
            title: "岗位",
            action: "UpdateJob"
        }
    });

    const offerCategoryData = props.offerCategoryList.edges.map((d)=>{
        return {
            key: d.key,
            id: d.id,
            name: d.name,
            remark: d.remark || "",
            orderNumber: d.orderNumber,
            title: "人员类型",
            action: "UpdateOfferCategory"
        }
    });

    const orgCategoryData = props.orgCategoryList.edges.map((d)=>{
        return {
            key:d.key,
            id: d.id,
            name: d.name,
            remark: d.remark || "",
            orderNumber: d.orderNumber,
            title: "组织类型",
            action: "UpdateOrgCategory"
        }
    });
    const showModal = () => {
        
    };

    const [createTitleFormVisible,setCreateTitleFormVisible] = useState(false);

    //添加职称
    let createTitleFormCallback = (a, d) => {
        setCreateTitleFormVisible(false);
        props.retry();
    }

    const [createJobFormVisible,setCreateJobFormVisible] = useState(false);

    //添加岗位
    let createJobFormCallback = (a, d) => {
        setCreateJobFormVisible(false);
        props.retry();
    }

    const [createOfferCategoryFormVisible,setCreateOfferCategoryFormVisible] = useState(false);

    //添加人员类型
    let createOfferCategoryFormCallback = (a, d) => {
        setCreateOfferCategoryFormVisible(false);
        props.retry();
    }

    const [createOrgCategoryFormVisible,setCreateOrgCategoryFormVisible] = useState(false);

    //添加组织类型
    let createOrgCategoryFormCallback = (a, d) => {
        setCreateOrgCategoryFormVisible(false);
        props.retry();
    }


    const [updateBasicDataFormVisible,setUpdateBasicDataFormVisible] = useState(false);
    const [basicData,setBasicData] = useState({});

    //修改数据
    let updateBasicDataFormCallback = (a, d) => {
        setUpdateBasicDataFormVisible(false);
        props.retry();
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '排序号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: '职称名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={()=>{
                        console.log("record===>",record)
                        setBasicData(record);
                        setUpdateBasicDataFormVisible(true)
                    }}>修改</Button>
                </span>
            ),
        }
    ];
    return (
        <>
            <div>
                <Breadcrumb style={{ margin: '15px 0px' }}>
                    <Breadcrumb.Item>
                        组织架构
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        基础数据
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <UpdateBasicDataForm 
                    environment={environment}
                    visible={updateBasicDataFormVisible}
                    basicData={basicData}
                    callback={updateBasicDataFormCallback.bind(this)}
                />
                <Tabs tabPosition="left">
                    <TabPane tab="职称管理" key="1">
                        <div className="Htable">
                            <div>
                               
                            </div>
                            <div>
                                <Button type="primary" onClick={()=>{
                                    setCreateTitleFormVisible(true)
                                }} style={{ marginRight: 10 }}>
                                    新增
                                </Button>
                                <CreateTitleForm 
                                    environment={environment}
                                    visible={createTitleFormVisible}
                                    callback={createTitleFormCallback.bind(this)}
                                />
                                <Button type="danger">删除</Button>
                            </div>
                        </div>
                        <Table bordered  columns={columns} dataSource={titleData} />
                    </TabPane>
                    <TabPane tab="岗位管理" key="2">
                        <div className="Htable">
                            <div>
                            </div>
                            <div>
                                <Button type="primary" onClick={()=>{
                                    setCreateJobFormVisible(true)
                                }} style={{ marginRight: 10 }}>
                                    新增
                                </Button>
                                <CreateJobForm 
                                    environment={environment}
                                    visible={createJobFormVisible}
                                    callback={createJobFormCallback.bind(this)}
                                />
                                <Button type="danger">删除</Button>
                            </div>
                        </div>
                        <Table bordered columns={columns} dataSource={jobData} />
                    </TabPane>
                    <TabPane tab="人员类型管理" key="3">
                        <div className="Htable">
                            <div>
                            </div>
                            <div>
                                <Button type="primary" onClick={()=>{
                                    setCreateOfferCategoryFormVisible(true)
                                }} style={{ marginRight: 10 }}>
                                    新增
                                </Button>
                                <CreateOfferCategoryForm 
                                    environment={environment}
                                    visible={createOfferCategoryFormVisible}
                                    callback={createOfferCategoryFormCallback.bind(this)}
                                />
                                <Button type="danger">删除</Button>
                            </div>
                        </div>
                        <Table bordered columns={columns} dataSource={offerCategoryData} />
                    </TabPane>
                    <TabPane tab="组织类型管理" key="4">
                        <div className="Htable">
                            <div>
                                
                            </div>
                            <div>
                                <Button type="primary" onClick={()=>{
                                    setCreateOrgCategoryFormVisible(true)
                                }} style={{ marginRight: 10 }}>
                                    新增
                                </Button>
                                <CreateOrgCategoryForm 
                                    environment={environment}
                                    visible={createOrgCategoryFormVisible}
                                    callback={createOrgCategoryFormCallback.bind(this)}
                                />
                                <Button type="danger">删除</Button>
                            </div>
                        </div>
                        <Table bordered columns={columns} dataSource={orgCategoryData} />
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

function List(viewProps) {
    const environment = viewProps.environment;
    return (<QueryRenderer
        environment={environment}
        query={query}
        variables={{
            first: 100,
            skip: 0
        }}
        render={({ error, props ,retry}) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                return <Listview  retry={retry} environment={environment} titleList={props.titleList} jobList={props.jobList} offerCategoryList={props.offerCategoryList} orgCategoryList={props.orgCategoryList} />
            }
            return <div>Loading</div>;
        }}
    />);
}


export default List;