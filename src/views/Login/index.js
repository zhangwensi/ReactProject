import React, { Component } from 'react'

import { Input,Button,Form,Checkbox ,Card} from 'antd'

import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'

import { loginUser } from '../../actions/login.js'

import { Redirect } from 'react-router-dom'

import './login.less'

const layout = {
    xs: { span: 8, offset:8 },
    md: { span: 16, offset:4}
}

const mapState = state => {
    return {
        isLogin: state.user.isLogin,
        isLoading: state.user.isLogin
    }
}

@connect(mapState,{loginUser})

class Login extends Component {
    handleSubmit = (values) => {
        this.props.loginUser(values)
    }
    render() {
        return (
            !this.props.isLogin ?
            <>  
                <div className="lg-box">
                    <Card title="我的后台管理系统" className="lg-wrapper">
                        <Form
                            className="lg-form"
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish = {this.handleSubmit}
                        >
                            <Form.Item
                                {...layout}
                                label="账号"
                                name="username"
                                rules={[{ required: true, message: '请输入账号' }]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder="请输入账号"/>
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder="请输入密码"/>
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" loading={this.props.isLoading}>
                                        登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </>
            :
            <Redirect to='/admin' />
        )
    }
}

export default Login