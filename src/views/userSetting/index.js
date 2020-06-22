import React, { Component } from 'react'

import { Upload, Card, Form, Input } from 'antd'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import axios from 'axios'

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
}

export default class index extends Component {
    state = {
        loading: false,
        avatar: ''
    }

    handleChange = ({ file }) => {
        // 通过贴图库上传头像并返回头像的url
        this.setState({
            loading: true
        })
        const data = new FormData()
        data.append('Token', 'ba19690dbd9b45c9b19a7b09a849af677339b85c:9Qj0mi19G7tiI1HvjugSM7xdHbI=:eyJkZWFkbGluZSI6MTU5MjcyODA1MiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzIxNzI5IiwiYWlkIjoiMTY5ODM1NiIsImZyb20iOiJmaWxlIn0=')
        data.append('file', file)
        axios.post('http://up.imgapi.com/', data).then(resp => {
            if (resp.status === 200) {
                this.setState({
                    avatar: resp.data.linkurl,
                    loading: false
                })
            } else {
                console.log("不知名错误")
                this.setState({
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }
    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">上传图片</div>
            </div>
        )
        return (
            <Card title="个人设置" bordered={false}>
                <Form
                    {...formItemLayout}
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '姓名不为空',
                            }
                        ]}
                    >
                        <Input placeholder="请输入个人姓名" />
                    </Form.Item>
                    <Form.Item
                        label="用户日志"
                        name="log"
                        rules={[
                            {
                                required: true,
                                message: '用户日志不为空',
                            }
                        ]}
                    >
                        <Input placeholder="请输入用户日志" />
                    </Form.Item>
                    <Form.Item
                        label="更换头像"
                        name="avatar"
                    >
                        <Upload
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            customRequest={this.handleChange}
                        >
                            {this.state.avatar ? <img src={this.state.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
