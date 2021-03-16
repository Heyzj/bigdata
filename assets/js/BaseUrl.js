// 统一根路径管理url
// 原接口：http://ajax.frontend.itheima.net
// 备用接口： http://api-breakingnews-web.itheima.net/
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '/bigdata/login.html'
        }
    }
})