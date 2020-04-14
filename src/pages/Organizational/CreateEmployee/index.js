import React , { useState }from 'react';
import { 
  Modal,
  Form,
  Input,
  Radio,
  Button,
  message,
  Select,
} from 'antd';

import DepartmentTreeSelect from '@/components/DepartmentTreeSelect'
import JobSelect from '@/components/JobSelect'
import TitleSelect from '@/components/TitleSelect'
import OfferCategorySelect from '@/components/OfferCategorySelect'
import CreateEmployeeMutation from '../mutations/CreateEmployee';



const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}

function CreateEmployee(props) {
	const { getFieldDecorator } = props.form;
	const environment = props.environment;
	const { visible, callback} = props;
    const [formRef, setFormRef] = useState();

	let showModal = () => {
        // this.setState({ visible: true });
    };

    let onCancel = () => {
        callback('cancel');
    };

    let onCreate = () => {
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            CreateEmployeeMutation.commit(
                environment,
                values.name,
                values.phoneNum,
                values.jobID,
                values.offerCategoryID,
                values.jobNum,
                values.orgID,
                values.titleID,
                values.status,
                values.isPrincipal === "yes" ? true : false,
                values.remark || "",
                (response, errors) => {
                  if (errors) {
                    console.log('错误')
                  } else {
                    message.success('新增成功');
                    callback('ok');
                  }
                }
            );
          }
        });
       
    };

    //部门选择器组件返回接收
	let departmentTreeSelectCallback = (id) => { 
		console.log("departmentTreeSelectCallback=>",id)
        props.form.setFieldsValue({
          orgID: id
        });
	}

    //工作组件返回接收
    let jobSelectCallback = (id) => { 
        console.log("jobSelectCallback=>",id)
        props.form.setFieldsValue({
          jobID: id
        });
    }

    //职称组件返回接收
    let titleSelectCallback = (id) => { 
        console.log("titleSelectCallback=>",id)
        props.form.setFieldsValue({
          titleID: id
        });
    }

    //职称组件返回接收
    let offerCategorySelectCallback = (id) => { 
        console.log("offerCategorySelectCallback=>",id)
        props.form.setFieldsValue({
          offerCategoryID: id
        });
    }

    return (
        <>
        <Modal
            visible={visible}
            title="新增人员"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="horizontal">
                <Form.Item label="工号" {...formItemLayout}>
                    {getFieldDecorator('jobNum', {
                        rules: [{ required: true, message: '请输入工号!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="姓名" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入姓名!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="手机号码" {...formItemLayout}>
                    {getFieldDecorator('phoneNum', {
                        rules: [{ required: true, message: '请输入手机号码!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="所属组织" {...formItemLayout}>
                    {getFieldDecorator('orgID', {
                        rules: [{ required: true, message: '请选择组织！' }],
                    })(
                         <DepartmentTreeSelect style={{ 'width': '100%'}} environment={environment} callback={departmentTreeSelectCallback}/>,
                    )}
                </Form.Item>
                <Form.Item label="岗位" {...formItemLayout}>
                    {getFieldDecorator('jobID', {
                        rules: [{ required: true, message: '请选择岗位!' }],
                    })(
                        <JobSelect style={{ 'width': '100%'}} environment={environment} callback={jobSelectCallback}/>,
                    )}
                </Form.Item>
                <Form.Item label="职称" {...formItemLayout}>
                    {getFieldDecorator('titleID', {
                        rules: [{ required: true, message: '请选择职称!' }],
                    })(
                        <TitleSelect style={{ 'width': '100%'}} environment={environment} callback={titleSelectCallback}/>,
                    )}
                </Form.Item>
                <Form.Item label="人员类型" {...formItemLayout}>
                    {getFieldDecorator('offerCategoryID', {
                        rules: [{ required: true, message: '请选择人员类型!' }],
                    })(
                       <OfferCategorySelect style={{ 'width': '100%'}} environment={environment} callback={offerCategorySelectCallback}/>,
                    )}
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: '请选择状态!' }],
                        initialValue: 'EMPLOYEE_ON_JOB',
                    })(
                        <Select placeholder="选择状态">
                            <Option value="EMPLOYEE_ON_JOB">在职</Option>
                            <Option value="EMPLOYEE_LEAVE_JOB">离职</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="负责人" {...formItemLayout}>
                    {getFieldDecorator('isPrincipal', {
                        initialValue: 'yes',
                    })(
                        <Radio.Group>
                            <Radio value="yes">是</Radio>
                            <Radio value="no">否</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item>
                <Form.Item label="备注" {...formItemLayout}>
                    {getFieldDecorator('remark')(<TextArea rows={4} />)}
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
}

export default Form.create({ name: 'CreateEmployee' })(CreateEmployee);