import  React from 'react'

import { render } from 'react-dom'

import App from './App'

import zhCN from 'antd/es/locale/zh_CN'

import { ConfigProvider } from 'antd'

import { HashRouter as Router ,Route ,Switch ,Redirect} from 'react-router-dom'
import { mainRoutes} from './routes'

import { Provider  } from 'react-redux'
import store from './store.js'

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/admin' render={(routerPros)=>{
                    // 使用render目的为后期权限做认证
                    return <ConfigProvider locale={zhCN}><App {...routerPros}/></ConfigProvider>
                }}/>
                {
                    // 不需要做权限认证的可直接访问的
                    mainRoutes.map(item=>{
                        return <Route key={item.pathname} path={item.pathname} component={item.component}/>
                    })
                }
                <Redirect to="/admin" from="/" exact/>
                <Redirect to="/404"/>
            </Switch>
        </Router>
    </Provider>,
    document.querySelector('#root')
)