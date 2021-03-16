$(function () {
    const layer = layui.layer
    const form = layui.form
    const page = layui.laypage
    var data = {
        pagenum: 1,
        pagesize: 1,
        cate_id: '',
        state: ''
    }
    initDetail(data) //初始化文章表格
    getCategory() //获取文章分类
    changeCategory() //筛选文章
    // 格式化时间
    template.defaults.imports.formDate = function (data) {
        var time = new Date(data)
        var year = time.getFullYear()
        var month = addZero(time.getMonth() + 1)
        var day = addZero(time.getDate())
        var H = addZero(time.getHours())
        var S = addZero(time.getSeconds())
        var M = addZero(time.getMinutes())
        return `${year}-${month}-${day} ${H}:${S}:${M}`
    }

    // 过滤时间不零
    function addZero(n) {
        return n < 10 ? '0' + n : n
    }

    // 获取文章分类
    function getCategory() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var html = template('tpl-cate', res)
                $("select[name = 'cate_id']").html(html)
                form.render('select')
            }
        })
    }

    // 获取文章列表
    function initDetail(data) {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: data,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                if (res.data.length === 0) {
                    layer.msg('暂无数据')
                }
                var html = template('tpl-detail', res)
                $('#tb').html(html)
                renderPage(res.total)
            }
        })
    }

    // 获取筛项对应的文章
    function changeCategory() {
        $('#formCate').on('submit', function (e) {
            e.preventDefault()
            var cateId = $("select[name='cate_id']").val()
            var state = $("select[name='state']").val()
            data.cate_id = cateId
            data.state = state
            initDetail()
        })
    }

    // 渲染分页栏
    function renderPage(total) {
        page.render({
            elem: 'page',
            count: total,
            limit: data.pagesize,
            curr: data.pagenum,
            limits: [1, 5, 10, 15, 20],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            theme: '#2e6da4',
            jump: function (obj, first) {
                data.pagenum = obj.curr
                data.pagesize = obj.limit
                if (!first) {
                    initDetail()
                }
            }
        })
    }

    // 删除文章操作
    $(document).on('click', '#delCate', function () {
        var btnNum = $('#delCate').length //获取删除按钮的个数
        var delId = $(this).attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title: '提示'}, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + delId,
                success: res => {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.close(index);
                    layer.msg(res.message, {icon: 0, time: 1500}, function () {
                        if (btnNum === 1) {
                            data.pagenum = data.pagenum === 1 ? 1 : (data.pagenum - 1)
                        }
                        initDetail()
                    })
                }
            })
        });

    })
})
