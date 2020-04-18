import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb } from 'antd'

import logo from './logo.png'

import './Farme.less'

const { Header, Content, Sider } = Layout


export default class Farme extends Component {
    render() {
        return (
            <>
                <Layout>
                    <Header className="fm-header">
                        <div className="fm-logo-wrapper" >
                            <img src={logo} alt="logo" />
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {
                                    this.props.menu.map((item)=>{
                                        return(
                                            <Menu.Item key={item.pathname}>{item.title}</Menu.Item>
                                        )
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                    backgroundColor:'#fff'
                                }}
                                >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        )
    }
}
