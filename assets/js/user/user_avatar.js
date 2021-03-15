$(function () {
    const layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 模拟点击选择文件
    $('.changeFile').on('click', function () {
        $('.file').click()
    })

    $('.file').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('你还没有选择文件')
        }
        var imgUrl = URL.createObjectURL(files[0])
        $('#image').cropper('destroy').attr('src', imgUrl).cropper(options)
    })
    $('.uploadFile').on('click', function () {
        var dataUrl = $('#image').cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataUrl
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 2, offset: '100px', time: 2000})
                }
                layer.msg(res.message, {icon: 1, time: 2000, offset: '100px'}, function () {
                    window.parent.getUserInfo()
                })
            }
        })
    })
})