import React, { FunctionComponent, useEffect } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import {
    createArticle,
    createArticleSetCache,
    createArticleGetCategory
} from '../actions'
import { Article } from '../../../../models/article'
import { Category } from '../../../../models/category'
import ArticleForm, {
    ArtilceFormData
} from '../../../../components/form/ArticleForm'

interface Props extends RouteComponentProps {
    article: Article
    status: fetchStatus
    categories: Category[]
    postCreateArticle: (article: Article) => void
    createArticleSetCache: (article: Article) => void
    createArticleGetCategory: () => void
}

const CreateArticle: FunctionComponent<Props> = props => {
    const { article, status, categories } = props

    const handleSubmit = (value: ArtilceFormData) => {
        const newArticle: Article = {
            ...value,
            tags: value.tags.join(','),
            category_id: value.category_id ? parseInt(value.category_id, 10) : 0
        }
        props.postCreateArticle(newArticle)
    }

    const handleFormValueChange = (value: ArtilceFormData) => {
        const newArticle: Article = {
            ...value,
            category_id: value.category_id
                ? parseInt(value.category_id, 10)
                : 0,
            tags: value.tags ? value.tags.join(',') : undefined
        }
        props.createArticleSetCache(newArticle)
    }

    const handleFormItemValueChange = (
        key: keyof ArtilceFormData,
        value: ArtilceFormData[keyof ArtilceFormData]
    ) => {
        const newArticle = {
            ...props.article,
            [key]: value
        }
        props.createArticleSetCache(newArticle)
    }

    useEffect(() => {
        props.createArticleGetCategory()
    }, [])

    return (
        <div>
            <h2>新建文章</h2>
            <Spin spinning={status === fetchStatus.LOADING}>
                <ArticleForm
                    article={article}
                    categories={categories}
                    onSubmit={handleSubmit}
                    onFormValueChange={handleFormValueChange}
                    onFormItemValyeChange={handleFormItemValueChange}
                />
            </Spin>
        </div>
    )
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

export default withRouter(
    connect(
        mapStatetoProps,
        mapDispatchToProps
    )(CreateArticle)
)
