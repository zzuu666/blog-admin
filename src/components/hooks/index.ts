import { useEffect } from 'react'
import { message } from 'antd'

export const useMessagePop = (value: string) => {
    useEffect(
        () => {
            if (value !== '') {
                message.success(value)
            }
        },
        [value]
    )
}
