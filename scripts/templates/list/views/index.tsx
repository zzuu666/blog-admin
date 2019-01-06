import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { StoreState } from '../../../../store'
import { Table, Divider, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { <%= pascal-name %> } from '../../../../models/<%= name %>'
import { fetchStatus } from '../../../../utils/fetch'
import { fetch<%= pascal-plural-name %> } from '../actions'

const columns: Array<ColumnProps<<%= pascal-name %>>> = [
<%= form-columns %>
]

interface Props extends RouteComponentProps {
    <%= plural-name %>: <%= pascal-name %>[]
    status: fetchStatus
    fetch<%= pascal-plural-name %>: () => void
}

class <%= pascal-name %>Home extends React.Component<Props> {
    render() {
        const { <%= plural-name %> } = this.props
        return (
            <div>
                <div>
                    <Button type="primary">
                        <Link to="/admin/<%= name %>/create">新增</Link>
                    </Button>
                </div>
                <Table
                    columns={ columns }
                    dataSource={ <%= plural-name %> }
                    rowKey="id"
                />
            </div>
        )
    }
    componentWillMount() {
        this.props.fetch<%= pascal-plural-name %>()
    }
}

const mapStatetoProps = (state: StoreState) => ({
    <%= plural-name %>: state.<%= name %>.<%= plural-name %>
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetch<%= pascal-plural-name %>() {
        dispatch(fetch<%= pascal-plural-name %>())
    }
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(<%= pascal-name %>Home))
