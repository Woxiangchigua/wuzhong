import React, { Component } from 'react'
import './index.css'
import {
    Row,
    Col,
    Table,
    Button,
    Breadcrumb,
    Input,
    Modal,
    Form,
    Radio,
    Select,
    Tabs
} from 'antd';
const { TabPane } = Tabs;
const { TextArea } = Input;
const columns = [
    {
        title: 'ID',
        dataIndex: 'age',
        key: '1',
    },
    {
        title: '排序号',
        dataIndex: 'name',
        key: '2',
    },
    {
        title: '职称名称',
        dataIndex: 'address',
        key: '3',
    },
    {
        title: '操作',
        render: (text, record) => (
            <span>
                <Button type="link">修改</Button>
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
                        <Form.Item label="姓名" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入姓名!' }],
                            })(<Input />)}
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
export default class BasicData extends Component {
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
                <Tabs tabPosition="left">
                    <TabPane tab="职称管理" key="1">
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
                    </TabPane>
                    <TabPane tab="岗位管理" key="2">
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
                    </TabPane>
                    <TabPane tab="人员类型管理" key="3">
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
                    </TabPane>
                    <TabPane tab="组织类型管理" key="4">
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
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
