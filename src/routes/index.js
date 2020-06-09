//配置内外层路由
import {Login,Dashbord,Settings,Notfound,ArticleList,ArticleEdit} from '../views/index'

// 配置与App同层级的外层路由
export const mainRoutes = [
    {pathname:'/Login',component:Login},
    {pathname:'/404',component:Notfound}
]
 

// 配置内层的路由
export const adminRoutes = [
    {
        pathname:'/admin/Dashbord',
        component:Dashbord,
        title:'仪表盘',
        Icon:'AreaChartOutlined',
        isNav:true
    },
    // 断路由要求设置exract  以便Switch能区分
    {
        pathname:'/admin/article',
        component:ArticleList,
        title:'文章列表',
        isNav:true,
        Icon:'OrderedListOutlined',
        exact: true
    },
    {
        pathname:'/admin/article/ArticleEdit/:id',
        component:ArticleEdit,
        title:'文章编辑',
        Icon:'HighlightOutlined',
        isNav:false
    },
    {
        pathname:'/admin/Settings',
        component:Settings,
        title:'设置',
        Icon:'SettingFilled',
        isNav:true
    }
]
