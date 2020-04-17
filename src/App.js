import React, { Component } from 'react'

import { Route,Switch,Redirect} from 'react-router-dom'

import { adminRouter } from './router'



class App extends Component {
    render() {
        return (
            <>
                <div>公共部门</div>
                <Switch>
                    {
                        adminRouter.map((route)=>{
                            return <Route  
                            key = {route.pathname} 
                            path = {route.pathname} 
                            exact = {route.exact}
                            render={(routeProps)=>{
                                return <route.component {...routeProps} />
                            }}/>
                        })
                    }
                    <Redirect to={adminRouter[0].pathname} from="/admin"/>
                    <Redirect to="/404"/>
                </Switch>
            </>
        )
    }
}

export default App