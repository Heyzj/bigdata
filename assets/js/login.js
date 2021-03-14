$(function () {
    $('.login-body a').on('click', function () {
        $('.login-body').hide()
        $('.reg-body').show()
    })
    $('.reg-body a').on('click', function () {
        $('.reg-body').hide()
        $('.login-body').show()
    })
    // 效验密码框
    var form = layui.form
    var layer = layui.layer
    form.verify({
        'pwd': [
            /^[\S]{8,16}$/,
            '密码必须是8-16位的非特殊字符'
        ],
        'repwd': function (value) {
            if ($('.pwd').val() !== value) {
                return '密码不一致！'
            }

        }
    })
    // 统一根路径管理url
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
    // 发起ajax注册效验
    $('#regForm').on('submit', function (e) {
        e.preventDefault()
        var username = $('#username').val().trim()
        var password = $('#password').val().trim()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: username,
                password: password
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 2,
                        time: 2000
                    })
                } else {
                    return layer.msg(res.message, {
                        icon: 1,
                        time: 2000
                    }, function () {
                        $('.reg-body a').click()
                    })
                }
            }
        })
    })
    // 发起ajax登录效验
    $('#loginForm').on('submit', function (e) {
        e.preventDefault()
        var loginUrl = '/api/login'
        var username = $('#loginName').val().trim()
        var password = $('#loginPassword').val().trim()
        $.ajax({
            method: 'POST',
            url: loginUrl,
            data: {
                username: username,
                password: password
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 2,
                        time: 2000
                    })
                } else {
                    localStorage.setItem('token', res.token)
                    return layer.msg(res.message, {
                        icon: 1,
                        time: 2000
                    }, function () {
                        location.href = './index.html'
                    })
                }
            }
        })
    })
})