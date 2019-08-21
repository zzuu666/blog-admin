import COS from 'cos-js-sdk-v5'
import { fetchWithAuth } from './fetch'

export const cos = new COS({
    getAuthorization(options, callback) {
        // 异步获取临时密钥
        fetchWithAuth({
            path: '/auth/cos',
            method: 'get'
        }).then(response => {
            response.json().then(res => {
                const credentials = res.token.credentials
                callback({
                    TmpSecretId: credentials.tmpsecretid,
                    TmpSecretKey: credentials.tmpsecretkey,
                    XCosSecurityToken: credentials.token,
                    ExpiredTime: res.token.expiredtime
                })
            })
        })
    }
})

interface PutObjectResponse {
    Location: string
    ETag: string
    statusCode: number
}

export const uploadImageToCOS = (file: File) =>
    new Promise<PutObjectResponse>((resolve, reject) => {
        const type = file.type.split('/')[1]
        const magicImageName = window.btoa(file.name).slice(0, 8)

        cos.putObject(
            {
                Bucket: 'zzuucos-1255357441',
                Region: 'ap-beijing',
                Key: `blog-images/${+new Date()}-${magicImageName}.${type}`,
                Body: file
            },
            (error, data: PutObjectResponse) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            }
        )
    })
