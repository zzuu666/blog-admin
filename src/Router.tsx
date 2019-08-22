import React, { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'
import Loading from './components/loading'
import PrivateRoute from './components/route/private'
import logo from './assets/login/logo.png'
import style from './Router.less'
import { fetchWithAuth } from './utils/fetch'
import './components/styles'

const { Header, Footer } = Layout

// tslint:disable space-in-parens
const Login = lazy(() =>
    import(/* webpackChunkName: "login" */ './pages/login/views/index')
)

const Admin = lazy(() =>
    import(/* webpackChunkName: "admin" */ './pages/admin/index')
)

const Home = lazy(() =>
    import(/* webpackChunkName: "home" */ './pages/home/index')
)

const Gallery = lazy(() =>
    import(/* webpackChunkName: "gallery" */ './pages/gallery/index')
)

const useAuthentic = () => {
    type AuthStatus = 'loading' | 'success' | 'fail'

    const [value, setValue] = useState<AuthStatus>('loading')

    useEffect(() => {
        setValue('loading')
        fetchWithAuth({
            method: 'get',
            path: '/auth'
        }).then(res =>
            res
                .json()
                .then(data => {
                    if (data.error === 0) {
                        setValue('success')
                    } else {
                        setValue('fail')
                    }
                })
                .catch(() => {
                    setValue('fail')
                })
        )
    }, [])

    return value
}

const AppRouter = () => {
    const authStatus = useAuthentic()
    const basename = process.env.NODE_ENV === 'production' ? '/markii' : ''

    return (
        <Layout>
            <Header>
                <Row>
                    <Col span={6}>
                        <img alt="logo" src={logo} style={{ height: '24px' }} />
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
            <div className="c-layout-full-height">
                <Router basename={basename}>
                    <Suspense fallback={Loading()}>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/admin" component={Admin} />
                            <PrivateRoute
                                path="/gallery"
                                component={Gallery}
                                identify={authStatus === 'success'}
                                loading={authStatus === 'loading'}
                            />
                            <Route path="/" component={Home} />
                        </Switch>
                    </Suspense>
                </Router>
            </div>
            <Footer className={style.footer}>
                STark Park ©2018 Created by Tark Sun
            </Footer>
        </Layout>
    )
}

export default AppRouter
