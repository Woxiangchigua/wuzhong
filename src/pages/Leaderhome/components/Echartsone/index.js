import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main2'));
        // 绘制图表
        myChart.setOption({
			color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622'],
            tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ['今年', '去年']
			},
			grid: {
				left: '2%',
				right: '3%',
				bottom: '0%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'value'
				}
			],
			yAxis: [
				{
					type: 'category',
					axisTick: {
						show: false
					},
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月']
				}
			],
			series: [
				{
					name: '今年',
					type: 'bar',
					stack: '总量',
					label: {
						
					},
					data: [320, 302, 341, 374, 390, 450, 420, 320, 302, 341, 374, 390]
				},
				{
					name: '去年',
					type: 'bar',
					stack: '总量',
					label: {
						
						position: 'left'
					},
					data: [120, 132, 101, 134, 190, 230, 210, 120, 132, 101, 134, 190]
				}
			]
        });
    }
    render() {
        return (
            <div id="main2" style={{ width: 450, height: 290 }}></div>
        );
    }
}

export default EchartsTest;