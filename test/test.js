layui.use('table', function () {
    var table = layui.table;

    var data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    table.render({
        elem: '#detail',
        height: 312,
        url: '/my/article/list',//数据接口
        method: 'GET',
        page: true,//开启分页
        where: data,
        headers: {Authorization: localStorage.getItem('token')},
        parseData: res => {
            return {
                'code': res.status,
                'msg': res.message,
                'count': res.total,
                'data': res.data
            }
        },
        cols: [[ //表头
            {field: 'Id', title: 'ID', width: 80, sort: true, fixed: 'left'},
            {field: 'title', title: '标题', sort: true},
            {field: 'state', title: '状态', sort: true},
            {field: 'cate_name', title: '文章分类', sort: true},
        ]]
    });

});