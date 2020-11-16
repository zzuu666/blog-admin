import React, { useEffect, FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Spin, Col, Row } from 'antd'
import debounce from 'lodash.debounce'
import {
    categoryEditGet,
    categoryEditFeatured,
    categoryEditCacheSuccess,
    categoryEditPost
} from '../actions'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'

import { Category } from '../../../../models/category'
import { Article } from '../../../../models/article'
import CategoryForm, {
    CategoryFormData
} from '../../../../components/form/CategoryForm'

interface RoutePathParams {
    id: string
}

interface Props extends RouteComponentProps<RoutePathParams> {
    status: fetchStatus
    category: Category
    categoryFeatures: Article[]
    categoryEditGet: (id: string) => void
    categoryEditPost: (id: string, value: Category) => void
    categoryEditCache: (value: Category) => void
    categoryEditFeatured: (category: string, search: string) => void
}
const CategoryCreate: FunctionComponent<Props> = props => {
    const { category, status, match } = props

    const onFormSubmit = (value: CategoryFormData) => {
        const id: string = match.params.id
        props.categoryEditPost(id, value)
    }

    const onFormValueChange = (value: CategoryFormData) => {
        props.categoryEditCache(value)
    }

    const onFeatureIdSelectSearch = (value: string) => {
        const id: string = match.params.id
        props.categoryEditFeatured(id, value)
    }

    useEffect(() => {
        const id = match.params.id
        props.categoryEditGet(id)
    }, [])

    return (
        <div>
            <h2>Category Create</h2>
            <Spin spinning={status === fetchStatus.LOADING}>
                <Row>
                    <Col offset={6} span={12}>
                        <CategoryForm
                            model="edit"
                            category={category}
                            categoryFeatures={props.categoryFeatures}
                            onSubmit={onFormSubmit}
                            onFormValueChange={onFormValueChange}
                            onFeatureIdSelectSearch={debounce(
                                onFeatureIdSelectSearch,
                                400
                            )}
                        />
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

const mapStatetoProps = (state: StoreState) => ({
    categoryFeatures: state.categoryEdit.categoryFeatures,
    category: state.categoryEdit.category,
    status: state.categoryEdit.status
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    categoryEditGet(id: string) {
        dispatch(categoryEditGet(id))
    },
    categoryEditPost(id: string, value: Category) {
        dispatch(categoryEditPost(id, value))
    },
    categoryEditCache(value: CategoryFormData) {
        dispatch(categoryEditCacheSuccess(value))
    },
    categoryEditFeatured(category: string, search: string) {
        dispatch(categoryEditFeatured(category, search))
    }
})

export default withRouter(
    connect(mapStatetoProps, mapDispatchToProps)(CategoryCreate)
)
