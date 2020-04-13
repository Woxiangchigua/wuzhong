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
				<Link to={"/Insidepage/Leader"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>国保大队</h2>
				<div className="line1"></div>
				<p>苏州将推动城乡社会治理体制机制改革创新</p>
				<span>2020-04-02</span>
			</div>
				</Link>
				<Link to={"/Insidepage/Leader"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>指挥中心</h2>
				<div className="line1"></div>
				<p>保护农民工一年劳动所得 苏州有大招</p>
				<span>2020-04-02</span>
			</div>
				</Link>
				<Link to={"/Insidepage/Leader"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>治安大队</h2>
				<div className="line1"></div>
				<p>下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航</p>
				<span>2020-04-02</span>
			</div>
				</Link>
				<Link to={"/Insidepage/Leader"}>
			<div className="zhengzhi clearfix">
				<img className="img" src={require('../../../../img/police.png')} alt=""/>
				<h2>交警大队</h2>
				<div className="line1"></div>
				<p>苏州公安聚焦民生出实招 推动主题教育问题整改见成效</p>
				<span>2020-04-02</span>
			</div>
				</Link>
		 </div>,
  领导指示: <div>
	           <div className="top_text">
	           	<div className="topText1">
	           	<Link to={"/Insidepage/Leader"}>
	           		<p>苏州网格化社会治理“吴江样本”小平安支撑社会大稳定</p>
	           		<span>2020-04-07</span>
	           	</Link>
	           	</div>
	           	<div className="topText1">
	           	<Link to={"/Insidepage/Leader"}>
	           		<p>苏州木渎拟筹建社会治理指挥协调中心</p>
	           		<span>2020-04-06</span>
	           	</Link>
	           	</div>
	           	<div className="topText1">
	           	<Link to={"/Insidepage/Leader"}>
	           		<p>苏州市公安局警务科技助推改革平稳落地</p>
	           		<span>2020-04-05</span>
	           	</Link>
	           	</div>
	           	<div className="topText1">
	           	<Link to={"/Insidepage/Leader"}>
	           		<p>“归来即是回家” 入境来苏旅客护送侧记</p>
	           		<span>2020-04-04</span>
	           	</Link>
	           	</div>
	           	<div className="topText1">
	           	<Link to={"/Insidepage/Leader"}>
	           		<p>下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航</p>
	           		<span>2020-04-03</span>
	           	</Link>
	           	</div>
	           </div>
	        </div>,
  指示必达: <div>
					    <div className="top_text">
					    	<div className="topText1">
					    	<Link to={"/Insidepage/Leader"}>
					    		<p>苏州实施“双六战时策略”筑牢疫情防线</p>
					    		<span>2020-04-07</span>
					    	</Link>
					    	</div>
					    	<div className="topText1">
					    	<Link to={"/Insidepage/Leader"}>
					    		<p>重要!苏州市疫情防控工作网络通气会答记者问</p>
					    		<span>2020-04-06</span>
					    	</Link>
					    	</div>
					    	<div className="topText1">
					    	<Link to={"/Insidepage/Leader"}>
					    		<p>《苏州市重污染天气应急预案》出炉!</p>
					    		<span>2020-04-05</span>
					    	</Link>
					    	</div>
					    	<div className="topText1">
					    	<Link to={"/Insidepage/Leader"}>
					    		<p>苏州吴中试点建设“蓝盾”行动队应对户外险情</p>
					    		<span>2020-04-04</span>
					    	</Link>
					    	</div>
					    	<div className="topText1">
					    	<Link to={"/Insidepage/Leader"}>
					    		<p>30分钟20次电话!公安从骗子手中“抢”回受害人</p>
					    		<span>2020-04-03</span>
					    	</Link>
					    	</div>
					    </div>
					</div>,
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
          tabBarExtraContent={<a href="../../../Insidepage/Leader">...</a>}
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
