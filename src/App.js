import React, { Component } from 'react'

import { adminRoutes } from './routes'

import { Route, Switch, Redirect } from 'react-router-dom'

import { Frame } from './compoments/index'

import { connect } from 'react-redux'

// 定义导航栏菜单数组
const menuItems = adminRoutes.filter(item=>item.isNav===true)
// 装饰器模式
// const testHOC = (WrappedCompoment) =>{
//     return class HOCComponent extends Component {
//         render() {
//             return (
//                 <>
//                     <WrappedCompoment/>
//                     <div>这是装饰器模式内容</div>
//                 </>
//             )
//         }
//     }
// }

// @testHOC

const mapState = state => {
    return {
        isLogin : state.user.isLogin,
        role : state.user.role
    }
}

@connect(mapState)

class App extends Component {
    render() {
        return (
            this.props.isLogin ?
            <>
                <Frame menuItems={menuItems}>
                    <Switch>
                        {
                            adminRoutes.map(route=>{
                                return <Route key={route.pathname} exact={route.exact} path={route.pathname} render={(routerPros)=>{
                                    const hasPass = route.roles.includes(this.props.role) 
                                    return hasPass?  <route.component {...routerPros}/> : <Redirect to="/admin/NoAuth" />
                                    }
                                }/>
                            })
                        }
                        <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
                        <Redirect to="/404"/>
                    </Switch>
                </Frame>
            </>
            :
            <Redirect to="/login" />
        )
    }
}

export default App