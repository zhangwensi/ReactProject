import React from 'react'

import { render } from 'react-dom'

import App from './App'

import { mainRoutes } from './router'

import './common.less'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import zhCN from 'antd/es/locale/zh_CN'

import { ConfigProvider } from 'antd'

render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Switch>
                <Route path="/admin" render={(routeProps) => {
                    return <App {...routeProps} />
                }} />
                {
                    mainRoutes.map((item) => {
                        return <Route key={item.pathname} path={item.pathname} component={item.component} />
                    })
                }
                <Redirect to="/login" from="/" exact />
                <Redirect to="/404" />
            </Switch>
        </Router>
    </ConfigProvider>,
    document.querySelector("#root")
)