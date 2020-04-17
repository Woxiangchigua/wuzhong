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
		
        var myChart = echarts.init(document.getElementById('main11'),'shine');
        // 绘制图表
        myChart.setOption({
			color: ['#37a2da','#67e0e3', '#21c7b9', '#d48265', '#91c7ae','#749f83',  '#ca8622'],
            tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
				name: "月"
			},
			yAxis: {
				type: 'value',
				name: "指令数量"
			},
			series: [{
				data: [820, 932, 901, 934, 1290, 1330, 1320, 884, 765, 1489, 1233, 1367],
				type: 'line',
				areaStyle: {}
			}]
        });
    }
    render() {
        return (
            <div id="main11" style={{ width: 380, height: 250 }}></div>
        );
    }
}

export default EchartsTest;