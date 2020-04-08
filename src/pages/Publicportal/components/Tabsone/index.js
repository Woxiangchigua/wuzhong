import React, { Component, useEffect, useState } from 'react'
import { Button,Card } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../ utils/dateFormat'

const tabListNoTitle = [
  {
    key: '紧急指令',
    tab: '紧急指令',
  },
  {
    key: '进程',
    tab: '进程',
  },
  {
    key: '待办',
    tab: '待办',
  },
  {
    key: '审核',
    tab: '审核',
  },
  {
    key: '完成',
    tab: '完成',
  },
];

const contentListNoTitle = {
  紧急指令: <div>
			<div className="top_text">
				<div className="topText1">
					<p>高标推进"护安苏城八大行动" 2020年苏州公...</p>
					<span>2020-04-02</span>
				</div>
				<div className="topText1">
					<p>下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航</p>
					<span>2020-04-02</span>
				</div>
				<div className="topText1">
					<p>下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航</p>
					<span>2020-04-02</span>
				</div>
				<div className="topText1">
					<p>下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航</p>
					<span>2020-04-02</span>
				</div>
				<div className="topText1">
					<p>下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航</p>
					<span>2020-04-02</span>
				</div>
			</div>
		 </div>,
  进程: <p>进程#</p>,
  待办: <p>待办#</p>,
  审核: <p>审核#</p>,
  完成: <p>完成#</p>,
};

export default class TabsCard extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: '紧急指令',
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
          tabBarExtraContent={<a href="../../../Instruct/Police">...</a>}
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
