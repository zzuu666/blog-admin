export const fetchHost: string =
    process.env.NODE_ENV === 'production'
        ? 'https://zzuu666.com'
        : 'http://localhost:3000'

export const apiRoute = 'api'
export const apiVersion = 'v1'
export const apiAdminSuffix = '-vip'
