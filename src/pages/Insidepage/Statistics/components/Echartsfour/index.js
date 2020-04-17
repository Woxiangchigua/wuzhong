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
		
        var myChart = echarts.init(document.getElementById('main22'),'shine');
        // 绘制图表
        myChart.setOption({
			color: ['#1fc9b8'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5星'],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '直接访问',
					type: 'bar',
					barWidth: '60%',
					data: [10, 52, 200, 334, 390, 330, 220, 390, 330, 220]
				}
			]
        });
    }
    render() {
        return (
            <div id="main22" style={{ width: 380, height: 200 }}></div>
        );
    }
}

export default EchartsTest;