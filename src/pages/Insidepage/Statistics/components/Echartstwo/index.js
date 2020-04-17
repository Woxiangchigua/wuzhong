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
        var myChart = echarts.init(document.getElementById('main3'));
        // 绘制图表
        myChart.setOption({
           backgroundColor: '#fff',

			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},

			visualMap: {
				show: false,
				min: 80,
				max: 600,
				inRange: {
					colorLightness: [0, 1]
				}
			},
			series: [
				{
					name: '综合评价',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: [
						{value: 335, name: '指挥中心'},
						{value: 310, name: '警务督查中队'},
						{value: 274, name: '监察室'},
						{value: 235, name: '政治部'},
						{value: 400, name: '办公室'}
					].sort(function (a, b) { return a.value - b.value; }),
					roseType: 'radius',
					label: {
						color: 'rgba(10, 10, 10, 0.5)'
					},
					labelLine: {
						lineStyle: {
							color: 'rgba(10, 10, 10, 0.5)'
						}
					},
					itemStyle: {
						color: '#6299D7',
						shadowBlur: 200,
						shadowColor: 'rgba(0, 0, 0, 0.1)'
					},

					
				}
			]
        });
    }
    render() {
        return (
            <div id="main3" style={{ width: 300, height: 280 }}></div>
        );
    }
}

export default EchartsTest;