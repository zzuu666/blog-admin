import * as React from 'react'
import { Form, Icon, Input, Button, Spin, Row, Col, Select, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { Article } from '../../models/article'
import 'highlight.js/styles/github.css'
import marked from 'marked'

marked.setOptions({
    highlight (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

const FormItem = Form.Item
const TextArea = Input.TextArea

interface Props extends FormComponentProps {
    article: Article
    handleSubmit: (value: ArtilceFormData) => any
}

interface State {
    articleContent: string
}

export interface ArtilceFormData {
    title: string,
    desc: string,
    tags: string[],
    content: string
}

class ArticleForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleArticleContentChange = this.handleArticleContentChange.bind(this)
        this.state = {
            articleContent: this.props.article.content || ''
        }
    }

    handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        const form: ArtilceFormData = this.props.form.getFieldsValue() as ArtilceFormData
        this.props.handleSubmit(form)
    }

    handleArticleContentChange() {
        setTimeout(() => {
            this.setState({
                articleContent: this.props.form.getFieldValue('content') || ''
            })
        }, 0)

    }

    render() {
        const { article, form } = this.props

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
            <Row>
                <Col span={ 12 }>
                    <Form onSubmit={ this.handleSubmit }>
                        <FormItem
                            { ...formItemLayout }
                            label="文章标题"
                        >
                            {
                                getFieldDecorator('title', {
                                    initialValue: article.title,
                                    rules: [{ required: true, message: '文章标题不能为空' }]
                                })(<Input placeholder="文章标题" />)
                            }
                        </FormItem>
                        <FormItem
                            { ...formItemLayout }
                            label="文章描述"
                        >
                            {
                                getFieldDecorator('desc', {
                                    initialValue: article.desc,
                                })(<Input placeholder="文章描述" />)
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
                            label="文章配图"
                        >
                            {
                                getFieldDecorator('image', {
                                    initialValue: article.desc,
                                })(<Input placeholder="http://image.example.com" />)
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
                                })(<TextArea
                                        autosize={ { minRows: 2, maxRows: 6 } }
                                        onChange={ this.handleArticleContentChange }
                                />)
                            }
                        </FormItem>
                        <FormItem
                            { ...formItemLayout }
                            label="作者"
                        >
                            {
                                getFieldDecorator('author', {
                                    initialValue: article.desc,
                                })(<Input placeholder="作者" />)
                            }
                        </FormItem>
                        <FormItem
                            { ...formItemLayout }
                            label="来源"
                        >
                            {
                                getFieldDecorator('author', {
                                    initialValue: article.desc,
                                })(<Input placeholder="来源" />)
                            }
                        </FormItem>
                        <FormItem { ...tailFormItemLayout }>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={ 12 }>
                    <div dangerouslySetInnerHTML={ { __html: marked(this.state.articleContent) } } />
                </Col>
            </Row>
        )
    }
}

export default Form.create()(ArticleForm)
