
const express = require('express');
const router = express.Router();
const StudentModel = require('../model/student');

//
// 新增 /api/student
router.post('/student',(req,res)=>{

    // let studentName = req.body.studentName;
    // 查询是否用这个学生
    StudentModel.findOne({
        studentName: req.body.studentName,
        grade: req.body.grade
    }).then(data=>{
        if(data){
            res.send({
                code:-1,
                msg:'学生已存在'
            })
        }else{
            let student = new StudentModel({
                studentName: req.body.studentName,
                grade: req.body.grade,
                age: req.body.age
            });
            student.save()
                .then( data =>{
                   res.send({
                       code:0,
                       msg:'ojbk',
                   })

                })
        }
    })
});

//查询  /api/student

router.get('/student',(req,res)=>{
    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) || 3;
    let studentName = req.query.studentName;
    studentName = new RegExp(studentName);

//    1.得到总条数
    StudentModel.find({studentName}).count().then( nums => {
        StudentModel.find({studentName})
            .skip(( pageNum - 1 ) *pageSize )
            .limit(pageSize)
            .then(data => {
                // console.log(nums);
                res.send({
                    code:0,
                    msg:'ok',
                    data:{
                        list: data,
                        totalPage:Math.ceil(nums / pageSize)
                    }
                })
            })
    })
});

//删除
router.delete('/student/:id',(req,res)=>{
//    1.得到url地址上的id的值

    let id = req.params.id;
    // console.log(id);
//    2.删除操作
    StudentModel.deleteOne({
        _id:id
    }).then(data =>{
    //    需要判断data中是否真的删除成功
        console.log(data);
        if(data.deletedCount > 0){
            res.send({
                code:0,
                msg:'删除成功'
            })
        }else{
            res.send({
                code:-1,
                msg:'删除失败，没有这个学生'
            })
        }

    })

});

module.exports = router;