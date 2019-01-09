import * as React from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from './index.less'

class Home extends React.Component {
    render() {
        return (
            <div className={style.home}>
                <Row>
                    <Col span={12} offset={6}>
                        <div className={style['home-slogan']}>
                            Welcome Mr. Sun
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={9}>
                        <Button className={style['home-button']} type="primary">
                            <Link to="/admin">Enter</Link>
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home
