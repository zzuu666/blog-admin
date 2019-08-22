import React, { FC, useRef, ChangeEvent } from 'react'
import clsx from 'clsx'

import style from './index.less'

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
    type?: 'drag'
}

const ImageUpload: FC<Props> = props => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        inputRef.current && inputRef.current.click()
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event)
    }

    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    return (
        <div
            className={clsx([
                style.root,
                props.className,
                {
                    [style.rootTypeDrag]: props.type === 'drag'
                }
            ])}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={inputRef}
                className={style.rootInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />

            {props.children}
        </div>
    )
}

export default ImageUpload
