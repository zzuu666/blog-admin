import React, { FC } from 'react'
import clsx from 'clsx'
import Image from './index'

import style from './preview.less'

interface Props {
    image: string
    className?: string
    innerClassName?: { left: string; right: string }
    size?: 'small' | 'large' | 'normal'
}

const ImagePreview: FC<Props> = props => {
    const { size = 'normal' } = props

    return (
        <div className={clsx(style.root, props.className)}>
            <div
                className={clsx(
                    style.rootLeft,
                    style[`root-left-${size}`],
                    props.innerClassName && props.innerClassName.left
                )}
            >
                <Image src={props.image} type="16x9" />
            </div>
            <div
                className={clsx(
                    style.rootRight,
                    props.innerClassName && props.innerClassName.right
                )}
            >
                {props.children}
            </div>
        </div>
    )
}

export default ImagePreview
