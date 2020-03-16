import React, { Component, useEffect, useState } from 'react'
import { Button,Card } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../ utils/dateFormat'

const tabListNoTitle = [
  {
    key: '吐槽池',
    tab: '吐槽池',
  },
  {
    key: '话题',
    tab: '话题',
  },
  {
    key: '提案',
    tab: '提案',
  },
  {
    key: '建议',
    tab: '建议',
  },
  {
    key: '求助',
    tab: '求助',
  },
];

const contentListNoTitle = {
  吐槽池: <div>
			<div className="top_text">
				<div className="topText1">
					<span className="colorBtn red">置顶</span>
					<p>《关于规范公安派出所出具证明工作的意见》解读</p>
				</div>
				<div className="topText1">
					<span className="colorBtn red">置顶</span>
					<p>《关于办理刑事案件证据若干问题的规定》解读</p>
				</div>
			</div>
			<div className="bot_text">
				<div className="clear">
					<img src={require("../../../../img/policman.png")} alt=""/>
					<div className="right_text">
						<p>如烟如雾</p>
						<span>2小时前 · 来自apple xl</span>
					</div>
				</div>
				<p>道路交通安全关乎每一个交通参与者的生命财产安全,近期各媒体报道的多起交通事故无不引起全民关注</p>
				<div className="left_sign">
					<span>#反馈&求助</span><span><i className="layui-icon radio">&#xe643;</i>交通法规</span>
				</div>
				<div className="right_sign">
					<span>3 浏览</span><span><i className="layui-icon praise">&#xe6c6;</i> 0</span>
				</div>
			</div>
		 </div>,
  话题: <p>话题#</p>,
  提案: <p>提案#</p>,
  建议: <p>建议#</p>,
  求助: <p>求助#</p>,
};

export default class TabsCard extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: '吐槽池',
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
