import { actionTypes } from './actionTypes'
import {
    APIBaseResponse,
    fetchWithRedux,
    fetchStatus
} from '../../../utils/fetch'
import { RecommendBase } from '../../../models/recommend'

interface CreateAPI extends APIBaseResponse {
    results: RecommendBase
}

interface Payload {
    status?: fetchStatus
    recommend?: RecommendBase
    message?: string
}

export interface RecommendCreateAction {
    type: actionTypes
    payload: Payload
}

export const recommendPostCreateStarted = (): RecommendCreateAction => ({
    type: actionTypes.RECOMMEND_POST_CREATE_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const recommendPostCreateFailure = (): RecommendCreateAction => ({
    type: actionTypes.RECOMMEND_POST_CREATE_FAILURE,
    payload: {
        status: fetchStatus.FAILURE
    }
})

export const recommendPostCreateSuccess = (
    response: CreateAPI
): RecommendCreateAction => ({
    type: actionTypes.RECOMMEND_POST_CREATE_SUCCESS,
    payload: {
        status: fetchStatus.SUCCESS,
        recommend: response.results,
        message: response.message
    }
})

export const recommendPostCreate = (recommend: RecommendBase) =>
    fetchWithRedux({
        path: 'recommends',
        method: 'post',
        params: JSON.stringify(recommend),
        started: recommendPostCreateStarted,
        failure: recommendPostCreateFailure,
        success: recommendPostCreateSuccess
    })

export const recommendPostCreateCache = (
    recommend: RecommendBase
): RecommendCreateAction => ({
    type: actionTypes.RECOMMEND_POST_CREATE_CACHE,
    payload: {
        recommend
    }
})

export const recommendCreateInitialize = (): RecommendCreateAction => ({
    type: actionTypes.RECOMMEND_CREATE_INITIALIZE,
    payload: {}
})
