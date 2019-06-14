
let curPageNum = 1; //当前的页码数
let searchVal = ''; //搜索内容

function getStudentList() {

    $.ajax({
        url:'http://localhost:3436/api/student',
        data:{
            pageNum: curPageNum,
            pageSize: 5,
            studentName: searchVal,
        },
        method:"get",

        success:function (res) {
            // console.log(res);
            if(res.code !== 0){
                alert(res.msg);
                return;
            }
            let studentList = res.data.list;
            // console.log(studentList);
            let totalPage = res.data.totalPage;
            //    处理列表begin
            let html = '';
            for(var i = 0; i < studentList.length;i++){
                let item = studentList[i];
                html +=`
         <tr data-id="${ item._id }">
            <td>${ i + 1 }</td>
            <td>${item.studentName}</td>
            <td>${item.age}</td>
            <td>${item.grade}</td>
            <td><button class="btn btn-danger">删除</button></td>
          </tr>
        `;
            }
            $('#tbody').html(html);
//    处理列表 end

//    处理分页 begin

            let page = '';
            page +=`
    <li data-page="${curPageNum - 1 < 1 ? 1 : curPageNum - 1}" class="lv-pagination__item prev"><a href="javascript:;"><i class="iconfont icon-doubleleft"></i></a></li>
    `;
            for (var i = 1; i <= totalPage; i++) {
                page +=`
            <li data-page="${i}" class="lv-pagination__item ${(i === curPageNum) ? 'active' : ''}"><a href="javascript:;">${ i }</a></li>
        `
            }

            page += `
    <li data-page="${curPageNum + 1 > totalPage ? totalPage : curPageNum + 1}" class="lv-pagination__item next"><a href="javascript:;"><i class="iconfont icon-doubleright"></i></a></li>
    `;

            $('.lv-pagination ul').html(page);

            // 处理分页 end
        }
    });

}

$(function () {
    //   1. 获取到所有学生的信息
    getStudentList();
//    2.监听分页按钮的点击事件
    $('.lv-pagination').on('click','.lv-pagination__item',function () {
        //    ?我点击的是第几页
        // alert(1);
        let page = $(this).data('page');

        //    当前页不等于我想要去的页的时候，就下一步
        if(curPageNum !== page){
            //    请求当前页的数据
            curPageNum = page;
            getStudentList();
        }
    })

//    3.删除操作
    $('#tbody').on('click','.btn-danger',function () {
        //    当前学生的id数据
        let id = $(this).parents('tr').data('id');

        $.ajax({
            url:`http://localhost:3436/api/student/${id}`,
            method:'DELETE',
            success:function (res) {
                if(res.code === 0){
                    //    删除成功

                    getStudentList();
                }else{
                    alert(res.msg);
                }
            }
        })
    });

//    4.搜索操作
    $('#searchBtn').click(function () {

        curPageNum = 1;
        searchVal = $('#searchVal').val();
        console.log(searchVal);
        getStudentList();
    })
//    5.添加操作
    $('#submit').click(function () {

        let usernameVal = $('#userName').val();
        let grade = $('#class').val();


        $.ajax({
            url:`http://localhost:3436/api/student`,
            method: 'POST',
            data:{
                studentName: usernameVal,
                grade:grade
            },
            dataType:'json',

            success:function (res) {
                console.log(res);
                if(res.code === 0){
                    layer.msg('学员添加成功');
                    getStudentList();

                }else{
                    layer.msg('学员添加失败');
                }
            }
        })
        $('#userName').val('');
        $('#class').val('');

    })
});


