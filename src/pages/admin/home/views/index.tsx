import React, { useEffect, FunctionComponent, useState, Fragment } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { Table, Divider, Button, Popconfirm, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/es/radio'
import { ColumnProps } from 'antd/es/table'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import {
    fetchArticles,
    updateArticleStatus,
    HomeAction,
    FetchArticlesOption,
    articleStatus,
    UpdateArticleStatusOption
} from '../actions'
import { Article } from '../../../../models/article'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import { messageType } from '../../../../utils/message-type'
import { useMessagePop } from '../../../../components/hooks/index'
import style from './index.less'

interface Props extends RouteComponentProps {
    articles: Article[]
    status: fetchStatus
    message: string
    messageType: messageType
    fetchArticles: (option: FetchArticlesOption) => void
    discardArticle: (option: UpdateArticleStatusOption) => void
}

const Home: FunctionComponent<Props> = props => {
    const [filter, setFilter] = useState<articleStatus>('normal')

    useEffect(() => {
        props.fetchArticles({
            status: filter
        })
    }, [filter])

    useMessagePop(props.message)

    const handleUpdateArticleStatus = (option: UpdateArticleStatusOption) => {
        props.discardArticle(option)
    }

    const handleRadioChange = (e: RadioChangeEvent) => {
        setFilter(e.target.value)
    }

    const handleCreateButtonClick = () => {
        props.history.push('/admin/create')
    }

    const columns: Array<ColumnProps<Article>> = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: text => <a href="/">{text}</a>
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
                    {(filter === 'normal' || filter === 'hide') && (
                        <Link to={`/admin/edit/${record.id}`}>编辑</Link>
                    )}
                    {filter === 'normal' && (
                        <Fragment>
                            <Divider type="vertical" />
                            <Popconfirm
                                title={`文章${record.title}将不会被展现`}
                                onConfirm={() =>
                                    handleUpdateArticleStatus({
                                        id: record.id!,
                                        operation: 'hide'
                                    })
                                }
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="/">藏起来</a>
                            </Popconfirm>
                        </Fragment>
                    )}
                    {(filter === 'hide' || filter === 'trash') && (
                        <Fragment>
                            {filter === 'hide' && <Divider type="vertical" />}
                            <Popconfirm
                                title={`恢复文章${record.title}为展示中的状态`}
                                onConfirm={() =>
                                    handleUpdateArticleStatus({
                                        id: record.id!,
                                        operation: 'recover'
                                    })
                                }
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="/">恢复</a>
                            </Popconfirm>
                        </Fragment>
                    )}
                    {(filter === 'normal' || filter === 'hide') && (
                        <Fragment>
                            <Divider type="vertical" />
                            <Popconfirm
                                title={`将文章${record.title}移至回收站`}
                                onConfirm={() =>
                                    handleUpdateArticleStatus({
                                        id: record.id!,
                                        operation: 'discard'
                                    })
                                }
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="/">丢弃</a>
                            </Popconfirm>
                        </Fragment>
                    )}
                    {filter === 'trash' && (
                        <Fragment>
                            <Divider type="vertical" />
                            <Popconfirm
                                title={`文章${record.title}将被删除，且无法恢复！`}
                                onConfirm={() =>
                                    handleUpdateArticleStatus({
                                        id: record.id!,
                                        operation: 'delete'
                                    })
                                }
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="/">删除</a>
                            </Popconfirm>
                        </Fragment>
                    )}
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
                <Button
                    className={style['home-header-button']}
                    icon={<PlusOutlined />}
                    onClick={handleCreateButtonClick}
                >
                    新增
                </Button>
                <Radio.Group defaultValue="normal" onChange={handleRadioChange}>
                    <Radio value="normal">展示中的</Radio>
                    <Radio value="hide">藏起来的</Radio>
                    <Radio value="trash">回收站的</Radio>
                </Radio.Group>
            </div>
            <Table columns={columns} dataSource={props.articles} rowKey="id" />
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    articles: state.home.articles,
    status: state.home.status,
    message: state.home.message,
    messageType: state.home.messageType
})

// should return a type but I don't what is the best practice
// I used to specify return Partial<Props>
// but look not good

const mapDispatchToProps = (
    dispatch: ThunkDispatch<null, null, HomeAction>
) => ({
    fetchArticles(option: FetchArticlesOption) {
        dispatch(fetchArticles(option))
    },
    discardArticle(option: UpdateArticleStatusOption) {
        dispatch(updateArticleStatus(option))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
