import React, { Component } from 'react'

import { Layout, Menu } from 'antd'

import { withRouter } from 'react-router-dom'
import logo from './logo.png'

import './Farme.less'

const { Header, Content, Sider } = Layout

@withRouter

class Farme extends Component {
    routeJump = ({key})=>{
            // 路由跳转
            this.props.history.push(key)
    }
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
                                selectedKeys={[this.props.location.pathname]}
                                onClick = {this.routeJump}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {
                                    this.props.menu.map((item)=>{
                                        return(
                                            <Menu.Item key={item.pathname}>
                                                {item.title}
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '16px' }}>
                            <Content
                                className="fm-site-layout-background"
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

export default  Farme