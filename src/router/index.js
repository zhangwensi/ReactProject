// 导入文件
import {
    Aritcle,
    Dashbroad,
    Login,
    NotFond,
    Edit
} from '../../src/views/index'


// 与App同级别
export const mainRoutes = [{
        pathname: '/404',
        component: NotFond
    },{
        pathname: '/login',
        component: Login
    }
]

// 内置路由
export const adminRoutes = [
    {
        pathname:'/admin/aritcle',
        component:Aritcle,
        exact:true,
        title: '文章文章',
        isNav: true,
        // icon:'<CustomerServiceOutlined/>'
    },
    {
        pathname:'/admin/dashbroad',
        component:Dashbroad,
        title: '仪表盘',
        isNav: true,
        // icon:'DashboardOutlined'  新版本的antd去除了Icon标签
    },
    {
        pathname:'/admin/aritcle/edit/:id',
        component:Edit,
    }
]