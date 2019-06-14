
//这个文件专门处理页面请求

const express = require('express');
const http = require('http');
const path = require('path');
const router = express.Router();

router.get('/hello',(req,res)=>{
    res.render('hello',{
    name:'张三',
    userName: undefined,

    str:'<h1>hello world</h1>'

    })
});

router.get('/world', (req,res)=>{
    res.render('world.jade');
});

//首页
router.get('/',(req,res)=>{
    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;

//    1.先从数据库中来数据 直接去请求 http://localhost:3436/api/student 的数据 普通请求 http.get

    let url = `http://localhost:3436/api/student?pageNum=${pageNum}&pageSize=${pageSize}`;
    http.get(url,(response)=>{
        let buf = '';
        response.on('data',(chunk)=>{
            buf += chunk;
        });
        response.on('end',()=>{
            let data = JSON.parse(buf);

            res.render('index',{
                name:'张三',
                list:data.data.list,
                totalPage:data.data.totalPage,
                pageNum:pageNum,
                pageSize:pageSize
            });
        })
    })

});

//注册页

router.get('/register.html',(req,res)=>{
    res.render('register')
});

module.exports = router;