import React, { FunctionComponent } from 'react'
import { Form, Input, Button, Select, Spin } from 'antd'
import { FormComponentProps, FormItemProps } from 'antd/es/form'
import { RecommendBase } from '../../../models/recommend'
import { Article } from '../../../models/article'

const FormItem = Form.Item
const Option = Select.Option

interface Props extends FormComponentProps {
    model: 'create' | 'edit'
    recommend: RecommendBase
    recommendArticles?: Article[]
    onSubmit?: (value: RecommendBase) => void
    onFormValueChange?: (value: RecommendBase) => void
    onSuggestionSelectChange?: (value: string) => void
    onArticleSearch?: (value: string) => void
}

const CategoryFeaturedIdFormItem = (
    props: Props,
    formItemLayout: FormItemProps
) => {
    const {
        recommend,
        recommendArticles,
        form,
        onSuggestionSelectChange
    } = props
    const { getFieldDecorator } = form

    const options = recommendArticles
        ? recommendArticles.map(sug => (
              <Option key={sug.id + ''}>{sug.title}</Option>
          ))
        : null

    return (
        <FormItem {...formItemLayout} label="Recommend Article">
            {getFieldDecorator('article_id', {
                initialValue: recommend.article_id,
                rules: [
                    {
                        required: true,
                        message: 'Recommend Article is required!'
                    }
                ]
            })(
                <Select
                    showSearch
                    showArrow={false}
                    filterOption={false}
                    onSearch={onSuggestionSelectChange}
                    placeholder="Select Recommend Article"
                >
                    {options}
                </Select>
            )}
        </FormItem>
    )
}
const RecommendForm: FunctionComponent<Props> = props => {
    const { form, recommend } = props
    const { getFieldDecorator } = form

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const value: RecommendBase = props.form.getFieldsValue() as RecommendBase
        props.onSubmit && props.onSubmit(value)
    }

    const formItemLayout: FormItemProps = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    }

    const tailFormItemLayout: FormItemProps = {
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
        <Form onSubmit={onSubmit}>
            {CategoryFeaturedIdFormItem(props, formItemLayout)}
            <FormItem {...formItemLayout} label="Recommend Reason">
                {getFieldDecorator('reason', {
                    initialValue: recommend.reason,
                    rules: [
                        {
                            required: true,
                            message: 'Category Name is required!'
                        }
                    ]
                })(<Input placeholder="Category Name" />)}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </FormItem>
        </Form>
    )
}

export default Form.create({
    onValuesChange: (props: Props, changedValues, allValues: RecommendBase) => {
        props.onFormValueChange && props.onFormValueChange(allValues)
    }
})(RecommendForm)
