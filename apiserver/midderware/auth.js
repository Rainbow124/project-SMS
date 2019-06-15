
const jwt = require('jsonwebtoken');

//专门用来检验token的中间件函数
module.exports = (req,res,next)=>{
//    检验token的有效性
    //1.从请求头中获取token
    let token = req.get('Access_Token');
//    2.校验它
    try{
        //检验成功
        jwt.verify(token,'OJBK');
        next();
    }catch (e) {
        //校验失败-直接告诉前端，token校验失败
        res.send({
            code:-2,
            msg:'token校验失败'
        })
    }
};