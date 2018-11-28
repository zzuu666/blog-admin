import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../../../../store'
import { fetchStatus } from '../../../../utils/fetch'
import { Form, Icon, Input, Button, Spin, Row, Col, Select, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Article } from '../../../../models/article'
import ArticleForm, { ArtilceFormData } from '../../../../components/form/ArticleForm'

const FormItem = Form.Item
const TextArea = Input.TextArea

interface Props extends FormComponentProps, RouteComponentProps {
    article: Article
    status: fetchStatus
}

class CreateArticle extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(value: ArtilceFormData) {
        // console.log(value)
    }

    render () {
        const { article, status } = this.props
        return (
            <div>
                <h2>新建文章</h2>
                <Spin spinning={ status === fetchStatus.LOADING }>
                    <ArticleForm article={ article } handleSubmit={ this.handleSubmit }/>
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
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Form.create()(CreateArticle)))
