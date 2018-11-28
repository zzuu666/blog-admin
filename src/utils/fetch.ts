import { fetchHost, apiRoute, apiVersion } from './fetch-host'

type Method = 'get' | 'post' | 'put' | 'delete'

interface FetchPayload<T extends APIBaseResponse> {
    method: Method
    path: string
    params?: Blob | BufferSource | FormData | URLSearchParams | ReadableStream | string
    started?: () => void
    success?: (success: T) => any
    failure?: (error: T) => any,
    headers?: Headers
}

export interface APIBaseResponse {
    error: number
    message: string
}

export enum fetchStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILURE = 'failure'
}

export const fetchWithRedux = <APIResponse extends APIBaseResponse>(payload: FetchPayload<APIResponse>) => {
    const {
        params,
        started,
        success,
        failure,
        headers
    } = payload
    const method = payload.method ? payload.method : 'get'
    const path = payload.path[0] === '/' ? payload.path : `/${payload.path}`
    const authorizationHeader = localStorage.getItem('AUTH_TOKEN') || ''

    const fetchUrl = `${fetchHost}/${apiRoute}/${apiVersion}${path}`
    const fetchHeaders: Headers = headers || new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Accept': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': authorizationHeader
    })
    return (dispatch: any) => {
        dispatch(started && started())
        fetch(fetchUrl, {
            method,
            body: params || null,
            headers: fetchHeaders
        }).then((response: Response) => {
            response.json().then((json: APIResponse) => {
                if (json.error === 0) {
                    dispatch(success && success(json))
                }
                else {
                    dispatch(failure && failure(json))
                }
            })
        })
    }
}
