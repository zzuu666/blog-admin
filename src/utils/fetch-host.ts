export const fetchHost: string = process.env.NODE_ENV === 'production'
    ? process.env.REMOTE_SERVER_URL as string
    : 'http://localhost:3000'

export const apiRoute: string = 'api'
export const apiVersion: string = 'v1'
