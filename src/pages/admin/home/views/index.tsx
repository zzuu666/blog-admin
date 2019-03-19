import React, { useEffect, FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { fetchArticles, discardArticle } from '../actions'
import { Article } from '../../../../models/article'
import { Table, Divider, Button, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { StoreState } from '../../../../store'
import style from './index.less'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { fetchStatus } from '../../../../utils/fetch'
import { messageType } from '../../../../utils/message-type'

interface Props extends RouteComponentProps {
    articles: Article[]
    status: fetchStatus
    message: string
    messageType: messageType
    fetchArticles: () => void
    discardArticle: (id: number) => void
}

const Home: FunctionComponent<Props> = props => {
    const { articles } = props

    useEffect(() => {
        props.fetchArticles()
    }, [])

    const handleDiscarArtilce = (id: number) => {
        props.discardArticle(id)
    }

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
                    <Popconfirm
                        title={`Are you sure delete recommend for ${
                            record.title
                        }`}
                        onConfirm={handleDiscarArtilce.bind(null, record.id!)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>删除</a>
                    </Popconfirm>
                </span>
            )
        },
        {
            title: 'Scan',
            dataIndex: 'scan'
        }
    ]

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
    status: state.home.status,
    message: state.home.message,
    messageType: state.home.messageType
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchArticles() {
        dispatch(fetchArticles())
    },
    discardArticle(id: number) {
        dispatch(discardArticle(id))
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
)
