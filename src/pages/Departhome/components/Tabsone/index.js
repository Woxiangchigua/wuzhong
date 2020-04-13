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
					<p>苏州实施“双六战时策略”筑牢疫情防线</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>重要!苏州市疫情防控工作网络通气会答记者问</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>《苏州市重污染天气应急预案》出炉!</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>苏州吴中试点建设“蓝盾”行动队应对户外险情</p>
					<span>2020-04-02</span>
				</Link>
				</div>
				<div className="topText1">
				<Link to={"/Instruct/Deplist"}>
					<p>30分钟20次电话!公安从骗子手中“抢”回受害人</p>
					<span>2020-04-02</span>
				</Link>
				</div>
			</div>
		 </div>,
  进程: <div>
					<div className="top_text">
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>党员百警驻点战“疫”最前沿 苏州公安局积极推进“双六战时策略”</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州市公安局姑苏分局观前派出所:“科技+志愿者”及时消除隐患</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州男子跨国邮寄头盔 包裹走私夹带8公斤冰毒</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>江苏苏州市公安局姑苏分局观前派出所民警李剑锋:群众平安是我们最...</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州在全省率先推出“电子路条” 一千万枚“苏城码”助力精准防控</p>
							<span>2020-04-02</span>
						</Link>
						</div>
					</div>
				</div>,
  待办: <div>
					<div className="top_text">
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州网格化社会治理“吴江样本”小平安支撑社会大稳定</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州木渎拟筹建社会治理指挥协调中心</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州市公安局警务科技助推改革平稳落地</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>“归来即是回家” 入境来苏旅客护送侧记</p>
							<span>2020-04-02</span>
						</Link>
						</div>
					</div>
				</div>,
  审核: <div>
					<div className="top_text">
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州将推动城乡社会治理体制机制改革创新</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>保护农民工一年劳动所得 苏州有大招</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>下周一苏州姑苏区25所学校复学 姑苏公安全力保驾护航</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州公安聚焦民生出实招 推动主题教育问题整改见成效</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>苏州公安推出5G公安科技产品提升警务效能</p>
							<span>2020-04-02</span>
						</Link>
						</div>
					</div>
				</div>,
  完成: <div>
					<div className="top_text">
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>创建“枫桥式公安派出所” | “共建共治共享”践行新时代“枫桥经验”</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>江苏高院发布劳动争议十大典型案例</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>碎片化的调控:南京高淳取消限购 苏州命令收紧</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>最高法指令再审13年前中学生奸杀案</p>
							<span>2020-04-02</span>
						</Link>
						</div>
						<div className="topText1">
						<Link to={"/Instruct/Deplist"}>
							<p>江苏破获公安部督办假减肥药案:利润超贩毒</p>
							<span>2020-04-02</span>
						</Link>
						</div>
					</div>
				</div>,
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
