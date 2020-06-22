import React, { Component } from 'react'
import notFound from './404.jpg'

export default class Notfound extends Component {
    render() {
        return (
            <div>
                <img src={notFound} alt='404' style={{width: '100%'}}></img>
            </div>
        )
    }
}
