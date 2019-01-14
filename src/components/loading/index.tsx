import * as React from 'react'
import { Spin } from 'antd'
import style from './index.less'

const Loading = () => (
    <Spin>
        <div className="c-layout-full-height" />
    </Spin>
)

export default Loading
