import React, { Component } from 'react'

import { Card, Button, Table,Tag,Radio,Typography,Modal,message,Tooltip } from 'antd'

import { getArtlist,deletArticle } from '../../server'

import XLSX from 'xlsx'

import moment  from 'moment'

// 定义表格的抬头
const columnsTypeMap = {
    id: '序号',
    title: '标题',
    author: '作者',
    amount: '阅读量',
    createAt: '创建时间',
    action: '操作'
}

export default class ArtList extends Component {
    constructor() {
        super()
        // 定义初始化表格数据
        this.state = {
            columns:[],
            data:[],
            isLoading:false,
            isShowModal: false,
            maskClosable: false,
            articleTitle: '',
            articleId: '',
            confirmLoading: false,
            offset:0,
            limited:10
        }
    }
    // 初始化表格内容
    columnsType = (key) =>{
        const clumons = key.map((item)=>{
            // 单独处理阅读量
            if(item === 'amount') {
                return {
                    title: columnsTypeMap[item],
                    dataIndex: item,
                    key: item,
                    render:(record)=>{
                    return <Tooltip title={record>70? '阅读量火爆':'阅读量较少'}>
                        <Tag color={record>70?'red':'green'}>{record}</Tag>
                    </Tooltip>
                    }
                }
            }
            // 处理创建时间显示问题
            if(item === 'createAt') {
                return {
                    title: columnsTypeMap[item],
                    dataIndex: item,
                    key: item,
                    render: (record)=>{
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
        clumons.push({
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(text,record)=>{
                // 在删除按钮的点击时触发模态框，并将record传递进去  使用bind  要求改变this的指向
                return <Radio.Group>
                            <Button type="primary" size="small" onClick={this.toEidt.bind(this,record.id)}>编辑</Button>
                            <Button type="danger" size="small" onClick={this.onModal.bind(this,record)}>删除</Button>
                        </Radio.Group>
            }
        })
        return clumons
    }
    // 封装请求函数
    getData = () => {
        this.setState({
            isLoading: true
        })
        getArtlist(this.state.offset,this.state.limited).then((resp)=>{
            const columnsKey = Object.keys(resp.data.list[0])
            const columns = this.columnsType(columnsKey)
            /**
             * // 为了预防异步请求(请求时组件已经销毁，只在setStae管理数据时会发生)未完成
             *  切换Nav导航栏 报错问题如未加载完  则返回空 即什么也不做  这时切换导航栏则不会报错
             *  考虑到setState可能didmount生命周期之后发生--!this.updater.isMounted(this)
             */
            if (!this.updater.isMounted(this)) return
            this.setState({
                columns,
                total: resp.data.total,
                data: resp.data.list,
                isLoading: false
            })
        }).catch((err)=>{

        }).finally(()=>{
            if (!this.updater.isMounted(this)) return
            this.setState({
                isLoading: false
            })
        })
    }

    // 页面加载前调用接口获取后台数据
    UNSAFE_componentWillMount() {
        this.getData()
    }
    // 删除操作模态框
    onModal = (recod) => {
        this.setState({
            isShowModal: true,
            articleTitle: recod.title,
            articleId: recod.id
        })
    }
    // 遮罩层取消回掉
    cancel = () => {
        this.setState({
            isShowModal: false,
            articleTitle: '',
            articleId: ''
        })
    }
    // 删除文章回掉
    deletArt = () => {
        this.setState({
            confirmLoading: true
        })
        const id = this.state.articleId
        deletArticle(id).then((resp)=>{
            if(resp.code === '200') {
                setTimeout(()=>{
                    message.success(resp.data.message)
                    this.setState({
                        confirmLoading: false,
                        isShowModal: false
                    })
                    // 从新请求文章列表 将请求到第一页  在 this.setState的回调中请求数据
                    this.setState({
                        offset: 0
                    },()=>{
                        this.getData()
                    })
                },3000)
            }
        }).catch((err)=>{
            this.setState({
                articleTitle: '',
                articleId: ''
            })
        }).finally(()=>{
            this.setState({
                articleId: ''
            })
        })
    }
    // 改变页码重新请求数据
    onPageChange = (page, pageSize) =>{
        this.setState({
            offset: pageSize*(page-1),
            limited: pageSize
        }, () => {
            this.getData()
        })
    }
    // 导出表格
    exportExcel = () =>{
        const dataSheet = [Object.keys(this.state.data[0])]
        for (let i=0;i<this.state.data.length;i++) {
            dataSheet.push([
                this.state.data[i].id,
                this.state.data[i].title,
                this.state.data[i].author,
                this.state.data[i].amount,
                moment(this.state.data[i].createAt).format("YYYY-MM-DD-HH-mm-ss")
            ])
        }
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(dataSheet)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `${moment(new Date()).format("YYYYMMDDHHmmss")}当前页面表格.xlsx`)
    }
    // 跳转到编辑页面
    toEidt = (id)=>{
        this.props.history.push(`/admin/article/ArticleEdit/${id}`)
    }
    render() {
        return (
            <Card title="文章列表" bordered={false} extra={<Button onClick={this.exportExcel}>导出excel</Button>}>
                <Table
                    rowKey = {record => record.id}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    loading={this.state.isLoading}
                    pagination={{
                        current:this.state.offset / this.state.limited + 1,//此处是个坑 如不这样写 后面做删除时无法回到第一页
                        total:this.state.total,
                        onChange:this.onPageChange
                    }}
                />
                <Modal 
                    title = "你确定要删除么？"
                    visible = {this.state.isShowModal}
                    maskClosable={this.state.maskClosable}
                    okText = "想删掉就麻溜点"
                    cancelText = "哎呀，手滑了"
                    onCancel = {this.cancel}
                    onOk = {this.deletArt}
                    confirmLoading = {this.state.confirmLoading}
                >
                    <Typography >要删除<span style={{color:"red"}}>{this.state.articleTitle}</span>吗？</Typography>
                </Modal>
            </Card>
        )
    }
}
