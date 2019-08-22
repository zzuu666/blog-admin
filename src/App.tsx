import { hot } from 'react-hot-loader/root'
import React from 'react'
import AppRouter from './Router'
import './components/styles'

// tslint:enable space-in-parens
class App extends React.Component<{}> {
    componentDidCatch() {
        // TODO
    }

    render() {
        return <AppRouter />
    }
}

export default hot(App)
