import React, { useEffect } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Table, Divider, Button, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import { fetchRecommends, recommendDelete, Action } from '../actions'
import { Recommend } from '../../../../models/recommend'

import style from './index.less'

interface Props extends RouteComponentProps {
    recommends: Recommend[]
    status: fetchStatus
    message: string
    fetchRecommends: () => void
    deleteRecommend: (id: string) => void
}

const RecommendHome = (props: Props) => {
    const { recommends, deleteRecommend } = props

    const handleColumnConfirm = (id: string) => {
        deleteRecommend(id)
    }

    const columns: Array<ColumnProps<Recommend>> = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: text => <a href="/">{text}</a>
        },
        {
            title: 'Title',
            dataIndex: 'article_title'
        },
        {
            title: 'Author',
            dataIndex: 'article_author'
        },
        {
            title: 'Options',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/admin/recommend/edit/${record.id}`}>编辑</Link>
                    <Divider type="vertical" />
                    <Popconfirm
                        title={`Are you sure delete recommend for ${record.article_title}`}
                        onConfirm={() => handleColumnConfirm(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="/">删除</a>
                    </Popconfirm>
                </span>
            )
        }
    ]

    useEffect(() => {
        props.fetchRecommends()
    }, [])

    return (
        <div>
            <div className={style['recommend-header']}>
                <Button type="primary">
                    <Link to="/admin/recommend/create">新增</Link>
                </Button>
            </div>
            <Table columns={columns} dataSource={recommends} rowKey="id" />
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    recommends: state.recommend.recommends,
    status: state.recommend.status,
    message: state.recommend.message
})

const mapDispatchToProps = (dispatch: ThunkDispatch<null, null, Action>) => ({
    fetchRecommends() {
        dispatch(fetchRecommends())
    },
    deleteRecommend(id: string) {
        dispatch(recommendDelete(id))
    }
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RecommendHome)
)
