// 导入文件
import {
    Aritcle,
    Dashbroad,
    Login,
    NotFond,
    Edit
} from '../../src/views/index'


// 与App同级别
export const mainRouter = [{
        pathname: '/404',
        component: NotFond
    },{
        pathname: '/login',
        component: Login
    }
]

// 内置路由
export const adminRouter = [
    {
        pathname:'/admin/aritcle',
        component:Aritcle,
        exact:true
    },
    {
        pathname:'/admin/dashbroad',
        component:Dashbroad
    },
    {
        pathname:'/admin/aritcle/edit/:id',
        component:Edit,
    }
]