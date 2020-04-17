import React, { Component } from 'react'

import { Button ,Badge } from 'antd'


class App extends Component {
    render() {
        return (
            <div>
                <Button type="primary" loading>测试按钮</Button>
                <Badge count={6}>
                    <span>dasdsadsada</span>
                </Badge>
            </div>
        )
    }
}

export default App