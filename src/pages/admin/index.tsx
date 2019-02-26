import React, { useEffect, FunctionComponent } from 'react'
import {
    Route,
    Link,
    Redirect,
    withRouter,
    RouteComponentProps,
    Switch,
    match
} from 'react-router-dom'
import { connect } from 'react-redux'
import { StoreState } from '../../store'
import { Layout, Menu, Icon, Spin } from 'antd'
import { fetchAuth } from './actions'
import { fetchStatus } from '../../utils/fetch'
import Loading from '../../components/loading'

const { Content, Sider } = Layout
const { lazy, Suspense } = React

// tslint:disable space-in-parens
const Home = lazy(() =>
    import(/* webpackChunkName: "admin-home" */ './home/views/index')
)
const Edit = lazy(() =>
    import(/* webpackChunkName: "admin-edit" */ './edit/views/index')
)
const Create = lazy(() =>
    import(/* webpackChunkName: "admin-create" */ './create/views/index')
)
const Category = lazy(() =>
    import(/* webpackChunkName: "admin-category" */ './category/views/index')
)
const CategoryCreate = lazy(() =>
    import(/* webpackChunkName: "admin-category-create" */ './categoryCreate/views/index')
)
const CategoryEdit = lazy(() =>
    import(/* webpackChunkName: "admin-category-edit" */ './categoryEdit/views/index')
)
const Recommend = lazy(() =>
    import(/* webpackChunkName: "admin-recommend" */ './recommend/views/index')
)
// tslint:enable space-in-parens

const routerMap = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/edit/:id',
        component: Edit
    },
    {
        path: '/create',
        component: Create
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/category/create',
        component: CategoryCreate
    },
    {
        path: '/category/edit/:id',
        component: CategoryEdit
    },
    {
        path: '/recommend',
        component: Recommend
    }
]

interface MenuConfig {
    key: string
    icon?: string
    path: string
    name: string
}

const menuMap: MenuConfig[] = [
    {
        key: 'article',
        icon: 'file-text',
        path: '/admin',
        name: 'Article'
    },
    {
        key: 'category',
        icon: 'folder',
        path: '/admin/category',
        name: 'Category'
    },
    {
        key: 'recommend',
        icon: 'like',
        path: '/admin/recommend',
        name: 'Recommend'
    }
]

interface Props extends RouteComponentProps {
    authenticate: boolean
    status: fetchStatus
    fetchAuth: () => void
}

const ProtectedComponent: FunctionComponent<match> = match => (
    <Layout>
        <Sider theme="light" width={240}>
            <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={['article']}
                style={{ height: '100%', borderRight: 0 }}
            >
                {menuMap.map(menu => (
                    <Menu.Item key={menu.key}>
                        <Link to={menu.path}>
                            <Icon type={menu.icon} />
                            {menu.name}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
        <Layout>
            <Content
                style={{
                    margin: '24px 16px 0',
                    overflow: 'initial'
                }}
                className="c-layout-full-height"
            >
                <Suspense fallback={Loading()}>
                    <Switch>
                        {routerMap.map(el => (
                            <Route
                                key={el.path}
                                path={`${match.url}${el.path}`}
                                exact
                                component={el.component}
                            />
                        ))}
                    </Switch>
                </Suspense>
            </Content>
        </Layout>
    </Layout>
)

const RedirectRoute: FunctionComponent<{ match: match; path: string }> = ({
    match,
    path
}) => {
    const RedirectComponent: FunctionComponent<RouteComponentProps> = props => (
        <div>
            <Redirect
                to={{
                    pathname: path,
                    state: { from: props.location.pathname }
                }}
            />
        </div>
    )

    return (
        <Switch>
            {routerMap.map(el => (
                <Route
                    key={el.path}
                    path={`${match.url}${el.path}`}
                    exact
                    render={RedirectComponent}
                />
            ))}
        </Switch>
    )
}

const LoadingRoute: FunctionComponent<match> = match => (
    <Switch>
        {routerMap.map(el => (
            <Route
                key={el.path}
                path={`${match.url}${el.path}`}
                exact
                render={Loading}
            />
        ))}
    </Switch>
)

const AdminLayout: FunctionComponent<Props> = props => {
    const { match, authenticate, status, fetchAuth } = props

    useEffect(() => {
        fetchAuth()
    }, [])

    return status === fetchStatus.LOADING
        ? LoadingRoute(match)
        : authenticate
        ? ProtectedComponent(match)
        : RedirectRoute({ match, path: '/login' })
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AdminLayout)
)
