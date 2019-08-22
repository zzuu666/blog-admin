import React, { FC } from 'react'
import {
    Route,
    Redirect,
    RouteProps,
    RouteComponentProps
} from 'react-router-dom'
import * as H from 'history'

import Loading from '../loading'

interface Props extends RouteProps {
    identify: boolean
    redirect?: H.Pathname
    loading?: boolean
}

const RouteRender = (
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>,
    redirect: H.Pathname,
    identify: boolean,
    loading?: boolean
) => props => {
    const Component = component
    const IdentifyRoute = identify ? (
        <Component {...props} />
    ) : (
        <Redirect
            to={{
                pathname: redirect,
                state: { from: props.location }
            }}
        />
    )

    return loading === undefined ? (
        IdentifyRoute
    ) : loading ? (
        <Loading />
    ) : (
        IdentifyRoute
    )
}

const PrivateRoute: FC<Props> = ({
    component,
    identify,
    redirect = '/login',
    loading,
    ...rest
}) => (
    <Route
        {...rest}
        render={RouteRender(component!, redirect, identify, loading)}
    />
)

export default PrivateRoute
