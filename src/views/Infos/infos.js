import React, { Component } from 'react'

import { Card, Button, List, Avatar,Badge } from 'antd'

import { connect } from 'react-redux'

// 读取state的值
const mapState = state=> {
    const  { list } = state.InfosList //结构
    return {
        list:list
    }
}

@connect(mapState)

class infos extends Component {
    render() {
        return (
            <>
                <Card title="信息中心" bordered={false} extra={<Button disabled={this.props.list.every(item =>item.hasRead=== true)}>标记为全部已读</Button>} ></Card>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    bordered={true}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                description={item.desc}
                            />
                            <Button disabled={item.hasRead}>标记为已读</Button>
                        </List.Item>
                    )}
                />
            </>
        )
    }
}


export default infos