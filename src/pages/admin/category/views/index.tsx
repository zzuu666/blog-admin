import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { StoreState } from '../../../../store'
import { Table, Divider, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { Category } from '../../../../models/category'
import { fetchStatus } from '../../../../utils/fetch'
import { fetchCategories } from '../actions'

const columns: Array<ColumnProps<Category>> = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: text => <a href="javascript:;">{ text }</a>
    },
    {
        title: 'Category Name',
        dataIndex: 'name'
    },
    {
        title: 'Options',
        key: 'action',
        render: (text, record) => (
            <span>
                <Link to={ `/admin/category/edit/${record.id}` }>编辑</Link>
                <Divider type="vertical" />
                <a href="javascript:;">屏蔽</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
            </span>
        )
    }
]

interface Props extends RouteComponentProps {
    categories: Category[]
    status: fetchStatus
    fetchCategories: () => void
}

class CategoryHome extends React.Component<Props> {
    render() {
        const { categories } = this.props
        return (
            <div>
                <div>
                    <Button type="primary">
                        <Link to="/admin/category/create">新增</Link>
                    </Button>
                </div>
                <Table
                    columns={ columns }
                    dataSource={ categories }
                    rowKey="id"
                />
            </div>
        )
    }
    componentWillMount() {
        this.props.fetchCategories()
    }
}

const mapStatetoProps = (state: StoreState) => ({
    categories: state.category.categories
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchCategories() {
        dispatch(fetchCategories())
    }
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CategoryHome))
