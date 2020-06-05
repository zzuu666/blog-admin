import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/es/form'
import { StoreState } from '../../../store'
import { fetchLogin } from '../actions'
import style from './index.less'
import LoginForm, { LoginFormData } from '../../../components/form/LoginForm'

const { Content } = Layout

interface Props extends FormComponentProps, RouteComponentProps {
    token: string
    fetchLogin: (email: string, password: string) => void
}
class Login extends React.Component<Props> {
    shouldComponentUpdate(next: Props) {
        if (next.token !== '') {
            window.localStorage.setItem('AUTH_TOKEN', next.token)
            this.props.history.push(this.props.location.state.from)
        }
        return true
    }

    handleSubmit = (value: LoginFormData) => {
        const { email, password } = value
        this.props.fetchLogin(email, password)
    }

    render() {
        return (
            <Content>
                <Row className={style['login-main']}>
                    <Col offset={9} span={6}>
                        <LoginForm onSubmit={this.handleSubmit} />
                    </Col>
                </Row>
            </Content>
        )
    }
}

const mapStateToProps = (state: StoreState) => ({
    token: state.login.token,
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchLogin: (email: string, password: string) => {
        dispatch(fetchLogin(email, password))
    },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
