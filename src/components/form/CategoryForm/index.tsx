import * as React from 'react'
import { Form, Input, Button, Select, Spin } from 'antd'
import { FormComponentProps, FormItemProps } from 'antd/es/form'
import { Category } from '../../../models/category'
import { Article } from '../../../models/article'

const FormItem = Form.Item
const Option = Select.Option

export interface CategoryFormData {
    desc: string
    name: string
    key: string
}

interface Props extends FormComponentProps {
    model: 'create' | 'edit'
    category: Category
    categoryFeatures?: Article[]
    onSubmit?: (value: CategoryFormData) => void
    onFormValueChange?: (value: CategoryFormData) => void
    onFeatureIdSelectSearch?: (value: string) => void
}

const CategoryFeaturedIdFormItem = (
    props: Props,
    formItemLayout: FormItemProps,
    onFeatureIdSelectSearch: (value: string) => void
) => {
    const { category, categoryFeatures, form } = props
    const { getFieldDecorator } = form

    const options = categoryFeatures
        ? categoryFeatures.map(sug => (<Option key={ sug.id + '' }>{ sug.title }</Option>))
        : null

    return (
        <FormItem
            { ...formItemLayout }
            label="Category Featured"
        >
            {
                getFieldDecorator('featured_id', {
                    initialValue: category.featured_id,
                    rules: [{ required: true, message: 'Category Key is required!' }]
                })(
                    <Select
                        showSearch
                        onSearch={ onFeatureIdSelectSearch }
                        placeholder="Select Category Featured"
                        notFoundContent={ null }
                    >
                        { options }
                    </Select>
                )
            }
        </FormItem>
    )
}

class CategoryForm extends React.Component<Props> {
    onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const value: CategoryFormData = this.props.form.getFieldsValue() as CategoryFormData
        this.props.onSubmit && this.props.onSubmit(value)
    }

    onFeatureIdSelectSearch = (value: string) => {
        this.props.onFeatureIdSelectSearch && this.props.onFeatureIdSelectSearch(value)
    }

    render() {
        const { form, category, model } = this.props
        const { getFieldDecorator } = form

        const formItemLayout: FormItemProps = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        }

        const tailFormItemLayout: FormItemProps = {
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
            <Form onSubmit={ this.onSubmit }>
                <FormItem
                    { ...formItemLayout }
                    label="Category Name"
                >
                    {
                        getFieldDecorator('name', {
                            initialValue: category.name,
                            rules: [{ required: true, message: 'Category Name is required!' }]
                        })(<Input placeholder="Category Name" />)
                    }
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label="Category Desc"
                >
                    {
                        getFieldDecorator('desc', {
                            initialValue: category.desc,
                            rules: [{ required: true, message: 'Category Desc is required!' }]
                        })(<Input placeholder="Category Desc" />)
                    }
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label="Category Key"
                >
                    {
                        getFieldDecorator('key', {
                            initialValue: category.key,
                            rules: [{ required: true, message: 'Category Key is required!' }]
                        })(<Input placeholder="Category Key" />)
                    }
                </FormItem>
                {
                    model === 'edit'
                        ? CategoryFeaturedIdFormItem(this.props, formItemLayout, this.onFeatureIdSelectSearch)
                        : null
                }
                <FormItem { ...tailFormItemLayout }>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({
    onValuesChange: (props: Props, changedValues, allValues: CategoryFormData) => {
        props.onFormValueChange && props.onFormValueChange(allValues)
    }
})(CategoryForm)
