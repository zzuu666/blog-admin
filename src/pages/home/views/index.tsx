import * as React from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../actions'
import { Table } from 'antd'

interface Props {
    fetchArticles: () => void
}

class Home extends React.Component<Props> {
    render() {
        return (
            <div>
                This is Home page.
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchArticles()
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    fetchArticles: () => {
        dispatch(fetchArticles())
    }
})

export default connect(null, mapDispatchToProps)(Home)
