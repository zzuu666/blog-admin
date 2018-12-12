import * as React from 'react'
import style from './index.less'

enum ImageType {
    '16x9'
}

interface Props {
    alt: string
    src: string
    type: ImageType
}

class Image extends React.Component<Props> {
    static defaultProps = {
        type: '16x9',
        alt: ''
    }
    render() {
        const { type, ...props } = this.props
        return (
            <div className={ style['c-image'] }>
                <div className={ style['c-image-wrapper'] + ' ' + style[`c-image-type-${type}`] }>
                    <img className={ style['c-image-source'] } { ...props } />
                </div>
            </div>
        )
    }
}

export default Image
