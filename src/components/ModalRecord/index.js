import React from 'react';
import { Modal, Form, Button, Input } from 'antd';
import UpdateAppointmentStatusMutation from '../../model/UpdateAppointmentStatus';

const formItemLayout = {
	labelCol: {
	  xs: { span: 24 },
	  sm: { span: 6 },
	},
	wrapperCol: {
	  xs: { span: 24 },
	  sm: { span: 12},
	}
};

function ModalRecord(props) {
	const { getFieldDecorator } = props.form;
	const {Visible, SetShow} = props;
	const environment = props.environment;

	const id = props.id;
	let handleSubmit = e => {
	    e.preventDefault();
	    props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
		        UpdateAppointmentStatusMutation.commit(
				    environment,
				    id,
				  	4,
				  	'[诊断]'+ values.remark1 + '[开药]' + values.remark2,
				    (response, errors) => {
				      if (errors) {
				        console.log('错误')
				      } else {
				        SetShow(false);
				      }
					}
				)
	      	}
	    });
	};

	let handleOk = () => {
		SetShow(false);
	};

	let handleCancel = () => {
		SetShow(false);
	};
    return (
    	<Modal
          visible={Visible}
          title="诊断"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              返回
            </Button>,
            <Button key="submit" type="primary"  loading={false} onClick={handleSubmit}>
              确认
            </Button>,
          ]}
        >
          <Form {...formItemLayout}>
			    <Form.Item label="诊断">
			      {getFieldDecorator('remark1', {
			        rules: [
			          {
			            required: true,
			            message: '信息描述',
			          },
			        ],
			      })(<Input.TextArea rows={4} placeholder="信息描述" />)}
			    </Form.Item>
			    <Form.Item label="开药">
			      {getFieldDecorator('remark2', {
			        rules: [
			          {
			            required: true,
			            message: '信息描述',
			          },
			        ],
			      })(<Input.TextArea rows={4} placeholder="信息描述" />)}
			    </Form.Item>
			</Form>
        </Modal>
			
    );
}

export default Form.create({ name: 'ModalRecord' })(ModalRecord);