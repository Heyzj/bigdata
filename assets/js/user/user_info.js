$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value > 6) {
                return layer.alert('用户昵称在1-6个字符', {icon: 2, time: 2000})
            }
        }
    })
    initUserInfo()

    // 重置按钮
    $('#reset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    // 更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {offset: '100px'})
                }
                layer.msg(res.message, {icon: 1, offset: '100px', time: 1000}, function () {
                    layer.msg('正在获取最新用户信息...', {offset: '100px', time: 1000})
                    window.parent.getUserInfo()
                })
            }
        })
    })
})

// 初始化用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: res => {
            if (res.status !== 0) {
                return layer.msg(res.message)
            } else {
                var username = $('.layui-form input[name="username"]')
                var nickname = $('.layui-form input[name="nickname"]')
                var email = $('.layui-form input[name="email"]')
                var userId = $('.layui-form input[name="id"]')
                username.val(res.data.username)
                userId.val(res.data.id)
                if (res.data.nickname) {
                    nickname.val(res.data.nickname)
                }
                nickname.attr('placeholder', '还没有昵称,输入一个吧')
                if (res.data.email) {
                    email.val(res.data.email)
                }
                email.attr('placeholder', '还没有邮箱,添加一个吧')
            }
        }
    })
}

