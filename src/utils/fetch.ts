import { Action } from 'redux'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { fetchHost, apiRoute, apiVersion } from './fetch-host'
/* global Headers */

/**
 * Restful style fetch request method include: 'get' 'post' 'put' 'delete'
 */
export type Method = 'get' | 'post' | 'put' | 'delete'

interface FetchPayload<T extends APIBaseResponse, A extends Action>
    extends FetchBasePayload {
    started: () => A
    success: (success: T) => A
    failure: (error: T) => A
}

interface FetchBasePayload {
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

export const fetchWithAuth = (payload: FetchBasePayload) => {
    const { params, headers, qs } = payload
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
            Accept: 'application/json',
            Authorization: authorizationHeader
        })

    return fetch(fetchUrl.href, {
        method,
        body: params || null,
        headers: fetchHeaders
    })
}

export const fetchWithRedux = <
    APIResponse extends APIBaseResponse,
    S,
    E,
    A extends Action
>(
    payload: FetchPayload<APIResponse, A>
): ThunkAction<void, S, E, A> => {
    const { started, success, failure } = payload

    return (dispatch: ThunkDispatch<S, E, A>) => {
        dispatch(started && started())
        fetchWithAuth(payload).then((response: Response) => {
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
