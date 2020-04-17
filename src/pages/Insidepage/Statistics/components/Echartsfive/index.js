import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import  'echarts/theme/shine.js';
class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
		
        var myChart = echarts.init(document.getElementById('main33'),'shine');
        // 绘制图表
        myChart.setOption({
			color: ['#70a3f8','#d5e4fd'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['预计进度', '实际进度']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				
				name: '进度'
			},
			yAxis: {
				type: 'category',
				data: ['完结事件', '进行事件', '待办事件', '延误事件', '紧急事件']
			},
			series: [
				{
					name: '预计进度',
					type: 'bar',
					data: [100, 80, 60, 50, 30]
				},
				{
					name: '实际进度',
					type: 'bar',
					data: [100, 67, 24, 47, 20]
				}
			]
        });
    }
    render() {
        return (
            <div id="main33" style={{ width: 1200, height: 500 }}></div>
        );
    }
}

export default EchartsTest;