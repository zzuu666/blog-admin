import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import style from './App.less'

class App extends React.Component<{}> {
    render() {
        return (
            <Router>
                <div>
                    <h1>Welcome to React with Typescript</h1>
                    <p className={style.desc}>Here use css module</p>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                    <Route path="/" exact component={Home} />
                    <Route path="/about/" component={Login} />
                </div>
            </Router>
        )
    }
}

export default App
