import { actionTypes } from './actionTypes'
import {
    APIBaseResponse,
    fetchWithRedux,
    fetchStatus
} from '../../../utils/fetch'
import { Recommend, RecommendBase } from '../../../models/recommend'

interface CreateAPI extends APIBaseResponse {
    results: Recommend
}

interface Payload {
    status: fetchStatus
    response?: CreateAPI
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
        response,
        status: fetchStatus.SUCCESS
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
