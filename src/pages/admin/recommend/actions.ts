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

interface RecommendDeleteAPI extends APIBaseResponse {
    results: Recommend
}

interface Payload {
    status: fetchStatus
    response?: RecommendAPI
    message?: string
    recommends?: Recommend[]
    deletedRecommend?: Recommend
}

export interface Action {
    type: actionTypes
    payload: Payload
}

export const fetchRecommendsStarted = (): Action => ({
    type: actionTypes.RECOMMENDS_GET_LIST_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const fetchRecommendsFailure = (): Action => ({
    type: actionTypes.RECOMMENDS_GET_LIST_FAILURE,
    payload: {
        status: fetchStatus.FAILURE
    }
})

export const fetchRecommendsSuccess = (response: RecommendAPI): Action => ({
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

export const recommendDeleteStarted = (): Action => ({
    type: actionTypes.RECOMMEND_DELETE_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const recommendDeleteFailure = (): Action => ({
    type: actionTypes.RECOMMEND_DELETE_FAILURE,
    payload: {
        status: fetchStatus.FAILURE
    }
})

export const recommendDeleteSuccess = (
    response: RecommendDeleteAPI
): Action => ({
    type: actionTypes.RECOMMEND_DELETE_SUCCESS,
    payload: {
        status: fetchStatus.SUCCESS,
        message: response.message,
        deletedRecommend: response.results
    }
})

export const recommendDelete = (id: string) =>
    fetchWithRedux({
        method: 'delete',
        path: `/recommends/${id}`,
        started: recommendDeleteStarted,
        failure: recommendDeleteFailure,
        success: recommendDeleteSuccess
    })
