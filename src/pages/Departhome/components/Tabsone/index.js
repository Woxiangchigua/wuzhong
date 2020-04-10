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
				<Link to={"/Instruct/Deplist"}>
					<p>指挥中心：战"疫"先锋,用心用情筑牢疫情"防控墙"</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>指挥中心: 警务科技助推改革平稳落地</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>指挥中心: 该辖区居民刘某可能被骗,正在与诈骗嫌疑人通话中</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>指挥中心: 冒充社保,司法工作人员 30人跨国电信诈骗</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>指挥中心:  冒充社保,司法工作人员 30人跨国电信诈骗</p>
					<span>2020-04-02</span>
				</Link>
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
          tabBarExtraContent={<a href="../../../Instruct/Deplist">...</a>}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
		  bordered={false} className="head3-1 layui-col-md5" style={{ marginTop: 10 }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    );
  }
}
