import * as React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item

class Edit extends React.Component {
    render () {
        return (
            <div>
                <Form>
                    <FormItem>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Edit
