import React, { FC, useState } from 'react'
import clsx from 'clsx'
import { InboxOutlined } from '@ant-design/icons'

import Dragger from '../../components/upload/dragger'
import ImagePreview from '../../components/image/preview'
import { uploadImageToCOS } from '../../utils/cos'

import style from './index.less'

const UploadedImageList = (list: string[]) => (
    <div>
        {list.map((image) => (
            <ImagePreview image={image} key={image}>
                <p>{image}</p>
            </ImagePreview>
        ))}
    </div>
)

const Gallery: FC = () => {
    const [list, setList] = useState<string[]>([])

    const handleFileChange = (file: File) => {
        uploadImageToCOS(file).then((res) => {
            const url = `https://${res.cdnHost}/${res.path}`
            setList([...list, url])
        })
    }

    return (
        <div className={clsx(['c-layout-full-height', style.root])}>
            <h2>图片上传</h2>
            <Dragger className={style.rootDragger} onDrop={handleFileChange}>
                <p className={style.rootDraggerIcon}>
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                </p>
            </Dragger>
            {list.length > 0 && UploadedImageList(list)}
        </div>
    )
}

export default Gallery
