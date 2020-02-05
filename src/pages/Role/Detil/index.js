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
  message,
  Tree
} from 'antd';
const { TreeNode } = Tree;
// import UpdateAuthority from '../mutations/UpdateAuthority';

let errorshow = (m) => {
  if (m.message.indexOf('uix_service_service_name') > -1) {
    message.error('serviceid已存在', 6);
  } else {
    message.error('修改出错', 6);
  }
}

const renderTreeNodes = data =>
  data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} {...item} />;
  });

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


  const powerD = formData.data
  const Diffc = ['Mutation', 'Query', 'token'];
  const Mutation = props.data.data.Mutation;
  const Query = props.data.data.Query;
  const treeBuildData = [];
  const allcheckedKeys = [];
  for (const vn in powerD) {
    if (Diffc.indexOf(vn) > -1) continue;
    const vb = {
      title: vn,
      key: vn,
      children: []
    };
    for (const vnn in Query) {
      if (vnn.toLowerCase().indexOf(vn.toLowerCase()) > -1) {
        vb.children.push({
          title: vnn,
          key: "Query_" + vnn
        });
        if (Query[vnn].Permissions) {
          allcheckedKeys.push("Query_" + vnn);
        }
      }
    }
    for (const vnn in Mutation) {
      if (vnn.toLowerCase().indexOf(vn.toLowerCase()) > -1) {
        vb.children.push({
          title: vnn,
          key: "Mutation_" + vnn
        });
        if (Mutation[vnn].Permissions) {
          allcheckedKeys.push("Mutation_" + vnn);
        }
      }
    }
    treeBuildData.push(vb);
  }
  // setcheckData(allcheckedKeys);
  const [checkData, setcheckData] = useState(allcheckedKeys);
  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    setcheckData(checkedKeys);
  };

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const QueryD = ['Query'];
        const MutationD = ['Mutation'];
        const checkD = [];
        checkData.forEach((pString) => {
          const pArr = pString.split('_');
          if (pArr[0] == "Query" && QueryD.indexOf(pArr[1]) == -1) {
            QueryD.push(pArr[1]);
          }
          if (pArr[0] == "Mutation" && MutationD.indexOf(pArr[1]) == -1) {
            MutationD.push(pArr[1]);
          }
        });
        checkD.push(QueryD);
        checkD.push(MutationD);
        console.log('===>', checkD)
        // return;
        // UpdateAuthority.commit(
        //   environment,
        //   values.role,
        //   checkD,
        //   (response, errors) => {
        //     if (errors) {
        //       console.log('错误')
        //       errorshow(errors[0])
        //     } else {
        //       message.success('提交成功');
        //     }
        //   }
        // );
      }
    });
  };
  return (
    <>
      <Breadcrumb style={{ margin: '15px 0px' }}>
        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item>角色管理</Breadcrumb.Item>
        <Breadcrumb.Item>信息修改</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <Form {...formItemLayout} onSubmit={handleSubmit} style={{ margin: '50px 0px' }}>

        <Form.Item
          label="角色名"
        >
          {getFieldDecorator('role', {
            initialValue: formData.role,
            rules: [{ required: true, message: '请填写角色名', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block>
            确 认
	              </Button>
        </Form.Item>
      </Form>
      <div>
        <Tree
          checkable
          defaultExpandAll
          onCheck={onCheck}
          checkedKeys={checkData}
        >
          {renderTreeNodes(treeBuildData)}
        </Tree>
      </div>
    </>
  );
}


function Detil(props) {
  const environment = props.environment;
  let form = props.form;
  let qsql = graphql`
    query DetilRoleRelayQuery($role: String!) {
      authority(role: $role) {
        role
        data
      }
    }`
  console.log(props)
  return (<QueryRenderer
    environment={environment}
    query={qsql}
    variables={{
      role: props.id || ""
    }}
    render={({ error, props }) => {
      if (error) {
        return (
          <div>
            <h1>Error!</h1><br />{error.message}
          </div>)
      } else if (props) {
        if (props.authority) {
          return <Listview environment={environment} data={props.authority} form={form} />
        }
        return <div>error , call admin!</div>;
      }
      return <div>Loading</div>;
    }}
  />);
}

export default Form.create({ name: 'Detil' })(Detil);