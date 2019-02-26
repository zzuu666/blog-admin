import React, { useEffect, FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../actions'
import { Article } from '../../../../models/article'
import { Table, Divider, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { StoreState } from '../../../../store'
import style from './index.less'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'

const columns: Array<ColumnProps<Article>> = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: 'Title',
        dataIndex: 'title'
    },
    {
        title: 'Options',
        key: 'action',
        render: (text, record) => (
            <span>
                <Link to={`/admin/edit/${record.id}`}>编辑</Link>
                <Divider type="vertical" />
                <a href="javascript:;">屏蔽</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
            </span>
        )
    },
    {
        title: 'Scan',
        dataIndex: 'scan'
    }
]

interface Props extends RouteComponentProps {
    articles: Article[]
    error: number
    fetchArticles: () => void
}

const Home: FunctionComponent<Props> = props => {
    const { articles, fetchArticles } = props

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        <div className={style.home}>
            <div className={style['home-header']}>
                <Button type="primary">
                    <Link to="/admin/create">新增</Link>
                </Button>
            </div>
            <Table columns={columns} dataSource={articles} rowKey="id" />
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    articles: state.home.articles,
    error: state.home.error
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchArticles: () => {
        dispatch(fetchArticles())
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
)
