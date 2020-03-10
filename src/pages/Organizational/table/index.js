import React, { Component } from 'react'
import { Row, Col, Table, Button, Breadcrumb, Input, Modal, Form, Radio, Select, } from 'antd';
import DragTree from '../../../components/Tree/DragTree/index'
import './index.css'
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const columns = [
    {
        title: 'ID',
        dataIndex: 'age',
        key: '1',
    },
    {
        title: '警员编号',
        dataIndex: 'name',
        key: '2',
    },
    {
        title: '姓名',
        dataIndex: 'address',
        key: '3',
    },
    {
        title: '手机',
        dataIndex: 'name',
        key: '4',
    },
    {
        title: '所属部门',
        dataIndex: 'age',
        key: '5',
    },
    {
        title: '岗位',
        dataIndex: 'address',
        key: '6',
    },
    {
        title: '职称',
        dataIndex: 'name',
        key: '7',
    },
    {
        title: '人员类型',
        dataIndex: 'age',
        key: '8',
    },
    {
        title: '状态',
        dataIndex: 'address',
        key: '9',
    },
    {
        title: '负责人',
        dataIndex: 'name',
        key: '10',
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

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增人员"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="horizontal">
                        <Form.Item label="警员编号" {...formItemLayout}>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入警员编号!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="姓名" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入姓名!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="手机号码" {...formItemLayout}>
                            {getFieldDecorator('tel', {
                                rules: [{ required: true, message: '请输入手机号码!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="所属组织" {...formItemLayout}>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: 'Please select your country!' }],
                            })(
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="岗位" {...formItemLayout}>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: 'Please select your country!' }],
                            })(
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="职称" {...formItemLayout}>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: 'Please select your country!' }],
                            })(
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="人员类型" {...formItemLayout}>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: 'Please select your country!' }],
                            })(
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="状态" {...formItemLayout}>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: 'Please select your country!' }],
                            })(
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="负责人" {...formItemLayout}>
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">是</Radio>
                                    <Radio value="private">否</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="备注" {...formItemLayout}>
                            {getFieldDecorator('description')(<TextArea rows={4} />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default class personnel extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        visible: false,
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Row gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <DragTree />
                    </Col>
                    <Col className="gutter-row300" span={20}>
                        <div>
                            <div className="title">
                                <div>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            Application Center
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            Application List
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <div>
                                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                                </div>
                            </div>
                            <div className="Htable">
                                <div>
                                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                                        全不选
                                    </Button>
                                    <span style={{ marginLeft: 8 }}>
                                        {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
                                    </span>
                                </div>
                                <div>
                                    <Button type="primary" onClick={this.showModal} style={{ marginRight: 10 }}>
                                        新增
                                    </Button>
                                    <CollectionCreateForm
                                        wrappedComponentRef={this.saveFormRef}
                                        visible={this.state.visible}
                                        onCancel={this.handleCancel}
                                        onCreate={this.handleCreate}
                                    />
                                    <Button type="danger">删除</Button>
                                </div>
                            </div>
                            <Table bordered rowSelection={rowSelection} columns={columns} dataSource={data} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
