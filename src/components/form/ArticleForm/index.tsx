import * as React from 'react'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { Article } from '../../../models/article'
import { Category } from '../../../models/category'
import 'highlight.js/styles/github.css'
import marked from 'marked'
import style from './index.less'
import Image from '../../image/index'

marked.setOptions({
    highlight(code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

interface Props extends FormComponentProps {
    article: Article
    categories: Category[]
    onSubmit?: (value: ArtilceFormData) => any
    onFormValueChange?: (value: ArtilceFormData) => void
    onCategorySelectFocus?: () => void
}

export interface ArtilceFormData {
    title: string
    desc: string
    tags: string[]
    content: string
    image: string
    author: string
    origin: string
    category_id: string
}

class ArticleForm extends React.Component<Props> {
    onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (this.props.onSubmit === undefined) {
            return
        }
        const form: ArtilceFormData = this.props.form.getFieldsValue() as ArtilceFormData
        this.props.onSubmit(form)
    }

    onCategorySelectFocus = () => {
        this.props.onCategorySelectFocus && this.props.onCategorySelectFocus()
    }

    render() {
        const { article, categories, form } = this.props

        const { getFieldDecorator } = form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 18,
                    offset: 6
                }
            }
        }

        return (
            <Row gutter={32}>
                <Col span={12}>
                    <Form onSubmit={this.onSubmit}>
                        <FormItem {...formItemLayout} label="文章标题">
                            {getFieldDecorator('title', {
                                initialValue: article.title,
                                rules: [
                                    {
                                        required: true,
                                        message: '文章标题不能为空'
                                    }
                                ]
                            })(<Input placeholder="文章标题" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="文章描述">
                            {getFieldDecorator('desc', {
                                initialValue: article.desc
                            })(<Input placeholder="文章描述" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="文章标签">
                            {getFieldDecorator('tags', {
                                initialValue:
                                    article.tags && article.tags.split(',')
                            })(
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    tokenSeparators={[',']}
                                    maxTagCount={5}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="文章配图">
                            {getFieldDecorator('image', {
                                initialValue: article.image
                            })(
                                <Input placeholder="http://image.example.com" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="文章内容">
                            {getFieldDecorator('content', {
                                initialValue: article.content,
                                rules: [
                                    {
                                        required: true,
                                        message: '文章内容不能为空'
                                    }
                                ]
                            })(
                                <TextArea
                                    autosize={{ minRows: 2, maxRows: 6 }}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Category">
                            {getFieldDecorator('category_id', {
                                initialValue: article.category_id
                                    ? article.category_id + ''
                                    : 'Category',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Category is required'
                                    }
                                ]
                            })(
                                <Select
                                    style={{ width: 120 }}
                                    onFocus={this.onCategorySelectFocus}
                                >
                                    {categories.map(category => (
                                        <Option key={category.id + ''}>
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>

                        {/* <FormItem
                            { ...formItemLayout }
                            label="作者"
                        >
                            {
                                getFieldDecorator('author', {
                                    initialValue: article.author,
                                })(<Input placeholder="作者" />)
                            }
                        </FormItem> */}
                        {/* <FormItem
                            { ...formItemLayout }
                            label="来源"
                        >
                            {
                                getFieldDecorator('origin', {
                                    initialValue: article.origin,
                                })(<Input placeholder="来源" />)
                            }
                        </FormItem> */}
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col className={style['form-right']} span={10}>
                    <h3>文章图片预览</h3>
                    <div className={style['form-right-image']}>
                        <Image src={article.image || ''} />
                    </div>
                    <h3>文章内容预览</h3>
                    <div
                        className={style['form-right-article']}
                        dangerouslySetInnerHTML={{
                            __html: marked(article.content || '')
                        }}
                    />
                </Col>
            </Row>
        )
    }

    static defaultProps = {
        article: {},
        categories: []
    }
}

export default Form.create({
    onValuesChange: (
        props: Props,
        changedValues,
        allValues: ArtilceFormData
    ) => {
        props.onFormValueChange && props.onFormValueChange(allValues)
    }
})(ArticleForm)
