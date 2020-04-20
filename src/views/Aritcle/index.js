import React, { Component } from 'react'

import { Card, Button, Table, Tag, Radio,Modal,Typography  } from 'antd'

import {ExclamationCircleOutlined} from '@ant-design/icons'

import moment from 'moment'

import { getList } from '../../service'

const columnsTypeMap = {
    id: '序号',
    title: '标题',
    author: '作者',
    amount: '阅读量',
    createAt: '创建时间',
    action: '操作'
}

export default class Aritcle extends Component {
    constructor() {
        super()
        this.state = {
            columns: [],
            data: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limited: 10
        }
    }
    columnsType = (key) => {
        const culomes = key.map(item => {
            if (item === 'amount') {
                return {
                    title: columnsTypeMap[item],
                    dataIndex: item,
                    key: item,
                    render: (record) => {
                        return <Tag color={record < 70 ? 'red' : 'green'}>{record}</Tag>
                    }
                }
            }
            if (item === 'createAt') {
                return {
                    title: columnsTypeMap[item],
                    dataIndex: item,
                    key: item,
                    render: (record) => {
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
            render: (text,record) => {
                return <Radio.Group>
                    <Button type="primary" size="small">编辑</Button>
                    <Button type="danger" size="small" onClick={this.onModal.bind(this,record)}>删除</Button>
                </Radio.Group>
            }
        })
        return culomes
    }
    getData = () => {
        this.setState({
            isLoading: true
        })
        getList(this.state.offset,this.state.limited).then(resp => {
            const columnsKey = Object.keys(resp.data.list[0])
            const columns = this.columnsType(columnsKey)
            this.setState({
                columns,
                total: resp.data.total,
                data: resp.data.list,
                isLoading: false
            })
        }).catch(err => {
            // 处理错误

        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }
    UNSAFE_componentWillMount() {
        this.getData()
    }
    onPageChange = (page, pageSize) => {
        this.setState({
            offset: pageSize * (page - 1),
            limited: pageSize
        }, () => {
            this.getData()
        })
    }
    onModal = (key) =>{
        Modal.confirm({
            icon:<ExclamationCircleOutlined />,
            title:"你确定要删除么？",
        content:<Typography >要删除<span style={{color:"red"}}>{key.title}</span>吗？</Typography>,
            okText:'想删掉就麻溜点',
            cancelText:'哎呀，手滑了'

        })
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
                            total: this.state.total,
                            onChange:this.onPageChange
                        }}
                        loading={this.state.isLoading}
                    />
                </Card>

            </>
        )
    }
}