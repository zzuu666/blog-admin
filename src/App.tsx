import * as React from 'react'
import * as style from './App.less'

class App extends React.Component<{}> {
    render() {
        return (<div>
            <h1>Welcome to React with Typescript</h1>
            <p className={style.desc}>Here use css module</p>
        </div>
        )
    }
}

export default App
