import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import { createArticle, createArticleSetCache } from '../actions'
import { Spin } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Article } from '../../../../models/article'
import ArticleForm, { ArtilceFormData } from '../../../../components/form/ArticleForm'

interface Props extends RouteComponentProps {
    article: Article
    status: fetchStatus
    postCreateArticle: (article: Article) => void,
    createArticleSetCache: (article: Article) => void
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
            tags: value.tags.join(',')
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

    render () {
        const { article, status } = this.props
        return (
            <div>
                <h2>新建文章</h2>
                <Spin spinning={ status === fetchStatus.LOADING }>
                    <ArticleForm
                        article={ article }
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
    article: state.create.article
})

const mapDispatchToProps = (dispatch: any) => ({
    postCreateArticle(article: Article) {
        dispatch(createArticle(article))
    },
    createArticleSetCache(article: Article) {
        dispatch(createArticleSetCache(article))
    }
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CreateArticle))
