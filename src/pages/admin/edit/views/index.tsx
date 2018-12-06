import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../../../../store'
import { fetchArticle, updateArticle } from '../actions'
import { Spin, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Article } from '../../../../models/article'
import ArticleForm, { ArtilceFormData } from '../../../../components/form/ArticleForm'

interface RoutePathParams {
    id: string
}

interface Props extends FormComponentProps, RouteComponentProps<RoutePathParams> {
    article: Article
    status: 'loading' | 'success' | 'error'
    message?: string
    fetchArticle: (id: string) => void
    updateArticle: (id: string, content: Article) => void
}

class Edit extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(value: ArtilceFormData) {
        const article: Article = {
            ...value,
            tags: value.tags.join(',')
        }
        this.props.updateArticle(this.props.match.params.id, article)
    }

    render () {
        const { article, status } = this.props
        return (
            <div>
                <h2>编辑 { article.title }</h2>
                <Spin spinning={ status === 'loading' }>
                    <ArticleForm article={ article } handleSubmit={ this.handleSubmit }/>
                </Spin>
            </div>
        )
    }
    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.id)
    }
    shouldComponentUpdate(props: Props) {
        if (props.status === 'success' && props.message) {
            message.success(props.message)
        }
        return true
    }
}

const mapStatetoProps = (state: StoreState) => ({
    article: state.edit.article,
    status: state.edit.status,
    message: state.edit.message
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchArticle: (id: string) => {
        dispatch(fetchArticle(id))
    },
    updateArticle: (id: string, content: Article) => {
        dispatch(updateArticle(id, content))
    }
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Edit))
