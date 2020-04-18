import React, { Component } from 'react'

import { Route,Switch,Redirect} from 'react-router-dom'

import { adminRoutes } from './router'

import {Farme} from './components'

const menu = adminRoutes.filter(item=>item.isNav === true)

class App extends Component {
    render() {
        return (
            <>
                <Farme menu={menu}>
                    <Switch>
                        {
                            adminRoutes.map((route)=>{
                                return <Route  
                                key = {route.pathname} 
                                path = {route.pathname} 
                                exact = {route.exact}
                                render={(routeProps)=>{
                                    return <route.component {...routeProps} />
                                }}/>
                            })
                        }
                        <Redirect to={adminRoutes[0].pathname} from="/admin"/>
                        <Redirect to="/404"/>
                    </Switch>
                </Farme>
            </>
        )
    }
}

export default App