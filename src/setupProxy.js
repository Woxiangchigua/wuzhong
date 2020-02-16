var express = require('express');
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        proxy({
            target: 'http://wzga.demo.xgichina.cn',
            changeOrigin: true,
        })
    );

    app.use("/www", express.static(__dirname + '/www'))
};