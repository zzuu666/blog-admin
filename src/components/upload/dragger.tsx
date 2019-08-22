import React, { FC, DragEvent, MouseEvent, useState, ChangeEvent } from 'react'
import clsx from 'clsx'

import Upload from './index'

import style from './dragger.less'

interface Props {
    className?: string
    onDrop?: (file: File) => void
    onError?: (error: Error) => void
}

const Dragger: FC<Props> = props => {
    const [isEntered, setIsEntered] = useState(false)

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        try {
            const file = event.dataTransfer.files[0]
            props.onDrop && props.onDrop(file)
        } catch (error) {
            props.onError && props.onError(error)
        }
    }

    const handleDragPrevent = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDragEnter = (
        event: DragEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
    ) => {
        event.preventDefault()
        setIsEntered(true)
    }

    const handleDragLeave = (
        event: DragEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
    ) => {
        event.preventDefault()
        setIsEntered(false)
    }

    const handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files
            if (files) {
                props.onDrop && props.onDrop(files[0])
            }
        } catch (error) {
            props.onError && props.onError(error)
        }
    }

    return (
        <div
            className={clsx([
                style.root,
                props.className,
                {
                    [style.rootEntered]: isEntered
                }
            ])}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragPrevent}
            onMouseEnter={handleDragEnter}
            onMouseLeave={handleDragLeave}
        >
            <Upload type="drag" onChange={handleUploadChange}>
                {props.children}
            </Upload>
        </div>
    )
}

export default Dragger
