$(function () {
    const form = layui.form
    const layer = layui.layer
    // 效验输入密码规则
    form.verify({
        resetPwd: [/^[\S]{8,16}$/, '密码必须8到16位，且不能出现空格'],
        samePwd: function (value) {
            var oldPwd = $('.layui-form input[name="oldPwd"]').val()
            if (value === oldPwd) {
                return '新密码不能和原密码一样'
            }
        },
        againPwd: function (value) {
            var newPwd = $('.layui-form input[name="newPwd"]').val()
            if (value !== newPwd) {
                return '两次密码输入不一致'
            }
        }
    })
    // 更改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        console.log($(this).serialize())
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5, time: 2000, offset: '100px'})
                }
                layer.msg(res.message, {icon: 1, time: 2000, offset: '100px'}, function () {
                    localStorage.removeItem('token')
                    window.parent.location.href = '/bigdata/login.html'
                })
            }
        })
    })
})
