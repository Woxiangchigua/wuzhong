import React from 'react';
import { 
  Modal,
  Form,
  Input,
  Button,
  message
} from 'antd';
import CreateOrgCategoryMutation from '../mutations/CreateOrgCategory';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}

function CreateOrgCategory(props) {
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
            CreateOrgCategoryMutation.commit(
                environment,
                values.name,
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

    return (
        <>
        <Modal
            visible={visible}
            title="新增组织类型"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="horizontal">
                <Form.Item label="名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入名称!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="备注" {...formItemLayout}>
                    {getFieldDecorator('remark')(<TextArea rows={4} />)}
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
}

export default Form.create({ name: 'CreateOrgCategory' })(CreateOrgCategory);