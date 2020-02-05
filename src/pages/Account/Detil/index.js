import React, { useState } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { 
  Breadcrumb,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  Radio,
  message
} from 'antd';

import UpdateAccount from '../mutations/UpdateAccount';

let errorshow = (m) =>{
  if(m.message.indexOf('uix_service_service_name')>-1){
    message.error('serviceid已存在',6);
  }else {
    message.error('修改出错',6);
  }
}

function Listview(props) {
	const { getFieldDecorator } = props.form;
	const [formData, setFormData] = useState(props.data);
  const environment = props.environment;
	const formItemLayout = {
		labelCol: {
		  xs: { span: 24 },
		  sm: { span: 7 },
		},
		wrapperCol: {
		  xs: { span: 24 },
		  sm: { span: 8 },
		}
	};
	const tailFormItemLayout = {
		wrapperCol: {
		  xs: {
		    span: 24,
		    offset: 0,
		  },
		  sm: {
		    span: 8,
		    offset: 7,
		  },
		}
	};
  console.log(formData)
	let handleSubmit = e => {
	    e.preventDefault();
	    props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        UpdateAccount.commit(
            environment,
            formData.id,
            values.username,
            values.roles,
            values.status,
            (response, errors) => {
              if (errors) {
                console.log('错误')
                errorshow(errors[0])
              } else {
                message.success('修改成功');
              }
            }
          );
	      }
	    });
	};
    return (
        <>
            <Breadcrumb style={{ margin: '15px 0px' }}>
                <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                <Breadcrumb.Item>账号管理</Breadcrumb.Item>
                <Breadcrumb.Item>信息修改</Breadcrumb.Item>
            </Breadcrumb>
            <Divider />
            <Form {...formItemLayout} onSubmit={handleSubmit} style={{ margin: '50px 0px' }}>
            
              <Form.Item
                label="用户名"
              >
                {getFieldDecorator('username', {
                  initialValue: formData.username,
                  rules: [{ required: true, message: '请填写用户名', whitespace: true }],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="权限角色">
                {getFieldDecorator('roles', {
                  initialValue: formData.roles,
                  rules: [{ required: true, message: '请选择角色!'}],
                })(
                  <Checkbox.Group>
                    {
                      props.authoritys.edges.map((d)=><Checkbox style={{ marginLeft: "8px" }} key={d.role} value={d.role}>{d.role}</Checkbox>)
                    }        
                  </Checkbox.Group>,
                )}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator('status',{
                  initialValue: formData.status,
                  rules: [{ required: true, message: 'Please select your sex!', whitespace: true }],
                })(
                  <Radio.Group>
                    <Radio value="ENABLE">可用</Radio>
                    <Radio value="DISABLE">禁用</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
	            <Form.Item {...tailFormItemLayout}>
	              <Button type="primary" htmlType="submit" block>
	                确 认
	              </Button>
	            </Form.Item>
	        </Form>
        </>
    );
}


function Detil(props) {
  const environment = props.environment;
  let form = props.form;
  let qsql = graphql`
    query DetilAccountRelayQuery($id: ID!) {
      account(id: $id) {
        id
        username
        roles
        status
      }
      authoritys(
        first: 100, 
        skip: 0
      ) {
        totalCount
        edges {
          role
        }
      }
    }`

  return (<QueryRenderer
      environment={environment}
      query={qsql}
      variables={{
          id: props.id
      }}
      render={({ error, props}) => {
          if (error) {
              return (
                  <div>
                      <h1>Error!</h1><br />{error.message}
                  </div>)
          } else if (props) {
              if (props.account) {
                  return <Listview environment={environment} data={props.account} authoritys={props.authoritys} form={form}/>
              }
              return <div>error , call admin!</div>;
          }
          return <div>Loading</div>;
      }}
  />);
}

export default Form.create({ name: 'Detil' })(Detil);