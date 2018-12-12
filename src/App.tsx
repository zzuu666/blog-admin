import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

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
        const basename = process.env.NODE_ENV === 'prodcution' ? '/markii' : ''
        return (
            <Router basename={ basename }>
                <Switch>
                    <Route path="/login" component={ AsyncLogin } />
                    <Route path="/admin" component={ AsyncAdmin } />
                </Switch>
            </Router>
        )
    }
}

export default App
