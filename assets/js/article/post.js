$(function () {
    const layer = layui.layer
    const form = layui.form

    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    initEditor() //初始化富文本编辑器
    initCategory() //获取文章分类

    function initCategory() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var html = template('tpl-cate-list', res)
                $('select[name="cate_id"]').html(html)
                form.render()
            }
        })
    }

    //选择封面图片
    $('#choose-img').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        if (e.target.files.length === 0) {
            return layer.msg('请选择封面图片！')
        }
        var files = e.target.files[0]
        var imgUrl = URL.createObjectURL(files)
        $image.cropper('destroy').attr('src', imgUrl).cropper(options)
    })

    // 为存为草稿绑定事件监听
    var nowState = '已发布'
    $('#save').on('click', function () {
        nowState = '草稿'
    })

    // 为表单绑定提交监听
    $('#post-art').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this).get(0))
        fd.append('state', nowState)
        $image
            .cropper('getCroppedCanvas', {width: 400, height: 280})
            .toBlob(function (blob) {
                fd.append('cover_img', blob)
                // 发起ajax请求
                commPost(fd)
            })
    })

    // 发布文章
    function commPost(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message, {icon: 6, time: 1500}, function () {
                    location.href = '/bigdata/article/detail.html'
                })
            }
        })
    }
})
