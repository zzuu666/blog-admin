import * as React from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../actions'
import { Article } from '../../../models/article'
import { Table, Divider, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { StoreState } from '../../../store'
import style from './index.less'

const columns: Array<ColumnProps<Article>> = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: '文章标题',
        dataIndex: 'title'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="javascript:;">编辑</a>
                <Divider type="vertical" />
                <a href="javascript:;">屏蔽</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
            </span>
        )
    }
]

interface Props {
    articles: Article[],
    fetchArticles: () => void
}

class Home extends React.Component<Props> {
    render() {
        const { articles } = this.props
        return (
            <div className={style.home}>
                <div className={style['home-header']}>
                    <Button type="primary">新增</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={articles}
                    rowKey="id"
                />
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchArticles()
    }
}

const mapStatetoProps = (state: StoreState) => ({
    articles: state.home.articles
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchArticles: () => {
        dispatch(fetchArticles())
    }
})

export default connect(mapStatetoProps, mapDispatchToProps)(Home)
