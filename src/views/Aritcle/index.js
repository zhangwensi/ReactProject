import React, { Component } from 'react'

import { Card, Button, Table  } from 'antd'

const columns = [
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
]

const data = [
    {
        id: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        id: 2,
        name: 'John Brown',
        age: 33,
        address: 'New York No. 1 Lake Park',
    }
]

export default class Aritcle extends Component {
    render() {
        return (
            <>
                <Card title="文章列表" bordered={false} extra={<Button type="primary">更多</Button>}>
                    <Table
                        rowKey = 'id'
                        columns={columns}
                        dataSource={data}
                        pagination={{total:5,pageSize:10}}
                    />
                </Card>
                
            </>
        )
    }
}