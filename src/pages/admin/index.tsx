import * as React from 'react'
import {
    Route,
    Link,
    Redirect,
    withRouter,
    RouteComponentProps,
    Switch,
    match
} from 'react-router-dom'
import * as H from 'history'
import { connect } from 'react-redux'
import { StoreState } from '../../store'
import { Layout, Menu, Icon, Spin } from 'antd'
import { view as Home } from './home'
import { view as Edit } from './edit'
import { fetchAuth } from './actions'
import { fetchStatus } from '../../utils/fetch'

const { Header, Content, Footer, Sider } = Layout

interface Props extends RouteComponentProps {
    authenticate: boolean
    status: fetchStatus
    fetchAuth: () => void
}

const ProtectedComponent = (match: match): JSX.Element => (
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
                <Route path={ `${match.url}/` } exact component={ Home } />
                <Route path={ `${match.url}/edit/:id` } component={ Edit } />
            </Content>
            <Footer style={ { textAlign: 'center' } }>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    </Layout>
)

const RedirectRoute = (match: match, path: string): React.ReactNode => {

    const RedirectComponent = (props: RouteComponentProps): React.ReactNode => (
        <div>
            <Redirect to={ { pathname: path, state: { from: props.location.pathname } } }/>
        </div>
    )

    return (
        <Switch>
            <Route path={ `${match.url}/` } render={ RedirectComponent }/>
            <Route path={ `${match.url}/edit/:id` } render={ RedirectComponent } />
        </Switch>
    )
}

const LoadingRoute = (match: match): React.ReactNode => {
    const SpinComponent = (props: RouteComponentProps): React.ReactNode => (
        <Spin />
    )

    return (
        <Switch>
            <Route path={ `${match.url}/` } render={ SpinComponent } />
            <Route path={ `${match.url}/edit/:id` } render={ SpinComponent } />
        </Switch>
    )
}

class AdminLayout extends React.Component<Props> {
    render() {
        const { match, authenticate, status } = this.props

        return (
            status === fetchStatus.LOADING
            ? LoadingRoute(match)
            : authenticate
                ? ProtectedComponent(match)
                : RedirectRoute(match, '/login')
        )
    }

    componentWillMount() {
        this.props.fetchAuth()
    }
}

const mapStateToProps = (state: StoreState) => ({
    authenticate: state.admin.authenticate,
    status: state.admin.status
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchAuth: () => {
        dispatch(fetchAuth())
    }
})

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout))
