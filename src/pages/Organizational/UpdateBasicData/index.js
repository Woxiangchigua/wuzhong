import React from 'react';
import { 
  Modal,
  Form,
  Input,
  Button,
  message
} from 'antd';
import UpdateTitleMutation from '../mutations/UpdateTitle';
import UpdateJobMutation from '../mutations/UpdateJob';
import UpdateOfferCategoryMutation from '../mutations/UpdateOfferCategory';
import UpdateOrgCategoryMutation from '../mutations/UpdateOrgCategory';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}
const updateAction = {
    UpdateTitle: UpdateTitleMutation,
    UpdateJob: UpdateJobMutation,
    UpdateOfferCategory: UpdateOfferCategoryMutation,
    UpdateOrgCategory: UpdateOrgCategoryMutation
}
function UpdateBasicData(props) {
	const { getFieldDecorator } = props.form;
	const environment = props.environment;
	const { visible, callback, basicData} = props;

    let onCancel = () => {
        callback('cancel');
    };

    let onCreate = () => {
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            updateAction[basicData.action].commit(
                environment,
                basicData.id,
                values.name,
                values.remark || "",
                values.orderNumber,
                (response, errors) => {
                  if (errors) {
                    console.log('错误',errors)
                  } else {
                    message.success('修改成功');
                    callback('ok');
                    props.form.resetFields();
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
            title={"修改"+ basicData.title}
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="horizontal">
                <Form.Item
                  label={
                    <span>
                      ID&nbsp;
                    </span>
                  }
                  {...formItemLayout}
                >
                <span>{basicData.id}</span>
                </Form.Item>
                <Form.Item label="排序号" {...formItemLayout}>
                    {getFieldDecorator('orderNumber', {
                        rules: [{ required: true, message: '请输入排序号!' }],
                        initialValue: basicData.orderNumber
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入名称!' }],
                        initialValue: basicData.name
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="备注" {...formItemLayout}>
                    {getFieldDecorator('remark',{
                        initialValue: basicData.remark
                    })(<TextArea rows={4} />)}
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
}

export default Form.create({ name: 'UpdateBasicData' })(UpdateBasicData);