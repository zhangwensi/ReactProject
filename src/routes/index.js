//配置内外层路由
import {Login,Dashbord,Settings,Notfound,ArticleList,ArticleEdit,Infos,NoAuth,selfSetting} from '../views/index'

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
        isNav:true,
        roles: ['001','002','003']
    },
    // 断路由要求设置exract  以便Switch能区分
    {
        pathname:'/admin/article',
        component:ArticleList,
        title:'文章列表',
        isNav:true,
        Icon:'OrderedListOutlined',
        exact: true,
        roles: ['001','002']
    },
    {
        pathname:'/admin/article/ArticleEdit/:id',
        component:ArticleEdit,
        title:'文章编辑',
        Icon:'HighlightOutlined',
        isNav:false,
        roles: ['001']
    },
    {
        pathname:'/admin/Settings',
        component:Settings,
        title:'设置',
        Icon:'SettingFilled',
        isNav:true,
        roles: ['001']
    },
    {
        pathname:'/admin/infos',
        component:Infos,
        title:'信息中心',
        Icon:'',
        isNav:false,
        roles: ['001','002','003']
    },
    {
        pathname:'/admin/NoAuth',
        component:NoAuth,
        title: '无权限查看',
        Icon:'',
        isNav: false,
        roles: ['001','002','003']
    },
    {
        pathname:'/admin/selfSetting',
        component:selfSetting,
        title: '个人设置',
        Icon:'',
        isNav: false,
        roles: ['001','002','003']
    }
]
