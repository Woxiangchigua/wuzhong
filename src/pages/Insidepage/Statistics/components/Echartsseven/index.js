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
		
        var myChart = echarts.init(document.getElementById('main55'),'shine');
		var colors = ['#5793f3', '#22cab9', '#675bba'];
        // 绘制图表
        myChart.setOption({
		color: colors,
		tooltip: {
			trigger: 'none',
			axisPointer: {
				type: 'cross'
			}
		},
		legend: {
			data:['2019', '2020']
		},
		grid: {
			top: 70,
			bottom: 50
		},
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true
				},
				axisLine: {
					onZero: false,
					lineStyle: {
						color: colors[1]
					}
				},
				axisPointer: {
					label: {
						formatter: function (params) {
							return '评价指数  ' + params.value
								+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
						}
					}
				},
				data: ['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7', '2020-8', '2020-9', '2020-10', '2020-11', '2020-12']
			},
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true
				},
				axisLine: {
					onZero: false,
					lineStyle: {
						color: colors[0]
					}
				},
				axisPointer: {
					label: {
						formatter: function (params) {
							return '评价指数  ' + params.value
								+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
						}
					}
				},
				data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: [
					{
						name: '2019',
						type: 'line',
						xAxisIndex: 1,
						smooth: true,
						data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]
					},
					{
						name: '2020',
						type: 'line',
						smooth: true,
						data: [3, 5, 11, 18, 48, 69, 231, 46, 55, 18, 10, 5]
					}
				]
        });
    }
    render() {
        return (
            <div id="main55" style={{ width: 1100, height: 320 }}></div>
        );
    }
}

export default EchartsTest;