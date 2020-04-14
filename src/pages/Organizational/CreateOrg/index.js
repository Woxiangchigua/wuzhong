import React  from 'react';
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
import OrgCategorySelect from '@/components/OrgCategorySelect'
import CreateOrgMutation from '../mutations/CreateOrg';



const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}

function CreateOrg(props) {
	const { getFieldDecorator } = props.form;
	const environment = props.environment;
	const { visible, callback} = props;

    let onCancel = () => {
        callback('cancel');
    };

    let onCreate = () => {
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            CreateOrgMutation.commit(
                environment,
                values.name,
                values.parentID,
                values.orgCategoryID,
                values.remark || "",
                (response, errors) => {
                  if (errors) {
                    console.log('错误')
                  } else {
                    message.success('新增成功');
                    callback('ok', values);
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
          parentID: id
        });
	}

    //职称组件返回接收
    let orgCategorySelectCallback = (id) => { 
        console.log("orgCategorySelectCallback=>",id)
        props.form.setFieldsValue({
          orgCategoryID: id
        });
    }

    return (
        <>
        <Modal
            visible={visible}
            title="新增组织"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="horizontal">
                <Form.Item label="组织名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入组织名称!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="上级组织" {...formItemLayout}>
                    {getFieldDecorator('parentID', {
                        rules: [{ required: true, message: '请选择组织！' }],
                    })(
                        <DepartmentTreeSelect style={{ 'width': '100%'}} environment={environment} callback={departmentTreeSelectCallback}/>,
                    )}
                </Form.Item>
                <Form.Item label="类型" {...formItemLayout}>
                    {getFieldDecorator('orgCategoryID', {
                        rules: [{ required: true, message: '请选择类型!' }],
                    })(
                        <OrgCategorySelect style={{ 'width': '100%'}} environment={environment} callback={orgCategorySelectCallback}/>,
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

export default Form.create({ name: 'CreateOrg' })(CreateOrg);