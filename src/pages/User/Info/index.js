import React, { useState } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import {
	Breadcrumb,
	Form,
	Input,
	Tooltip,
	Icon,
	DatePicker,
	Radio,
	Button,
	Divider
} from 'antd';
import moment from 'moment';

function Listview(props) {
	const { getFieldDecorator } = props.form;
	const [formData, setFormData] = useState(props.data);

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 9 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 6 },
		}
	};
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 6,
				offset: 9,
			},
		}
	};

	let handleSubmit = e => {
		e.preventDefault();
		props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				values['birthday'] = values.birthday.format('YYYY-MM-DD');
				values['sex'] = parseInt(values.sex);
				const pd = {};
				for (const k in values) {
					if (formData[k] !== values[k]) {
						pd[k] = values[k];
					}
				}
				console.log('post: ', pd)
			}
		});
	};
	console.log(formData)

	return (
		<>
			<Breadcrumb style={{ margin: '15px 0px' }}>
				<Breadcrumb.Item>个人设置</Breadcrumb.Item>
				<Breadcrumb.Item>个人信息</Breadcrumb.Item>
			</Breadcrumb>
			<Divider />
			<Form {...formItemLayout} onSubmit={handleSubmit} style={{ margin: '50px 0px' }}>
				<Form.Item
					label={
						<span>
							用户名&nbsp;
		            </span>
					}
				>
					<span>{formData.username}</span>
				</Form.Item>
				<Form.Item
					label="姓名"
				>
					{getFieldDecorator('name', {
						initialValue: formData.user.name,
						rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="性别">
					{getFieldDecorator('sex', {
						initialValue: formData.user.sex + "",
						rules: [{ required: true, message: 'Please select your sex!', whitespace: true }],
					})(
						<Radio.Group>
							<Radio value="Male">男</Radio>
							<Radio value="Female">女</Radio>
						</Radio.Group>
					)}
				</Form.Item>
				<Form.Item label="生日">
					{getFieldDecorator('birthday', {
						initialValue: moment(formData.user.birthday || "2000/01/01", 'YYYY-MM-DD'),
						rules: [{ type: 'object', required: true, message: 'Please select time!' }]
					})(<DatePicker />)}
				</Form.Item>
				<Form.Item label="手机">
					{getFieldDecorator('mobile', {
						initialValue: formData.user.mobile,
						rules: [{ required: true, message: 'Please input your phone number!' }],
					})(<Input />)}
				</Form.Item>
				<Form.Item
					label="简介"
				>
					{getFieldDecorator('remark', {
						initialValue: formData.user.remark,
						rules: [{ whitespace: true }],
					})(<Input />)}
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


function Info(props) {
	const environment = props.environment;
	let form = props.form;
	let qsql = graphql`
    query InfoAccountRelayQuery {
      viewer {
        id
	    username
	    user {
	    	... on Employee {
	    		id
	    		name
	    	}
	    }
	    
      }
    }`
	// if(props.loginuser.hospital){
	//   qsql = graphql`
	//     query InfoHospitalRelayQuery {
	//       hospitaluser {
	//         	id
	//     username
	//     name
	//     sex
	//     birthday
	//     mobile
	//     remark
	//       }
	//     }`
	// }

	return (<QueryRenderer
		environment={environment}
		query={qsql}
		render={({ error, props }) => {
			if (error) {
				return (
					<div>
						<h1>Error!</h1><br />{error.message}
					</div>)
			} else if (props) {
				if (props.viewer) {
					return <Listview environment={environment} data={props.viewer} form={form} />
				}
				return <div>error , call admin!</div>;
			}
			return <div>Loading</div>;
		}}
	/>);
}

export default Form.create({ name: 'Info' })(Info);