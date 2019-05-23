import { Dispatch } from 'redux'
import { fetchHost, apiRoute, apiVersion } from './fetch-host'
/* global Headers */

/**
 * Restful style fetch request method include: 'get' 'post' 'put' 'delete'
 */
export type Method = 'get' | 'post' | 'put' | 'delete'

interface FetchPayload<T extends APIBaseResponse> {
    method: Method
    path: string
    params?:
        | Blob
        | BufferSource
        | FormData
        | URLSearchParams
        | ReadableStream
        | string
    qs?:
        | string
        | URLSearchParams
        | string[][]
        | Record<string, string>
        | undefined
    started?: () => void
    success?: (success: T) => any
    failure?: (error: T) => any
    headers?: Headers
}

/**
 * Rails 接口返回数据结构基类
 */
export interface APIBaseResponse {
    error: number
    message: string
}

export enum fetchStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILURE = 'failure'
}

export const fetchWithRedux = <APIResponse extends APIBaseResponse>(
    payload: FetchPayload<APIResponse>
) => {
    const { params, started, success, failure, headers, qs } = payload
    const method = payload.method ? payload.method : 'get'
    const path = payload.path[0] === '/' ? payload.path : `/${payload.path}`
    const authorizationHeader = window.localStorage.getItem('AUTH_TOKEN') || ''

    const fetchUrl = new URL(`${fetchHost}/${apiRoute}/${apiVersion}${path}`)
    if (qs !== undefined) {
        const search = new URLSearchParams(qs)
        fetchUrl.search = search.toString()
    }
    const fetchHeaders: Headers =
        headers ||
        new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            // tslint:disable-next-line:object-literal-key-quotes
            Accept: 'application/json',
            // tslint:disable-next-line:object-literal-key-quotes
            Authorization: authorizationHeader
        })
    return (dispatch: Dispatch<any>) => {
        dispatch(started && started())
        fetch(fetchUrl.href, {
            method,
            body: params || null,
            headers: fetchHeaders
        }).then((response: Response) => {
            response
                .json()
                .then((json: APIResponse) => {
                    if (json.error === 0) {
                        dispatch(success && success(json))
                    } else {
                        dispatch(failure && failure(json))
                    }
                })
                .catch(error => {
                    dispatch(failure && failure(error))
                })
        })
    }
}
