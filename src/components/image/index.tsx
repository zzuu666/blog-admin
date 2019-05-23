import React, { FunctionComponent, ImgHTMLAttributes } from 'react'
import style from './index.less'

enum ImageType {
    '16x9'
}

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    type: ImageType
}

const Image: FunctionComponent<Props> = props => {
    const { type = '16x9', alt, ...others } = props
    return (
        <div className={style['c-image']}>
            <div
                className={
                    style['c-image-wrapper'] +
                    ' ' +
                    style[`c-image-type-${type}`]
                }
            >
                <img
                    className={style['c-image-source']}
                    alt={alt}
                    {...others}
                />
            </div>
        </div>
    )
}

export default Image
