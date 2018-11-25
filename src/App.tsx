import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { view as Home } from './pages/home'
import { view as Edit } from './pages/edit'
import Login from './pages/login'
import { Layout, Menu, Icon } from 'antd'

const { Header, Content, Footer, Sider } = Layout
class App extends React.Component<{}> {
    render() {
        return (
            <Router>
                <Layout>
                    <Sider style={ { overflow: 'auto', height: '100vh', position: 'fixed', left: 0 } }>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={ ['1'] }>
                            <Menu.Item key="1">
                                <Link to="/"><Icon type="user" />文章列表</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/about"><Icon type="video-camera" />作者列表</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={ { marginLeft: 200 } }>
                        <Header style={ { background: '#fff', padding: 0 } } />
                        <Content style={ { margin: '24px 16px 0', overflow: 'initial' } }>
                            <Route path="/" exact component={ Home } />
                            <Route path="/about/" component={ Login } />
                            <Route path="/edit/:id" component={ Edit } />
                        </Content>
                        <Footer style={ { textAlign: 'center' } }>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}

export default App
