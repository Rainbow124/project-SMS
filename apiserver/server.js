
//1.引入express模块
const express = require('express');

const app = express();

//引入中间件
const userRouter = require('./routers/user');

//设置body中间件
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//设置允许跨域cors
app.use((req,res,next)=>{
    res.set('Access-Control-Allow-Origin','*');
    next();
})

app.use('/api/user',userRouter);

app.listen(3436);
