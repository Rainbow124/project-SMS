
//引入mongoose模块
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/SMS';

mongoose.connect(url,{useNewUrlParser:true})
    .then(()=>{
        console.log('数据连接成功');
    })
    .catch(error=>{
        console.log(error.message);
        console.log('数据连接失败');
    });

module.exports = mongoose;

