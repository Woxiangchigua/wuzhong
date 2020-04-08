import React, { Component } from 'react'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import { Table, Divider,Badge } from 'antd';
import dateFormat from '../../../../../ utils/dateFormat'
import { Link } from "react-router-dom";


function Lists(props) {
	window.layui.use('form', function(){
	  var form = window.layui.form; 
	  form.render();
	 });
    return (
        <div>
		<form className="layui-form" action="">
           <div className="layui-form-item">
			
			<div className="layui-input-block">
			  <select name="interest" lay-filter="aihao">
				<option value="">请选择想反馈的部门</option>
				<option value="0">科信办</option>
				<option value="1">指挥中心</option>
				<option value="2">派出所</option>
				<option value="3">火警</option>
				<option value="4">交警大队</option>
			  </select>
			</div>
		  </div>
		    <div className="layui-form-item layui-form-text">
			
			<div className="layui-input-block">
			  <textarea name="desc" placeholder="请输入内容" className="layui-textarea"></textarea>
			</div>
		  </div>
		  <div className="layui-form-item">
			<div className="layui-input-block">
			  <button className="layui-btn layui-btn1" lay-filter="formDemo">立即提交</button>
			  <button type="reset" className="layui-btn layui-btn-primary">重置</button>
			</div>
		  </div>
	    </form>
        </div>
        
			
    )

}
export default Lists;
