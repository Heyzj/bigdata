$(function () {
    const layer = layui.layer
    getUserInfo()
    // 退出登录
    $('#logOut').on('click', function () {
        layer.confirm('确定退出登录?', {icon: 3, title: '提示'}, function (index) {
            localStorage.removeItem('token')
            location.href = '/bigdata/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: res => {
            if (res.status !== 0) {
                return layer.msg(res.message, {time: 2000})
            } else {
                renderUserInfo(res.data)
            }
        }
    })
}

// 渲染用户信息
function renderUserInfo(data) {
    var name = data.nickname || data.username
    $('.user-info>i').html(name)
    if (data.user_pic == null) {
        $('.user-avatar').html(name.substring(0, 1).toUpperCase()).show()
        $('.layui-nav-img').hide()
    } else {
        $('.user-avatar').hide()
        $('.layui-nav-img').attr('src', data.user_pic).show()
    }
}