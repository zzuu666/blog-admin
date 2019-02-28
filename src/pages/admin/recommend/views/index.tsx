import React, { useEffect } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { StoreState } from '../../../../store'
import { Dispatch } from 'redux'
import { fetchStatus } from '../../../../utils/fetch'
import { fetchRecommends } from '../actions'
import { Recommend } from '../../../../models/recommend'
import { Table, Divider, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import style from './index.less'

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
                <a href="javascript:;">屏蔽</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
            </span>
        )
    }
]

interface Props extends RouteComponentProps {
    recommends: Recommend[]
    status: fetchStatus
    fetchRecommends: () => void
}

const RecommendHome = (props: Props) => {
    const { recommends, fetchRecommends } = props

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
    status: state.recommend.status
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchRecommends() {
        dispatch(fetchRecommends())
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecommendHome)
)
