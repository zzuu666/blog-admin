import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Row, Col, Form, Input, Icon, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { StoreState } from '../../../store'
import { fetchLogin } from '../actions'
import style from './index.less'

const FormItem = Form.Item

interface LoginFormData {
    email: string
    password: string
}

interface Props extends FormComponentProps, RouteComponentProps {
    token: string,
    fetchLogin: (email: string, password: string) => void
}
class Login extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        const form: LoginFormData = this.props.form.getFieldsValue() as LoginFormData
        const { email, password } = form
        this.props.fetchLogin(email, password)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Row className={ style['login-main'] }>
                    <Col span={ 14 }>
                        Welcome
                    </Col>
                    <Col span={ 6 }>
                        <Form onSubmit={ this.handleSubmit } className="login-form">
                            <FormItem>
                            { getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                    placeholder="Email"
                                />
                            ) }
                            </FormItem>
                            <FormItem>
                            { getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                    type="password"
                                    placeholder="Password"
                                />
                            ) }
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">Log in</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }

    shouldComponentUpdate(next: Props) {
        if (next.token !== '') {
            localStorage.setItem('AUTH_TOKEN', next.token)
            this.props.history.push(this.props.location.state.from)
        }
        return true
    }
}

const mapStateToProps = (state: StoreState) => ({
    token: state.login.token
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchLogin: (email: string, password: string) => {
        dispatch(fetchLogin(email, password))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)))
