import React, { ChangeEvent } from 'react'
import { Form, Input, Button, Row, Col, Select, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import marked from 'marked'
import highlight from 'highlight.js'
import { Article } from '../../../models/article'
import { Category } from '../../../models/category'
import ArticlePreview from '../../preview'
import ImageUpload from '../../upload'
import { uploadImageToCOS } from '../../../utils/cos'
import style from './index.less'
import 'highlight.js/styles/github.css'

marked.setOptions({
    highlight(code) {
        return highlight.highlightAuto(code).value
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
    onFormItemValyeChange?: (
        key: keyof ArtilceFormData,
        value: ArtilceFormData[keyof ArtilceFormData]
    ) => void
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
    image_desc?: string
}

class ArticleForm extends React.Component<Props> {
    static defaultProps = {
        article: {},
        categories: []
    }

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

    handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target && event.target.files && event.target.files[0]
        if (file) {
            uploadImageToCOS(file).then(data => {
                const url = `https://${data.Location}`
                this.props.onFormItemValyeChange &&
                    this.props.onFormItemValyeChange('image', url)
            })
        }
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
                                <Input placeholder="https://image.example.com" />
                            )}
                        </FormItem>
                        <FormItem>
                            <ImageUpload
                                className={style.formUpload}
                                onChange={this.handleUploadChange}
                            >
                                <Button>
                                    <Icon type="upload" />
                                    上传文章配图
                                </Button>
                            </ImageUpload>
                        </FormItem>
                        <FormItem {...formItemLayout} label="文章配图描述">
                            {getFieldDecorator('image_desc', {
                                initialValue: article.image_desc
                            })(<Input placeholder="文章配图描述" />)}
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
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col className={style['form-right']} span={10}>
                    <ArticlePreview
                        markdown={marked(article.content || '')}
                        title={article.title || ''}
                        desc={article.desc || ''}
                        image={article.image || ''}
                    />
                </Col>
            </Row>
        )
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
