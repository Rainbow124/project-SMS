
//1.引入express模块
const express = require('express');
const path = require('path');
const app = express();

//引入中间件
const pageRouter = require('./routers/page');
const userRouter = require('./routers/user');
const studentRouter = require('./routers/student');

//设置使用的模板引擎是什么，设置模板页面的存放路径
app.set('views',path.resolve(__dirname,'./views'));     //设置模板页面的存放路径
app.set('view engine','ejs');   //设置使用ejs这款模板引擎

//静态资源托管
app.use(express.static('public'));

//设置body中间件
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//设置允许跨域cors
app.use((req,res,next)=>{
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE,PUT');
    next();
})

app.use('/api/user',userRouter);
app.use('/api',studentRouter);
app.use('/',pageRouter);

app.listen(3436);
