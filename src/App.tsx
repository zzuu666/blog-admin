import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col, Menu, Layout } from 'antd'
import Loadable from 'react-loadable'
import logo from './assets/login/logo.png'
import style from './App.less'

const { Header, Footer } = Layout

const AsyncLogin = Loadable({
    // tslint:disable-next-line: space-in-parens
    loader: () => import(/* webpackChunkName: "login" */'./pages/login/views/index'),
    loading() {
        return <div>Loading...</div>
    }
})

const AsyncAdmin = Loadable({
    // tslint:disable-next-line: space-in-parens
    loader: () => import(/* webpackChunkName: "admin" */'./pages/admin/index'),
    loading() {
        return <div>Loading...</div>
    }
})

class App extends React.Component<{}> {
    render() {
        const basename = process.env.NODE_ENV === 'production' ? '/markii' : ''
        return (
            <Layout>
                <Header>
                    <Row>
                        <Col span={ 6 }>
                            <img src={ logo } style={ { height: '24px' } } />
                        </Col>
                        <Col span={ 18 }>
                            { /* <Menu
                                mode="horizontal"
                                theme="dark"
                                style={ { lineHeight: '64px' } }
                            >
                                <MenuItem key="1">NAVI</MenuItem>
                            </Menu> */ }
                        </Col>
                    </Row>
                </Header>
                <Router basename={ basename }>
                    <Switch>
                        <Route path="/login" component={ AsyncLogin } />
                        <Route path="/admin" component={ AsyncAdmin } />
                    </Switch>
                </Router>
                <Footer className={ style.footer } >
                        STark Park ©2018 Created by Tark Sun
                </Footer>
            </Layout>
        )
    }
}

export default App
