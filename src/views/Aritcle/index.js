import React, { Component } from 'react'

import { Card, Button, Table } from 'antd'

import { getList } from '../../service'

export default class Aritcle extends Component {
    constructor(){
        super()
        this.state = {
            columns:[
                {
                    title: '索引',
                    dataIndex: 'id',
                    key: 'id'
                },
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age'
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    render: () => {
                        return <Button type="default">编辑</Button>
                    }
                }
            ],
            data:[
                {
                    id: 1,
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                }
            ],
            total: 0
        }               
    }
    UNSAFE_componentWillMount(){
        getList().then(resp=>{
            this.setState.total = resp.total
        })
    }
    render() {
        return (
            <>
                <Card title="文章列表" bordered={false} extra={<Button type="primary">更多</Button>}>
                    <Table
                        rowKey='id'
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        pagination={{total:this.state.total}}
                    />
                </Card>

            </>
        )
    }
}