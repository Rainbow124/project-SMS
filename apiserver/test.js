// 测试bcrypt的使用
const bcrypt = require('bcrypt');

//params1 需要加密的数据
//params2 加密的等级[1,10]
//params3 回调函数（err，data）
    //err - 加密失败
    //data - 加密成功之后的数据
/*bcrypt.hash('123',10,(err,data)=>{
    if(err){
        console.log('加密失败');
    }else{
        console.log('加密成功');
        console.log(data);
    }
});

let data = bcrypt.hashSync('456',10);
console.log(data);*/

//校验密码是否正确
bcrypt.compare('123','ac59075b964b0715',(err,isOk)=>{
    if(err){
        console.log('校验失败');
    }else{
        if(isOk){
        //    成功
            console.log('密码匹配');
        }else {
            console.log('密码匹配不成功');
        }
    }
});

/*
let isOk = bcrypt.compareSync('456','250cf8b51c773f3f8dc8b4be867a9a02');
console.log(isOk);*/
