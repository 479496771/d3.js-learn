const express = require('express')
const fs = require('fs')
const path = require('path');

const app = express()
var exStatic = require("express-static");
app.use(exStatic('./')); //这一句中的'./'是静态页面的相对路径。
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') //设置请求方法
    res.header('Access-Control-Allow-Headers', 'X-Access-Token, Content-Type'); //设置请求头
    res.header('Access-Control-Max-Age', '5000'); //设置了请求方法就会预检验，设置5s之内不进行预检验
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method === "OPTIONS") { //过滤预检请求
        res.status('200').json({
            state: 'ok'
        });
    } else {
        next();
    }
})

app.use('shujuduru.html', (req, res) => {
    var fileName = path.resolve(path.join(__dirname, "shujuduru.html"))
    console.log(fileName)

    fs.readFile(fileName, function (err, data) {
        if (err)
            console.log("对不起，您所访问的路径出错");
        else {
            res.sendFile(fileName);
        }
    })
})



app.listen(5050)