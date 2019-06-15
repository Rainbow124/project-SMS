// 所有页面都需要引入的文件，处理ajax的全局拦截
// $.ajaxSetup({
//   global: true,
//   success: function () {
//     console.log('我是全局的success')
//   }
// })

$(document).ajaxSuccess(function (evt, request, settings) {
    // console.log(request);
    let res = request.responseJSON;
    if (res.code === -2) {
        location.href = '/login.html';
    }
});
