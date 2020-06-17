import React, { Component } from 'react'

import { Card, Button, List, Avatar,Badge } from 'antd'

import { connect } from 'react-redux'

import {markHasReadById,markAllHasReadById} from '../../actions/notification.js'

// 读取state的值
const mapState = state=> {
    const  { list } = state.InfosList //结构
    return {
        list:list
    }
}

@connect(mapState,{markHasReadById,markAllHasReadById})

class infos extends Component {
    render() {
        return (
            <>
                <Card title="信息中心" bordered={false} extra={<Button disabled={this.props.list.every(item =>item.hasRead=== true)}  onClick={this.props.markAllHasReadById}>标记为全部已读</Button>} ></Card>
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
                        <List.Item 
                            extra={ item.hasRead ? null : <Button onClick={this.props.markHasReadById.bind(this,item.id)}>标记为已读</Button> }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
            </>
        )
    }
}


export default infos