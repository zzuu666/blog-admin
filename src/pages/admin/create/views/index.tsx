import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import { createArticle, createArticleSetCache, createArticleGetCategory } from '../actions'
import { Spin } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Article } from '../../../../models/article'
import { Category } from '../../../../models/category'
import ArticleForm, { ArtilceFormData } from '../../../../components/form/ArticleForm'

interface Props extends RouteComponentProps {
    article: Article
    status: fetchStatus
    categories: Category[]
    postCreateArticle: (article: Article) => void,
    createArticleSetCache: (article: Article) => void,
    createArticleGetCategory: () => void
}

class CreateArticle extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormValueChange = this.handleFormValueChange.bind(this)
    }

    handleSubmit(value: ArtilceFormData) {
        const article: Article = {
            ...value,
            tags: value.tags.join(','),
            category_id: value.category ? parseInt(value.category, 10) : 0
        }
        this.props.postCreateArticle(article)
        // console.log(value)
    }

    handleFormValueChange(value: ArtilceFormData) {
        const article: Article = {
            ...value,
            tags: value.tags ? value.tags.join(',') : undefined
        }
        this.props.createArticleSetCache(article)
    }

    componentDidMount() {
        this.props.createArticleGetCategory()
    }

    render () {
        const { article, status, categories } = this.props
        return (
            <div>
                <h2>新建文章</h2>
                <Spin spinning={ status === fetchStatus.LOADING }>
                    <ArticleForm
                        article={ article }
                        categories={ categories }
                        onSubmit={ this.handleSubmit }
                        onFormValueChange={ this.handleFormValueChange }
                    />
                </Spin>
            </div>
        )
    }
}

const mapStatetoProps = (state: StoreState) => ({
    status: state.create.status,
    article: state.create.article,
    categories: state.create.categories
})

const mapDispatchToProps = (dispatch: any) => ({
    postCreateArticle(article: Article) {
        dispatch(createArticle(article))
    },
    createArticleSetCache(article: Article) {
        dispatch(createArticleSetCache(article))
    },
    createArticleGetCategory() {
        dispatch(createArticleGetCategory())
    }
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CreateArticle))
