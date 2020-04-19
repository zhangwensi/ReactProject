import React, { Component } from 'react'

import { Card, Button, Table,Tag } from 'antd'

import moment from 'moment'

import { getList } from '../../service'

const columnsTypeMap ={
    id:'序号',
    title: '标题',
    author: '作者',
    amount: '阅读量',
    createAt: '创建时间',
    action: '操作'
}

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
    columnsType = (key) =>{
        const culomes =  key.map(item=>{
            if(item === 'amount') {
                return {
                    title: columnsTypeMap[item],
                    dataIndex: item,
                    key: item,
                    render:(record)=>{
                        return <Tag color={record<70 ? 'red':'green'}>{record}</Tag>
                    }
                }
            }
            if(item === 'createAt') {
                    return {
                        title: columnsTypeMap[item],
                        dataIndex: item,
                        key: item,
                        render:(record)=>{
                            return moment(record).format("YYYY年MM月DD日 HH点mm分ss秒")
                    }
                }
            }
            return {
                title: columnsTypeMap[item],
                dataIndex: item,
                key: item
            }
        })
        culomes.push({
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(record)=>{
            return <Button type="primary">编辑</Button>
            }
        })
        return culomes
    }
    getData = () =>{
        getList().then(resp=>{
            const columnsKey = Object.keys(resp.data.list[0])
            const columns = this.columnsType(columnsKey)
            this.setState({
                columns,
                total:resp.data.total,
                data:resp.data.list
            })
        })
    }
    UNSAFE_componentWillMount(){
        this.getData()
    }
    render() {
        return (
            <>
                <Card title="文章列表" bordered={false} extra={<Button type="default">导出exel</Button>}>
                    <Table
                        rowKey={record => record.id}
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        pagination={{
                            total:this.state.total
                        }}
                    />
                </Card>

            </>
        )
    }
}