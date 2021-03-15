$(function () {
    const layer = layui.layer
    const form = layui.form
    var indexAdd = null //添加文章,open弹出层索引
    var indexMod = null //修改文章,open弹出层索引

    initArticle() //初始化数据

    //弹出增加文章分类
    $('#addArticle').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['550px', '250px'],
            title: '添加文章类别',
            content: $('#tpl-addArt').html()
        })
    })
    // 添加文章的分类
    $(document).on('submit', '#formAdd', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                console.log(res)
                if (res.status !== 0) {
                    layer.msg(res.message, {icon: 5, time: 2000, offset: '100px'})
                }
                layer.msg(res.message, {icon: 6, time: 1500, offset: '100px'}, function () {
                    layer.close(indexAdd)
                    initArticle()
                })
            }
        })
    })

    // 弹出修改文章层
    $('#tboby').on('click', '#modArt', function () {
        indexMod = layer.open({
            type: 1,
            area: ['550px', '250px'],
            title: '修改文章类别',
            content: $('#tpl-modArt').html()
        })
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + $(this).attr('data-id'),
            success: res => {
                form.val('formMod', res.data)
            }
        })
    })
    // 修改文章

    $(document).on('submit', '#formMod', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.close(indexMod)
                layer.msg(res.message, {icon: 6, time: 1500, offset: '100px'}, function () {
                    initArticle()
                })
            }
        })
    })
    // 弹出删除提示
    $('#tboby').on('click', '#delArt', function () {
        var indexDel = $(this).siblings('button').attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title: '删除文章类别'}, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + indexDel,
                success: res => {
                    if (res.status !== 0) {
                        return layer.msg(res.message, {offset: '100px'})
                    }
                    layer.close(index);
                    layer.msg(res.message, {icon: 1, time: 1500, offset: '100px'}, function () {
                        initArticle()
                    })
                }
            })
        });
    })
})

//获取文章类别列表
function initArticle() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: res => {
            if (res.status !== 0) {
                return layer.msg(res.message, {
                    icon: 5, time: 2000, offset: '100px'
                })
            }
            var html = template('tpl-cateList', res)
            $('#tboby').html(html)
        }
    })
}