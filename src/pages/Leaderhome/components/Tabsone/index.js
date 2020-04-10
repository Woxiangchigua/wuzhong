import React, { Component, useEffect, useState } from 'react'
import { Button,Card } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../../../ utils/dateFormat'

const tabListNoTitle = [
  {
    key: '领导审核',
    tab: '领导审核',
  },
  {
    key: '领导指示',
    tab: '领导指示',
  },
  {
    key: '指示必达',
    tab: '指示必达',
  },
];

const contentListNoTitle = {
  领导审核: <div>
				<Link to={"/Instruct/Police"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>政治处</h2>
				<div className="line1"></div>
				<p>区政府办公室对“关于转发社会及社区防控组”依法科学精准做好社区疫...</p>
				<span>2020-04-02</span>
			</div>
				</Link>
				<Link to={"/Instruct/Police"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>政治处</h2>
				<div className="line1"></div>
				<p>区政府办公室对“关于转发社会及社区防控组”依法科学精准做好社区疫..</p>
				<span>2020-04-02</span>
			</div>
				</Link>
				<Link to={"/Instruct/Police"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>政治处</h2>
				<div className="line1"></div>
				<p>区政府办公室对“关于转发社会及社区防控组”依法科学精准做好社区疫...</p>
				<span>2020-04-02</span>
			</div>
				</Link>
				<Link to={"/Instruct/Police"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>政治处</h2>
				<div className="line1"></div>
				<p>区政府办公室对“关于转发社会及社区防控组”依法科学精准做好社区疫...</p>
				<span>2020-04-02</span>
			</div>
				</Link>
		 </div>,
  领导指示: <p>领导指示#</p>,
  指示必达: <p>指示必达#</p>,
};

export default class TabsCard extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: '领导审核',
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
          tabBarExtraContent={<a href="../../../Instruct/List">...</a>}
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
