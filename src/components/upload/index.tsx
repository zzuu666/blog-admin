import React, { FC, useRef, ChangeEvent } from 'react'
import { Button } from 'antd'
import clsx from 'clsx'

import style from './index.less'

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

const ImageUpload: FC<Props> = props => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        inputRef.current && inputRef.current.click()
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event)
    }

    return (
        <div className={clsx([style.root, props.className])}>
            <input
                type="file"
                ref={inputRef}
                className={style.rootInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <Button onClick={handleClick} role="button">
                {props.children}
            </Button>
        </div>
    )
}

export default ImageUpload
