import React, { Component, useEffect } from 'react'
import { Button } from 'antd';


export default function Table(props) {

    useEffect(
        () => {
            /* global layer */
            //询问框
            console.log(window.layui)
            // return false
            //    window.layui.('table', function(){
            var table = window.layui.table;

            //第一个实例
            table.render({
                elem: '#demo'
                , url: '' //数据接口
                , data: [
                    {
                        "id": 10002,
                        "username": "user-2",
                        "sex": "女",
                        "city": "城市-2",
                        "sign": "签名-2",
                        "experience": 650,
                        "logins": 77,
                        "wealth": "222",
                        "classify": "酱油",
                        "score": 31
                    },
                ]
                , page: { count: 100 } //开启分页
                , cols: [[ //表头
                    { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' }
                    , { field: 'username', title: '用户名', width: 80 }
                    , { field: 'sex', title: '性别', width: 80, sort: true }
                    , { field: 'city', title: '城市', width: 80 }
                    , { field: 'sign', title: '签名', width: 177 }
                    , { field: 'experience', title: '积分', width: 80, sort: true }
                    , { field: 'score', title: '评分', width: 80, sort: true }
                    , { field: 'classify', title: '职业', width: 80 }
                    , { field: 'wealth', title: '财富', sort: true }
                    , { field: '', title: "操作", toolbar: "#bar" }
                ]]
            });

            table.on('tool(test)', function (obj) {
                console.log(obj)
                let data = obj.data;
                let delIndex = layer.confirm('真的删除id为' + data.id + "的信息吗?", function (delIndex) {
                    console.log(delIndex)
                    layer.close(delIndex);
                });

            })
        }


    )







    return (
        <>
            <div>
                <table id="demo" lay-filter="test"></table>
            </div>
            <script type="text/html" id="bar">
                <button type='button' className='layui-btn layui-btn-normal layui-btn-xs'>
                    <i className="layui-icon">&#xe6b2;</i>详情
                    </button>
                <button type='button' lay-event="del" className='layui-btn layui-btn-danger layui-btn-xs'>
                    <i className="layui-icon">&#xe640;</i>删除
                    </button>
            </script>
        </>
    )


}
