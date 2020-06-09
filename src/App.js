import React, { Component } from 'react'

import { adminRoutes } from './routes'

import { Route, Switch, Redirect } from 'react-router-dom'

import { Frame } from './compoments/index'

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

class App extends Component {
    render() {
        return (
            <>
                <Frame menuItems={menuItems}>
                    <Switch>
                        {
                            adminRoutes.map(route=>{
                                return <Route key={route.pathname} exact={route.exact} path={route.pathname} render={(routerPros)=>{
                                    return <route.component {...routerPros}/>
                                    }
                                }/>
                            })
                        }
                        <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
                        <Redirect to="/404"/>
                    </Switch>
                </Frame>
            </>
        )
    }
}

export default App