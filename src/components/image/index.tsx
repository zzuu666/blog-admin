import * as React from 'react'
import style from './index.less'

interface Props {
    src: string
    type: '16x9'
}

class Image extends React.Component<Props> {
    static defaultProps = {
        type: '16x9'
    }
    render() {
        const { src, type } = this.props
        return (
            <div className={ style['c-image'] }>
                <div className={ style['c-image-wrapper'] + ' ' + style[`c-image-type-${type}`] }>
                    <img className={ style['c-image-source'] } src={ src } />
                </div>
            </div>
        )
    }
}

export default Image
