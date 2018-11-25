import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../../../store'
import { fetchArticle, updateArticle } from '../actions'
import { Form, Icon, Input, Button, Spin, Row, Col, Select, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Article } from '../../../models/article'

const FormItem = Form.Item
const TextArea = Input.TextArea

interface RoutePathParams {
    id: string
}

interface FormData {
    title: string,
    desc: string,
    tags: string[],
    content: string
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

    handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        const form: FormData = this.props.form.getFieldsValue() as FormData
        const article: Article = {
            ...form,
            tags: form.tags.join(',')
        }
        this.props.updateArticle(this.props.match.params.id, article)
    }

    render () {
        const { article, form, status } = this.props
        const { getFieldDecorator } = form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 6,
                }
            }
        }
        return (
            <div>
                <h2>编辑 { article.title }</h2>
                <Spin spinning={ status === 'loading' }>
                <Row>
                    <Col offset={ 6 } span={ 12 }>
                        <Form onSubmit={ this.handleSubmit }>
                            <FormItem
                                { ...formItemLayout }
                                label="文章标题"
                            >
                                {
                                    getFieldDecorator('title', {
                                        initialValue: article.title,
                                        rules: [{ required: true, message: '文章标题不能为空' }]
                                    })(<Input
                                        prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                        placeholder="文章标题"
                                    />)
                                }
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="文章描述"
                            >
                                {
                                    getFieldDecorator('desc', {
                                        initialValue: article.desc,
                                    })(<Input
                                        prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                        placeholder="文章描述"
                                    />)
                                }
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="文章标签"
                            >
                                {
                                    getFieldDecorator('tags', {
                                        initialValue: article.tags && article.tags.split(','),
                                    })(<Select
                                        mode="tags"
                                        style={ { width: '100%' } }
                                        tokenSeparators={ [','] }
                                        maxTagCount={ 5 }
                                    />)
                                }
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="文章内容"
                            >
                                {
                                    getFieldDecorator('content', {
                                        initialValue: article.content,
                                        rules: [{ required: true, message: '文章内容不能为空' }]
                                    })(<TextArea autosize={ { minRows: 2, maxRows: 6 } }/>)
                                }
                            </FormItem>
                            <FormItem { ...tailFormItemLayout }>
                                <Button type="primary" htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Form.create()(Edit)))
