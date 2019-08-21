import React, { FC } from 'react'

import Image from '../image/index'
import style from './index.less'

interface Props {
    markdown: string
    image: string
    title: string
    desc: string
}

const ArticlePreview: FC<Props> = props => {
    /* eslint-disable react/no-danger */
    return (
        <div className={style.root}>
            {props.image !== '' && (
                <div className={style.rootImage}>
                    <Image src={props.image} />
                </div>
            )}

            <h2 className={style.rootTitle}>{props.title}</h2>
            <p className={style.rootDesc}>{props.desc}</p>
            <div
                className={style.rootArticle}
                dangerouslySetInnerHTML={{
                    __html: props.markdown
                }}
            />
        </div>
    )
}

export default ArticlePreview
