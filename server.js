
//1.引入express模块
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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

//设置使用session
//使用了session中间件之后，提供了一个req.session的属性
app.use(session({
    secret:'OJBK',  //签名
    resave:true,    //重新设置session
    cookie:{
        maxAge:1000*60*2
}
}));

// 设置 req.cookies 当使用 session 的时候，它内置了 cookieParser 所以我们不需要写它了
// app.use(cookieParser());

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
