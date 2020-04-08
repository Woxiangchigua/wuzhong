import React, { Component, useEffect, useState } from 'react'
import { Button,Card } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../ utils/dateFormat'

const tabListNoTitle = [
  {
    key: '公安情报',
    tab: '公安情报',
  },
  {
    key: '巡防指导',
    tab: '巡防指导',
  },
];

const contentListNoTitle = {
  公安情报: <div>
			 <div className="clear">
			 	<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
			 	<div className="right_text">
			 		<p>关于苏州市公安局网站域名变更的通知</p>
			 		<span>2020-01-06</span>
			 	</div>
			 </div>
			 <div className="clear">
			 	<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
			 	<div className="right_text">
			 		<p>吴江区公安局招录警务辅警人员简章</p>
			 		<span>2020-03-10</span>
			 	</div>
			 </div>
			 <div className="clear">
			 	<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
			 	<div className="right_text">
			 		<p>关于增设道路交通技术监控系统的通告</p>
			 		<span>2020-03-09</span>
			 	</div>
			 </div>
			 <div className="clear">
			 	<i className="layui-icon reply-fill left_icon" style={{ marginRight: 10 }}>&#xe611;</i>
			 	<div className="right_text">
			 		<p>关于增加非现场违法预约办理点的通告</p>
			 		<span>2020-03-02</span>
			 	</div>
			 </div>
		  </div>,
  巡防指导: <p>巡防指导#</p>,
};

export default class TabsCard extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: '公安情报',
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
		  bordered={false} className="head3-2 layui-col-md5" style={{ marginTop: 10 }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    );
  }
}
