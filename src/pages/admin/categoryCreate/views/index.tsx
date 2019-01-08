import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { categoryCreate, categorySetCache } from '../actions'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Category } from '../../../../models/category'
import CategoryForm, {
    CategoryFormData
} from '../../../../components/form/CategoryForm'
import { Spin, Col, Row } from 'antd'

interface Props extends RouteComponentProps {
    status: fetchStatus
    category: Category
    categoryCreate: (category: Category) => void
    categorySetCache: (category: Category) => void
}

class CategoryCreate extends React.Component<Props> {
    onFormSubmit = (value: CategoryFormData) => {
        this.props.categoryCreate(value)
    }

    onFormValueChange = (value: CategoryFormData) => {
        this.props.categorySetCache(value)
    }

    render() {
        const { category, status } = this.props
        return (
            <div>
                <h2>Category Create</h2>
                <Spin spinning={status === fetchStatus.LOADING}>
                    <Row>
                        <Col offset={6} span={12}>
                            <CategoryForm
                                model="create"
                                category={category}
                                onSubmit={this.onFormSubmit}
                                onFormValueChange={this.onFormValueChange}
                            />
                        </Col>
                    </Row>
                </Spin>
            </div>
        )
    }
}

const mapStatetoProps = (state: StoreState) => ({
    category: state.categoryCreate.category,
    status: state.categoryCreate.status
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    categoryCreate(category: Category) {
        dispatch(categoryCreate(category))
    },
    categorySetCache(category: Category) {
        dispatch(categorySetCache(category))
    }
})

export default withRouter(
    connect(
        mapStatetoProps,
        mapDispatchToProps
    )(CategoryCreate)
)
