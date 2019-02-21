import { actionTypes } from './actionTypes'
import { Recommend } from '../../../models/recommend'
import {
    fetchStatus,
    fetchWithRedux,
    APIBaseResponse
} from '../../../utils/fetch'

interface RecommendAPI extends APIBaseResponse {
    results: Recommend[]
}

interface Payload {
    status: fetchStatus
    response?: RecommendAPI
}

export interface RecommendAction {
    type: actionTypes
    payload: Payload
}

export const fetchRecommendsStarted = (): RecommendAction => ({
    type: actionTypes.RECOMMENDS_GET_LIST_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const fetchRecommendsFailure = (): RecommendAction => ({
    type: actionTypes.RECOMMENDS_GET_LIST_FAILURE,
    payload: {
        status: fetchStatus.FAILURE
    }
})

export const fetchRecommendsSuccess = (
    response: RecommendAPI
): RecommendAction => ({
    type: actionTypes.RECOMMENDS_GET_LIST_SUCCESS,
    payload: {
        response,
        status: fetchStatus.SUCCESS
    }
})

export const fetchRecommends = () =>
    fetchWithRedux({
        method: 'get',
        path: '/recommends',
        started: fetchRecommendsStarted,
        failure: fetchRecommendsFailure,
        success: fetchRecommendsSuccess
    })
