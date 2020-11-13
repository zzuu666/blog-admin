import * as React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Checkbox, Form } from 'antd'
import { Store } from 'antd/lib/form/interface'

const FormItem = Form.Item

export interface LoginFormData {
    email: string
    password: string
}

interface Props {
    onSubmit: (value: LoginFormData) => void
}

class LoginForm extends React.Component<Props> {
    onFinish = (values: Store) => {
        this.props.onSubmit(values as LoginFormData)
    }

    render() {
        return (
            <Form onFinish={this.onFinish}>
                <FormItem
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!'
                        }
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        placeholder="Username"
                    />
                </FormItem>
                <FormItem
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!'
                        }
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </FormItem>
                <FormItem name="remember" valuePropName="checked" initialValue>
                    <Checkbox>Remember me</Checkbox>
                    <a className="login-form-forgot" href="/">
                        Forgot password
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Log in
                    </Button>
                    Or
                    <a href="/">register now!</a>
                </FormItem>
            </Form>
        )
    }
}

export default LoginForm
