import { actionTypes } from './actionTypes'
import { fetchWithRedux, APIBaseResponse } from '../../utils/fetch'

export interface APIResponse extends APIBaseResponse {
    token: string
}

export interface LoginAction {
    type: actionTypes,
    api?: APIResponse
}

export const fetchLoginStarted = (): LoginAction => ({
    type: actionTypes.LOGIN_GET_AUTH_STARTED
})

export const fetchLoginFailure = (api: APIResponse): LoginAction => ({
    api,
    type: actionTypes.LOGIN_GET_AUTH_FAILURE
})

export const fetchLoginSuccess = (api: APIResponse): LoginAction => ({
    api,
    type: actionTypes.LOGIN_GET_AUTH_SUCCESS
})

export const fetchLogin = (email: string, password: string) => {
    const params = { email, password }
    return fetchWithRedux({
        method: 'post',
        path: '/auth/login',
        params: JSON.stringify(params),
        started: fetchLoginStarted,
        failure: fetchLoginFailure,
        success: fetchLoginSuccess
    })
}
