import React, { useCallback, useEffect, FC } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Divider, Button, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { fetchStatus } from '../../../../utils/fetch'
import { Recommend } from '../../../../models/recommend'
import {
    fetchRecommends,
    selectAllRecommends,
    selectFetchSelectStatus,
    deleteRecommendById
} from '../../../../slices/recommendsSlice'

import style from './index.less'

interface Props {
    recommends: Recommend[]
    status: fetchStatus
    deleteRecommend: (id: string) => void
}

const RecommendHome = React.memo((props: Props) => {
    const { recommends, deleteRecommend, status } = props

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
                        onConfirm={() => deleteRecommend(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="/">删除</a>
                    </Popconfirm>
                </span>
            )
        }
    ]

    return (
        <div>
            <div className={style['recommend-header']}>
                <Button type="primary">
                    <Link to="/admin/recommend/create">新增</Link>
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={recommends}
                rowKey="id"
                loading={status === fetchStatus.LOADING}
            />
        </div>
    )
})

const RecommendHomeContainer: FC = () => {
    const dispatch = useDispatch()
    const recommends = useSelector(selectAllRecommends)
    const status = useSelector(selectFetchSelectStatus)
    const deleteRecommend = useCallback(
        id => {
            dispatch(deleteRecommendById(id))
        },
        [dispatch]
    )

    useEffect(() => {
        dispatch(fetchRecommends())
    }, [dispatch])

    return (
        <RecommendHome
            recommends={recommends}
            status={status}
            deleteRecommend={deleteRecommend}
        />
    )
}

export default RecommendHomeContainer
