import React, { Component } from 'react'
import { Card, Button } from 'antd'

export default class Edit extends Component {

    goback = () =>{
        this.props.history.push('/admin/article')
    }

    render() {
        return (
            <>
                <Card title="文章编辑" bordered={false} extra={<Button onClick={this.goback}>返回</Button>}>

                </Card>
            </>
        )
    }
}
