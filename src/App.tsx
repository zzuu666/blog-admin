import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminLayout from './pages/admin'
import { view as Login } from './pages/login'

class App extends React.Component<{}> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={ AdminLayout } />
                    <Route path="/login" component={ Login } />
                </Switch>
            </Router>
        )
    }
}

const BeforeLoginLayout = (): JSX.Element => (<Route path="/login" component={ Login } />)

export default App
