import * as React from 'react'
import { Input, Button, Select, Form } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { FormItemProps } from 'antd/es/form'
import { Category } from '../../../models/category'
import { Article } from '../../../models/article'

const FormItem = Form.Item
const Option = Select.Option

export interface CategoryFormData {
    desc: string
    name: string
    key: string
}

interface Props {
    model: 'create' | 'edit'
    category: Category
    categoryFeatures?: Article[]
    onSubmit?: (value: CategoryFormData) => void
    onFormValueChange?: (value: CategoryFormData) => void
    onFeatureIdSelectSearch?: (value: string) => void
}

const CategoryFeaturedIdFormItem = (
    props: Props,
    formItemLayout: Partial<FormItemProps>,
    onFeatureIdSelectSearch: (value: string) => void
) => {
    const { category, categoryFeatures } = props

    const options = categoryFeatures
        ? categoryFeatures.map(sug => (
              <Option value={sug.id!} key={sug.id + ''}>
                  {sug.title}
              </Option>
          ))
        : null

    return (
        <FormItem
            {...formItemLayout}
            label="Category Featured"
            name="featured_id"
            initialValue={category.featured_id}
            rules={[{ required: true, message: 'Category Key is required!' }]}
        >
            <Select
                showSearch
                showArrow={false}
                filterOption={false}
                onSearch={onFeatureIdSelectSearch}
                placeholder="Select Category Featured"
            >
                {options}
            </Select>
        </FormItem>
    )
}

class CategoryForm extends React.Component<Props> {
    onFinish = (values: Store) => {
        this.props.onSubmit && this.props.onSubmit(values as CategoryFormData)
    }

    onFeatureIdSelectSearch = (value: string) => {
        this.props.onFeatureIdSelectSearch &&
            this.props.onFeatureIdSelectSearch(value)
    }

    handleValuesChange = (changedValues: Store, allValues: Store) => {
        this.props.onFormValueChange &&
            this.props.onFormValueChange(allValues as CategoryFormData)
    }

    render() {
        const { category, model } = this.props

        const formItemLayout: Pick<FormItemProps, 'labelCol' | 'wrapperCol'> = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        }

        const tailFormItemLayout: Pick<FormItemProps, 'wrapperCol'> = {
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
            <Form
                onFinish={this.onFinish}
                onValuesChange={this.handleValuesChange}
            >
                <FormItem
                    {...formItemLayout}
                    label="Category Name"
                    initialValue={category.name}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Category Name is required!'
                        }
                    ]}
                >
                    <Input placeholder="Category Name" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Category Desc"
                    name="desc"
                    initialValue={category.desc}
                    rules={[
                        {
                            required: true,
                            message: 'Category Desc is required!'
                        }
                    ]}
                >
                    <Input placeholder="Category Desc" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Category Key"
                    name="key"
                    initialValue={category.key}
                    rules={[
                        {
                            required: true,
                            message: 'Category Key is required!'
                        }
                    ]}
                >
                    <Input placeholder="Category Key" />
                </FormItem>
                {model === 'edit'
                    ? CategoryFeaturedIdFormItem(
                          this.props,
                          formItemLayout,
                          this.onFeatureIdSelectSearch
                      )
                    : null}
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default CategoryForm
