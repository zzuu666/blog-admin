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

interface UploadImageResponse extends PutObjectResponse {
    path: string
    cdnHost: string
}

const COS_CDN_HOST = 'zzuucos-1255357441.file.myqcloud.com'

export const uploadImageToCOS = (file: File) =>
    new Promise<UploadImageResponse>((resolve, reject) => {
        const type = file.type.split('/')[1]
        const magicImageName = window.btoa(file.name).slice(0, 8)
        const bucketStorePath = `blog-images/${+new Date()}-${magicImageName}.${type}`

        cos.putObject(
            {
                Bucket: 'zzuucos-1255357441',
                Region: 'ap-beijing',
                Key: bucketStorePath,
                Body: file
            },
            (error, data: PutObjectResponse) => {
                if (error) {
                    reject(error)
                }
                resolve({
                    ...data,
                    path: bucketStorePath,
                    cdnHost: COS_CDN_HOST
                })
            }
        )
    })
