import React, { useState, useRef} from 'react'
import { 
    Row, 
    Col, 
    Table, 
    Button, 
    Breadcrumb, 
    Input, 
    Modal, 
    Radio, 
    Select,
    Dropdown,
    Menu,
    message
} from 'antd';
import { Form, Mention } from '@ant-design/compatible';
import Icon  from '@ant-design/icons';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';

import DepartmentTree from '@/components/DepartmentTree'

import EmployeeStatusView from '@/components/EmployeeStatusView';
import EmployeeIsPrincipal from '@/components/EmployeeIsPrincipal';

import CreateOrgForm from '../CreateOrg';

import CreateEmployeeForm from '../CreateEmployee';
import './index.css'
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '工号',
        dataIndex: 'jobNum',
        key: 'jobNum',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '手机',
        dataIndex: 'phoneNum',
        key: 'phoneNum',
    },
    {
        title: '所属部门',
        dataIndex: 'org',
        key: 'org',
    },
    {
        title: '岗位',
        dataIndex: 'job',
        key: 'job',
    },
    {
        title: '职称',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '人员类型',
        dataIndex: 'offerCategory',
        key: 'offerCategory',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status=>(<EmployeeStatusView status={status} />)
    },
    {
        title: '负责人',
        dataIndex: 'isPrincipal',
        key: 'isPrincipal',
        render: isPrincipal=>(<EmployeeIsPrincipal status={isPrincipal} />)
    },
    {
        title: '操作',
        render: (text, record) => (
            <span>
                <Button type="link">查看</Button>
                <Button type="link">修改</Button>
                <Button type="link">上移</Button>
                <Button type="link">下移</Button>
            </span>
        ),
    }
];

const query = graphql`
query List_OrgQuery(
    $id: ID
) {
    org(
        id: $id
    ) {
      id
      name
      employees {
        id
        jobNum
        name
        phoneNum
        job {
          name
        }
        title {
          id
          name
        }
        offerCategory {
          id
          name
        }
        status
        employeeOrgs{
          isPrincipal
        }
      }
    }
}`

function Listview(props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const data = props.data;
    const environment = props.environment;

    //组织面包屑
    const [breadCrumbShow, setBreadCrumbShow] = useState([data.name]);
    //显示员工
    const [employeesData, setEmployeesData] = useState(data.employees.map((d)=>{
        return {
            key: d.id,
            id: d.id,
            jobNum:d.jobNum,
            name: d.name,
            phoneNum:d.phoneNum,
            org: data.org.name,
            job: d.job.name,
            title: d.title.name,
            offerCategory: d.offerCategory.name,
            status:d.status,
            isPrincipal: d.employeeOrgs[0].isPrincipal
        };
    }))
    //当前组织ID
    const [orgID, setOrgID] = useState(data.id);

    const [createEmployeeFormVisible,setCreateEmployeeFormVisible] = useState(false);

    const departmentTreeCallback = (id, obj) => {
        setBreadCrumbShow(obj.breadcrumbs);
        setOrgID(id);
        //显示人员
        showEmployees(id,environment);
    }

    //添加组织人员返回
    let createEmployeeFormCallback = (a, d) => {
        setCreateEmployeeFormVisible(false);
    }

    const [createOrgFormVisible,setCreateOrgFormVisible] = useState(false);
    const childRef = useRef();
     //添加组织返回
    let createOrgFormCallback = (a, d) => {
        setCreateOrgFormVisible(false);
        if(a ==="ok"){
            childRef.current.reload(d.parentID);
        }
    }

    const showEmployees = (id,ev)=>{
        fetchQuery(ev, query, {
            id: id,
        }).then(data => {
            if(data.org){
                setEmployeesData(data.org.employees.map((d)=>{
                    return {
                        key: d.id,
                        id: d.id,
                        jobNum:d.jobNum,
                        name: d.name,
                        phoneNum:d.phoneNum,
                        org: data.org.name,
                        job: d.job.name,
                        title: d.title.name,
                        offerCategory: d.offerCategory.name,
                        status:d.status,
                        isPrincipal: d.employeeOrgs[0].isPrincipal
                    }
                }));
            }
        });
    }

    const start = () => {
        // setLoading(true);
        // // ajax request after empty completing
        // setTimeout(() => {
        //     setSelectedRowKeys([]);
        //     setLoading(false);
        // }, 1000);
    };

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys({ selectedRowKeys });
    };

    const showModal = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;
    const onMenuClick = ({ key }) => {
      // message.info(`Click on item ${key}`);
      setCreateOrgFormVisible(true);
    };
    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="1">添加平级</Menu.Item>
        <Menu.Item key="2">添加下级</Menu.Item>
        <Menu.Item key="3">修改</Menu.Item>
        <Menu.Item key="4">删除</Menu.Item>
      </Menu>
    );
    return (
        <div>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        组织架构
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        组织与人员
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Row gutter={16}>
                <Col className="gutter-row" span={3}>
                    <div style={{marginTop:16}}>
                        <DepartmentTree cRef={childRef} environment={environment} callback={departmentTreeCallback}/>
                    </div>
                </Col>
                <Col className="gutter-row" span={1}>
                    <div style={{marginTop:22}}>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                              <Icon type="setting" />
                            </a>
                        </Dropdown>
                        <CreateOrgForm 
                            environment={environment}
                            visible={createOrgFormVisible}
                            callback={createOrgFormCallback.bind(this)}
                        />
                    </div>
                </Col>
                <Col className="gutter-row300" span={20}>
                    <div>
                        <div className="title">
                            <div>
                                <Breadcrumb>
                                    {
                                        breadCrumbShow.map((title)=>{
                                            return (
                                                <Breadcrumb.Item>
                                                    {title}
                                                </Breadcrumb.Item>
                                            )
                                        })
                                    }
                                </Breadcrumb>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="Htable">
                            <div>
                                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                                    全不选
                                </Button>
                                <span style={{ marginLeft: 8 }}>
                                    {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
                                </span>
                            </div>
                            <div>
                                <Button type="primary" onClick={()=>{
                                    setCreateEmployeeFormVisible(true)
                                }} style={{ marginRight: 10 }}>
                                    新增
                                </Button>
                                <CreateEmployeeForm 
                                    environment={environment}
                                    visible={createEmployeeFormVisible}
                                    callback={createEmployeeFormCallback.bind(this)}
                                />

                                <Button type="danger">删除</Button>
                            </div>
                        </div>
                        <Table bordered rowSelection={rowSelection} columns={columns} dataSource={employeesData} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

function List(props) {
    const environment = props.environment;
    return (<QueryRenderer
        environment={environment}
        query={query}
        variables={{
            id: null
        }}
        render={({ error, props ,retry}) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                if (props.org) {
                    return <Listview  environment={environment} data={props.org} />
                }
            }
            return <div>Loading</div>;
        }}
    />);
}

export default List;