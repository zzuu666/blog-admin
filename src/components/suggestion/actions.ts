import { actionTypes } from './actionTypes'
import {
    fetchStatus,
    fetchWithRedux,
    Method,
    APIBaseResponse
} from '../../utils/fetch'

interface Payload {
    status: fetchStatus
    response?: SuggestionAPI
}

interface SuggestionAPI extends APIBaseResponse {
    results: []
}

export interface SuggestionAction {
    type: actionTypes
    payload: Payload
}

export interface SuggestionGetParams {
    path: string
    method?: Method
    params?: string
    qs?: Record<string, string>
}

export const suggestionGetStarted = (): SuggestionAction => ({
    type: actionTypes.COMPONENT_SUGGESTION_GET_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const suggestionGetFailure = (): SuggestionAction => ({
    type: actionTypes.COMPONENT_SUGGESTION_GET_FAILURE,
    payload: {
        status: fetchStatus.FAILURE
    }
})

export const suggestionGetSuccess = (
    response: SuggestionAPI
): SuggestionAction => ({
    type: actionTypes.COMPONENT_SUGGESTION_GET_SUCCESS,
    payload: {
        response,
        status: fetchStatus.SUCCESS
    }
})

export const suggestionGet = ({
    method = 'get',
    path,
    params,
    qs
}: SuggestionGetParams) =>
    fetchWithRedux({
        method,
        path,
        params,
        qs,
        started: suggestionGetStarted,
        failure: suggestionGetFailure,
        success: suggestionGetSuccess
    })
