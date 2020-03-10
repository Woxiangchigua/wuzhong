import React from 'react';
import {
  useHistory,
  useLocation,
} from "react-router-dom";

import {
  Card,
  Form,
  Icon,
  Input,
  Button,
  Avatar,
  message
} from 'antd';
import Background from './background.svg';

import environment from '../../../environment';
import CreateToken from '../mutations/CreateToken';
import useLocalStorage from 'react-use-localstorage';
import { setTimeout } from 'timers';
import './login.css';
import rylogo from '../../../img/rylogo.png';

function Login(props) {
  // window.location="/User/Login/"
  if(localStorage.getItem("loginurl")){
    window.location=localStorage.getItem("loginurl")
  }
  const [token, setToken] = useLocalStorage('token', '');
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  // console.log("from:",from, token);
  const qLoginType = props.id;
  //logintype:  costomer  hospital
  var handleSubmit = e => {
    e.preventDefault();

    props.form.validateFields((err, values) => {

      if (err) {
        console.error(err);
        return;
      }

      // console.log('Received values of form: ', values);

      CreateToken.commit(
        environment(),
        values.username,
        values.password || '',
        (response, errors) => {
          if (errors) {
            message.error(errors[0].message);
            // this.setState({
            //   err: true,
            //   message: errors[0].message
            // })
          } else {
            // this.props.callback(response.generateTokenMutation)
            message.success('登录成功');
            setToken(response.createToken.token);
            setTimeout(() => history.replace(from), 100);
          }
        },
        (errors) => {
          console.log(errors.source.errors[0].message)
          message.error(errors.source.errors[0].message);
        }
      );
    });
  };

  const { getFieldDecorator } = props.form;
  const loginTitle = '吴中分局';
  const loginTitleDetil = '苏州公安局吴中分局一体化平台系统';
  return (
    <div style={{
      margin: "120px 90px 80px 80px",
      backgroundImage: `url(${Background})`
    }}
    >
      <div className="login-form-title">
        <Avatar className='login-form-logo' shape="square" src={rylogo} />
        {loginTitle}
      </div>
      <div className="login-form-title-detil">{loginTitleDetil}</div><br />
      <Card size="small" style={{ width: 300, height: 300, margin: "auto" }} >
        <div className="login-text">登录我的账号</div><br />
        <Form onSubmit={handleSubmit} layout="horizontal" className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ message: '请输入您对密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" className="login-form-button">登 录</Button>
          </Form.Item>
        </Form>
      </Card >
    </div>
  );
}

export default Form.create()(Login);;
// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);






