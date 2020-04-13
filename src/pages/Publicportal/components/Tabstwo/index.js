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
	   <Link to={"/Insidepage/Law"}>
			 <div className="clear">
			 	<span className="colorBtn blue">法律</span>
			 	<div className="right_text">
					<p>中华人民共和国政府信息公开条例</p>
					<span>2019年08月07日 14:07</span>
			 	</div>
			 </div>
			 </Link>
			 <Link to={"/Insidepage/Law"}>
			 <div className="clear">
			 	<span className="colorBtn red">法规</span>
			 	<div className="right_text">
			 		<p>公安机关互联网安全监督检查规定(公安部令第151号)</p>
			 		<span>2019年08月07日 13:48</span>
			 	</div>
			 </div>
			 </Link>
			 <Link to={"/Insidepage/Law"}>
			 <div className="clear">
			 	<span className="colorBtn purple">规章</span>
			 	<div className="right_text">
			 		<p>关于办理"套路贷"刑事案件若干问题的意见</p>
			 		<span>2019年04月18日 09:32</span>
			 	</div>
			 </div>
			 </Link>
			 <Link to={"/Insidepage/Law"}>
			 <div className="clear">
			 	<span className="colorBtn green">规范</span>
			 	<div className="right_text">
			 		<p>印发《关于办理刑事案件严格排除非法证据若干问题的规定》的通知</p>
			 		<span>2019年03月17日 13:27</span>
			 	</div>
			 </div>
			 </Link>
		  </div>,
  上级指令: <div>
					<Link to={"/Insidepage/Law"}>
					 <div className="clear">
						<span className="colorBtn blue">指令</span>
						<div className="right_text">
							<p>苏州市公安局以问题解决确保主题教育实效</p>
							<span>2019年08月07日 14:07</span>
						</div>
					 </div>
					 </Link>
					 <Link to={"/Insidepage/Law"}>
					 <div className="clear">
						<span className="colorBtn blue">指令</span>
						<div className="right_text">
							<p>苏州市公安局苏州高新区分局招聘警务辅助人员简章</p>
							<span>2019年08月07日 13:48</span>
						</div>
					 </div>
					 </Link>
					 <Link to={"/Insidepage/Law"}>
					 <div className="clear">
						<span className="colorBtn blue">指令</span>
						<div className="right_text">
							<p>发布《通告》:250克以上无人机实名登记</p>
							<span>2019年04月18日 09:32</span>
						</div>
					 </div>
					 </Link>
					 <Link to={"/Insidepage/Law"}>
					 <div className="clear">
						<span className="colorBtn blue">指令</span>
						<div className="right_text">
							<p>姑苏分局观前派出所:“科技+志愿者”及时消除隐患</p>
							<span>2019年03月17日 13:27</span>
						</div>
					 </div>
					 </Link>
	       </div>,
  工作要求: <div>
						<Link to={"/Insidepage/Law"}>
						 <div className="clear">
							<span className="colorBtn red">要求</span>
							<div className="right_text">
								<p>关于印发《赌博违法案件裁量指导意见》的通知</p>
								<span>2019年08月07日 14:07</span>
							</div>
						 </div>
						 </Link>
						 <Link to={"/Insidepage/Law"}>
						 <div className="clear">
							<span className="colorBtn red">要求</span>
							<div className="right_text">
								<p>公安机关人民警察纪律条令</p>
								<span>2019年08月07日 13:48</span>
							</div>
						 </div>
						 </Link>
						 <Link to={"/Insidepage/Law"}>
						 <div className="clear">
							<span className="colorBtn red">要求</span>
							<div className="right_text">
								<p>中华人民共和国人民警察法</p>
								<span>2019年04月18日 09:32</span>
							</div>
						 </div>
						 </Link>
						 <Link to={"/Insidepage/Law"}>
						 <div className="clear">
							<span className="colorBtn red">要求</span>
							<div className="right_text">
								<p>中国共产党纪律处分条例</p>
								<span>2019年03月17日 13:27</span>
							</div>
						 </div>
						 </Link>
	        </div>,
  经验案例: <div>
							<Link to={"/Insidepage/Law"}>
							 <div className="clear">
								<span className="colorBtn green">案例</span>
								<div className="right_text">
									<p>苏州公安联袂全国六地公安隔空合唱</p>
									<span>2019年08月07日 14:07</span>
								</div>
							 </div>
							 </Link>
							 <Link to={"/Insidepage/Law"}>
							 <div className="clear">
								<span className="colorBtn green">案例</span>
								<div className="right_text">
									<p>高标推进“护安苏城八大行动”</p>
									<span>2019年08月07日 13:48</span>
								</div>
							 </div>
							 </Link>
							 <Link to={"/Insidepage/Law"}>
							 <div className="clear">
								<span className="colorBtn green">案例</span>
								<div className="right_text">
									<p>2020年苏州公安将全力打好创新发展“升段赛”</p>
									<span>2019年04月18日 09:32</span>
								</div>
							 </div>
							 </Link>
							 <Link to={"/Insidepage/Law"}>
							 <div className="clear">
								<span className="colorBtn green">案例</span>
								<div className="right_text">
									<p>苏州园区一起“民间借贷”竟涉嫌“套路贷” 移送公安机关处理</p>
									<span>2019年03月17日 13:27</span>
								</div>
							 </div>
							 </Link>
					</div>,
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
          tabBarExtraContent={<a href="../../../Insidepage/Law">...</a>}
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
