import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import './frame.less'
import * as Icon from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
    onMenuClick = ({ key }) => {
        this.props.history.push(key)
    }
    render() {
        return (
            <>
                <Layout>
                    <Header className="header zk-header">
                        <div className="logo" />
                    </Header>
                    <Layout className="zk-section">
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                selectedKeys={this.props.location.pathname}
                                onClick = {this.onMenuClick}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {
                                    this.props.menuItems.map(item=>{
                                    return <Menu.Item key={item.pathname}>{
                                        React.createElement(
                                          Icon[item.Icon],
                                          {
                                            style:{ fontSize: '16px', color: '#08c' }
                                          }
                                        )
                                      }{item.title}</Menu.Item>
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout className="zk-content">
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
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

export default Frame