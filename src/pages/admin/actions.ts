import { actionTypes } from './actionTypes'
import { fetchWithRedux, APIBaseResponse } from '../../utils/fetch'

export interface AppAction {
    type: actionTypes
    api?: APIBaseResponse
}

export const fetchAuthStarted = (): AppAction => ({
    type: actionTypes.APP_GET_AUTH_STARTED
})

export const fetchAuthSuccess = (api: APIBaseResponse): AppAction => ({
    api,
    type: actionTypes.APP_GET_AUTH_SUCCESS
})

export const fetchAuthFailure = (api: APIBaseResponse): AppAction => ({
    api,
    type: actionTypes.APP_GET_AUTH_FAILURE
})

export const fetchAuth = () => {
    return fetchWithRedux({
        method: 'get',
        path: '/auth',
        started: fetchAuthStarted,
        success: fetchAuthSuccess,
        failure: fetchAuthFailure
    })
}
