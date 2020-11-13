import React, { ChangeEvent } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Input, Button, Row, Col, Select, Form } from 'antd'
import { Store } from 'antd/lib/form/interface'
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

interface Props {
    article: Article
    categories: Category[]
    onSubmit?: (value: ArtilceFormData) => void
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

    onFinish = (values: Store) => {
        this.props.onSubmit && this.props.onSubmit(values as ArtilceFormData)
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

    handleFormChange = (changedValues: Store, allValues: Store) => {
        this.props.onFormValueChange &&
            this.props.onFormValueChange(allValues as ArtilceFormData)
    }

    render() {
        const { article, categories } = this.props

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
                    <Form
                        onFinish={this.onFinish}
                        onValuesChange={this.handleFormChange}
                    >
                        <FormItem
                            {...formItemLayout}
                            name="title"
                            label="文章标题"
                            initialValue={article.title}
                            rules={[
                                {
                                    required: true,
                                    message: '文章标题不能为空'
                                }
                            ]}
                        >
                            <Input placeholder="文章标题" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="文章描述"
                            name="desc"
                            initialValue={article.desc}
                        >
                            <Input placeholder="文章描述" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="文章标签"
                            name="tags"
                            initialValue={
                                article.tags && article.tags.split(',')
                            }
                        >
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                tokenSeparators={[',']}
                                maxTagCount={5}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="文章配图"
                            name="image"
                            initialValue={article.image}
                        >
                            <Input placeholder="https://image.example.com" />
                        </FormItem>
                        <FormItem>
                            <ImageUpload
                                className={style.formUpload}
                                onChange={this.handleUploadChange}
                            >
                                <Button>
                                    <UploadOutlined />
                                    上传文章配图
                                </Button>
                            </ImageUpload>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="文章配图描述"
                            name="image_desc"
                            initialValue={article.image_desc}
                        >
                            <Input placeholder="文章配图描述" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="文章内容"
                            name="content"
                            initialValue={article.content}
                            rules={[
                                {
                                    required: true,
                                    message: '文章内容不能为空'
                                }
                            ]}
                        >
                            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Category"
                            name="category_id"
                            initialValue={
                                article.category_id
                                    ? article.category_id + ''
                                    : 'Category'
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Category is required'
                                }
                            ]}
                        >
                            <Select
                                style={{ width: 120 }}
                                onFocus={this.onCategorySelectFocus}
                            >
                                {categories.map(category => (
                                    <Option
                                        value={category.id!}
                                        key={category.id + ''}
                                    >
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
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

ArticleForm.defaultProps = {
    article: {},
    categories: []
}

export default ArticleForm
