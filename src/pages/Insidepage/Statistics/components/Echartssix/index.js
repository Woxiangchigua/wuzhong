import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main44'));
		var colors = ['#F90506', '#ffa000', '#0acab9', '#1b9aff'];
        // 绘制图表
        myChart.setOption({
        backgroundColor: '#fff',
		color: colors,
		tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				right: 10,
				data: ['紧急事件', '延误事件', '进行中事件', '完成事件']
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '30',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: [
						{value: 8, name: '紧急事件'},
						{value: 8, name: '延误事件'},
						{value: 120, name: '进行中事件'},
						{value: 50, name: '完成事件'}
					]
				}
			]
        });
    }
    render() {
        return (
            <div id="main44" style={{ width: 700, height: 320, float:"left" }}></div>
        );
    }
}

export default EchartsTest;