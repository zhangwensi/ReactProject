import React, { Component } from 'react'
import { Layout, Menu, Dropdown,Badge,Avatar } from 'antd'
import './frame.less'
import * as Icon from '@ant-design/icons'
import { DownOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import { connect } from 'react-redux'

const { Header, Content, Sider } = Layout

// 初始化通知中心的数值
const mapState = state => {
    return {
        infosCount: state.InfosList.list.filter(item => item.hasRead === false ).length
    }
}

@withRouter
@connect(mapState)
class Frame extends Component {
    onMenuClick = ({ key }) => {
        this.props.history.push(key)
    }
    DropdownClick = ({key}) => {
        this.props.history.push(key)
    }
    // 以下组件需该为方法调用  才能避免通知中心 在标记为已读 不会重新渲染问题
    DropdownMenu = () =>{
        return (
            <Menu onClick={this.DropdownClick}>
                <Menu.Item key="/admin/infos">
                    <Badge dot={Boolean(this.props.infosCount)}> 
                    通知中心
                    </Badge>
                </Menu.Item>
                <Menu.Item key="/admin/Settings">
                    个人设置
                </Menu.Item>
                <Menu.Item key="/Login">
                    退出登录
                </Menu.Item>
            </Menu>
        )
    } 
    render() {
        return (
            <>
                <Layout>
                    <Header className="header zk-header">
                        <div className="zk-logo" >
                            <img src={logo}  className="zk-img" alt="系统logo"/>
                        </div>
                        <Dropdown overlay={this.DropdownMenu}>
                            <div>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <span>欢迎登录系统！</span>
                                <Badge count={this.props.infosCount} offset={[10,-8]}><DownOutlined /></Badge>
                            </div>
                        </Dropdown>
                    </Header>
                    <Layout className="zk-section">
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                selectedKeys={this.props.location.pathname}
                                onClick={this.onMenuClick}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {
                                    this.props.menuItems.map(item => {
                                        return <Menu.Item key={item.pathname}>{
                                            React.createElement(
                                                Icon[item.Icon],
                                                {
                                                    style: { fontSize: '16px', color: '#08c' }
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