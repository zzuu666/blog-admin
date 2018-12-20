import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
    categoryEditGet,
    categoryEditFeatured,
    categoryEditCacheSuccess,
    categoryEditPost
} from '../actions'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Category } from '../../../../models/category'
import { Article } from '../../../../models/article'
import CategoryForm, { CategoryFormData } from '../../../../components/form/CategoryForm'
import { Spin, Col, Row } from 'antd'
import debounce from 'lodash.debounce'

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

class CategoryCreate extends React.Component<Props> {
    onFormSubmit = (value: CategoryFormData) => {
        const id: string = this.props.match.params.id
        this.props.categoryEditPost(id, value)
    }

    onFormValueChange = (value: CategoryFormData) => {
        this.props.categoryEditCache(value)
    }

    onFeatureIdSelectSearch = (value: string) => {
        const id: string = this.props.match.params.id
        this.props.categoryEditFeatured(id, value)
    }

    componentWillMount = () => {
        const id = this.props.match.params.id
        this.props.categoryEditGet(id)
    }

    render () {
        const { category, status, categoryFeatures } = this.props
        return (
            <div>
                <h2>Category Create</h2>
                <Spin spinning={ status === fetchStatus.LOADING }>
                    <Row>
                        <Col offset={ 6 } span={ 12 }>
                            <CategoryForm
                                model="edit"
                                category={ category }
                                categoryFeatures={ categoryFeatures }
                                onSubmit={ this.onFormSubmit }
                                onFormValueChange={ this.onFormValueChange }
                                onFeatureIdSelectSearch={ debounce(this.onFeatureIdSelectSearch, 400) }
                            />
                        </Col>
                    </Row>
                </Spin>
            </div>
        )
    }
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CategoryCreate))
