import React, { useEffect } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { StoreState } from '../../../../store'
import { Dispatch } from 'redux'
import { fetchStatus } from '../../../../utils/fetch'
import { fetchRecommends, recommendDelete } from '../actions'
import { Recommend } from '../../../../models/recommend'
import { Table, Divider, Button, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/es/table'
import style from './index.less'

interface Props extends RouteComponentProps {
    recommends: Recommend[]
    status: fetchStatus
    message: string
    fetchRecommends: () => void
    deleteRecommend: (id: string) => void
}

const RecommendHome = (props: Props) => {
    const { recommends, fetchRecommends, deleteRecommend } = props

    const handleColumnConfirm = (id: string) => {
        deleteRecommend(id)
    }

    const columns: Array<ColumnProps<Recommend>> = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: text => <a href="javascript:;">{text}</a>
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
                        title={`Are you sure delete recommend for ${
                            record.article_title
                        }`}
                        onConfirm={handleColumnConfirm.bind(null, record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>删除</a>
                    </Popconfirm>
                </span>
            )
        }
    ]

    useEffect(() => {
        fetchRecommends()
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchRecommends() {
        dispatch(fetchRecommends())
    },
    deleteRecommend(id: string) {
        dispatch(recommendDelete(id))
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecommendHome)
)
