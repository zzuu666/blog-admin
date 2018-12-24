import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../../../../store'
import { fetchArticle, updateArticle, cacheArticle } from '../actions'
import { Spin, message } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Article } from '../../../../models/article'
import { Category } from '../../../../models/category'
import ArticleForm, { ArtilceFormData } from '../../../../components/form/ArticleForm'

interface RoutePathParams {
    id: string
}

interface Props extends RouteComponentProps<RoutePathParams> {
    article: Article,
    categories: Category[],
    status: 'loading' | 'success' | 'error'
    message?: string
    fetchArticle: (id: string) => void
    updateArticle: (id: string, content: Article) => void
    cacheArticle: (artilce: Article) => void
}

class Edit extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormValueChange = this.handleFormValueChange.bind(this)
    }

    handleSubmit(value: ArtilceFormData) {
        const article: Article = {
            ...value,
            tags: value.tags ? value.tags.join(',') : undefined,
            category_id: value.category ? parseInt(value.category, 10) : 0
        }
        this.props.updateArticle(this.props.match.params.id, article)
    }

    handleFormValueChange(value: ArtilceFormData) {
        const article: Article = {
            ...value,
            tags: value.tags.join(',')
        }
        this.props.cacheArticle(article)
    }

    render () {
        const { article, status, categories } = this.props
        return (
            <div>
                <h2>编辑 { article.title }</h2>
                <Spin spinning={ status === 'loading' }>
                    <ArticleForm
                        categories={ categories }
                        article={ article }
                        onSubmit={ this.handleSubmit }
                        onFormValueChange={ this.handleFormValueChange }
                    />
                </Spin>
            </div>
        )
    }
    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.id)
    }
    shouldComponentUpdate(props: Props) {
        const showSuccessMessage = this.props.status === 'loading' && props.status === 'success' && props.message
        if (showSuccessMessage) {
            message.success(props.message)
        }
        return true
    }
}

const mapStatetoProps = (state: StoreState) => ({
    article: state.edit.article,
    categories: state.edit.categories,
    status: state.edit.status,
    message: state.edit.message
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchArticle: (id: string) => {
        dispatch(fetchArticle(id))
    },
    updateArticle: (id: string, content: Article) => {
        dispatch(updateArticle(id, content))
    },
    cacheArticle: (article: Article) => {
        dispatch(cacheArticle(article))
    }
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Edit))
