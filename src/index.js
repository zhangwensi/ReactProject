import React from 'react' 

import { render } from 'react-dom'

import App from './App'

import { mainRouter} from './router'

import { HashRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

render(
    <Router>
        <Switch>
            <Route path="/admin" render={(routeProps)=>{
                return <App {...routeProps}/>
            }}/>
            {
                mainRouter.map((item)=>{
                    return <Route key={item.pathname} path={item.pathname}  component={item.component} />
                })
            }
            <Redirect to="/login" from="/" exact />
            <Redirect to="/404" />
        </Switch>
    </Router>,
    document.querySelector("#root")
)