import React, { Component, useEffect, useState } from 'react'
import { Button,Card } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../ utils/dateFormat'

const tabListNoTitle = [
  {
    key: '法律法规',
    tab: '法律法规',
  },
  {
    key: '上级指令',
    tab: '上级指令',
  },
  {
    key: '工作要求',
    tab: '工作要求',
  },
  {
    key: '经验案例',
    tab: '经验案例',
  },
];

const contentListNoTitle = {
  法律法规: <div>
			 <div className="clear">
			 	<span className="colorBtn blue">法律</span>
			 	<div className="right_text">
			 		<p>中华人民共和国政府信息公开条例</p>
			 		<span>2019年08月07日 14:07</span>
			 	</div>
			 </div>
			 <div className="clear">
			 	<span className="colorBtn red">法规</span>
			 	<div className="right_text">
			 		<p>公安机关互联网安全监督检查规定(公安部令第151号)</p>
			 		<span>2019年08月07日 13:48</span>
			 	</div>
			 </div>
			 <div className="clear">
			 	<span className="colorBtn purple">规章</span>
			 	<div className="right_text">
			 		<p>关于办理"套路贷"刑事案件若干问题的意见</p>
			 		<span>2019年04月18日 09:32</span>
			 	</div>
			 </div>
			 <div className="clear">
			 	<span className="colorBtn green">规范</span>
			 	<div className="right_text">
			 		<p>印发《关于办理刑事案件严格排除非法证据若干问题的规定》的通知</p>
			 		<span>2019年03月17日 13:27</span>
			 	</div>
			 </div>			
		  </div>,
  上级指令: <p>上级指令#</p>,
  工作要求: <p>工作要求#</p>,
  经验案例: <p>经验案例#</p>,
};

export default class TabsCard extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: '法律法规',
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          tabBarExtraContent={<a href="#">...</a>}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
		  bordered={false} className="head3 layui-col-md5" style={{ marginTop: 10 }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    );
  }
}
