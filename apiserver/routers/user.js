
const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

// /api/user/sign-up

router.post('/sign-up',(req,res)=>{
    UserModel.findOne({
        username:req.body.username
    }).then(data=>{
        if(data){
            res.send({
                code: -1,
                msg:'用户名已注册'
            })
        }else{
        //    先加密
        let hashPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword;
        let user = new UserModel(req.body);
        user.save()
            .then(data => {
                res.send({
                    code: 0,
                    msg: 'ok'
                })
            })
            .catch(error => {
                console.log(error.message);
                res.send({
                    code: -1,
                    msg: '网路异常，请稍后重试'
                })
            })
        }
    })
})