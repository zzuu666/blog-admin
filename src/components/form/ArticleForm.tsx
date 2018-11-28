import * as React from 'react'
import { Form, Icon, Input, Button, Spin, Row, Col, Select, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { Article } from '../../models/article'

const FormItem = Form.Item
const TextArea = Input.TextArea

interface Props extends FormComponentProps {
    article: Article
    handleSubmit: (value: ArtilceFormData) => any
}

export interface ArtilceFormData {
    title: string,
    desc: string,
    tags: string[],
    content: string
}

class ArticleForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        const form: ArtilceFormData = this.props.form.getFieldsValue() as ArtilceFormData
        this.props.handleSubmit(form)
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
        )
    }
}

export default Form.create()(ArticleForm)
