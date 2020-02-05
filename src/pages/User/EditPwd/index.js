import React from 'react';
import { 
  Breadcrumb,
  Form,
  Input,
  Button,
  Divider
} from 'antd';


function EditPwd(props) {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  let compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  let validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  let handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
    return (
        <>
            <Breadcrumb style={{ margin: '15px 0px' }}>
                <Breadcrumb.Item>个人设置</Breadcrumb.Item>
                <Breadcrumb.Item>密码修改</Breadcrumb.Item>
            </Breadcrumb>
            <Divider />
            <Form {...formItemLayout} onSubmit={handleSubmit} style={{ margin: '50px 0px' }}>
            
            <Form.Item label="输入旧密码" hasFeedback>
              {getFieldDecorator('oldpassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item label="输入新密码" hasFeedback>
              {getFieldDecorator('newpassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认新密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
            
        </>
    );
}

export default Form.create({ name: 'EditPwd' })(EditPwd);