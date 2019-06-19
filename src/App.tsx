import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'
import Loading from './components/loading'
import logo from './assets/login/logo.png'
import style from './App.less'
import './components/styles'

const { Header, Footer } = Layout
const { lazy, Suspense } = React

// tslint:disable space-in-parens
const Login = lazy(() =>
    import(/* webpackChunkName: "login" */ './pages/login/views/index')
)

const Admin = lazy(() =>
    import(/* webpackChunkName: "admin" */ './pages/admin/index')
)

const Home = lazy(() =>
    import(/* webpackChunkName: "admin" */ './pages/home/index')
)
// tslint:enable space-in-parens
class App extends React.Component<{}> {
    componentDidCatch() {
        // TODO
    }

    render() {
        const basename = process.env.NODE_ENV === 'production' ? '/markii' : ''
        return (
            <Layout>
                <Header>
                    <Row>
                        <Col span={6}>
                            <img
                                alt="logo"
                                src={logo}
                                style={{ height: '24px' }}
                            />
                        </Col>
                        <Col span={18}>
                            {/* <Menu
                                mode="horizontal"
                                theme="dark"
                                style={ { lineHeight: '64px' } }
                            >
                                <MenuItem key="1">NAVI</MenuItem>
                            </Menu> */}
                        </Col>
                    </Row>
                </Header>
                <Router basename={basename}>
                    <Suspense fallback={Loading()}>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/admin" component={Admin} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </Suspense>
                </Router>
                <Footer className={style.footer}>
                    STark Park ©2018 Created by Tark Sun
                </Footer>
            </Layout>
        )
    }
}

export default hot(App)
