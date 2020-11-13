import React, { FunctionComponent } from 'react'
import { Input, Button, Select, Form } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { FormItemProps } from 'antd/lib/form'
import { RecommendBase } from '../../../models/recommend'
import { Article } from '../../../models/article'

const FormItem = Form.Item
const Option = Select.Option

interface Props {
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
    formItemLayout: Partial<FormItemProps>
) => {
    const { recommend, recommendArticles, onSuggestionSelectChange } = props

    const options = recommendArticles
        ? recommendArticles.map(sug => (
              <Option value={sug.id!} key={sug.id + ''}>
                  {sug.title}
              </Option>
          ))
        : null

    return (
        <FormItem
            {...formItemLayout}
            label="Recommend Article"
            name="article_id"
            initialValue={recommend.article_id}
            rules={[
                {
                    required: true,
                    message: 'Recommend Article is required!'
                }
            ]}
        >
            <Select
                showSearch
                showArrow={false}
                filterOption={false}
                onSearch={onSuggestionSelectChange}
                placeholder="Select Recommend Article"
            >
                {options}
            </Select>
        </FormItem>
    )
}
const RecommendForm: FunctionComponent<Props> = props => {
    const { recommend } = props

    const onFinish = (values: Store) => {
        props.onSubmit && props.onSubmit(values as RecommendBase)
    }

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

    const onValuesChange = (changedValues: Store, allValues: Store) => {
        props.onFormValueChange &&
            props.onFormValueChange(allValues as RecommendBase)
    }

    return (
        <Form onFinish={onFinish} onValuesChange={onValuesChange}>
            {CategoryFeaturedIdFormItem(props, formItemLayout)}
            <FormItem
                {...formItemLayout}
                label="Recommend Reason"
                name="reason"
                initialValue={recommend.reason}
                rules={[
                    {
                        required: true,
                        message: 'Category Name is required!'
                    }
                ]}
            >
                <Input placeholder="Category Name" />
            </FormItem>

            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </FormItem>
        </Form>
    )
}

export default RecommendForm
