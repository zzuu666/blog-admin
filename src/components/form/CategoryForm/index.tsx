import * as React from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { Category } from '../../../models/category'

const FormItem = Form.Item

export interface CategoryFormData {
    desc: string
    name: string
    key: string
}

interface Props extends FormComponentProps {
    category: Category
    onSubmit?: (value: CategoryFormData) => void
    onFormValueChange?: (value: CategoryFormData) => void
}

class CategoryForm extends React.Component<Props> {
    onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const value: CategoryFormData = this.props.form.getFieldsValue() as CategoryFormData
        this.props.onSubmit && this.props.onSubmit(value)
    }

    render() {
        const { form, category } = this.props
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
                            initialValue: category.name,
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
                            initialValue: category.name,
                            rules: [{ required: true, message: 'Category Key is required!' }]
                        })(<Input placeholder="Category Key" />)
                    }
                </FormItem>
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
