import { actionTypes } from './actionTypes'
import {
    fetchStatus,
    APIBaseResponse,
    fetchWithRedux
} from '../../../utils/fetch'
import { Recommend, RecommendBase } from '../../../models/recommend'
import { message } from 'antd'

interface ResponseAPI extends APIBaseResponse {
    results: Recommend
}

interface Payload {
    status?: fetchStatus
    recommend?: RecommendBase
    message?: string
}

export interface Action {
    type: actionTypes
    payload: Payload
}

export const recommendEditUpdateStarted = (): Action => ({
    type: actionTypes.RECOMMEND_EDIT_UPDATE_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const recommendEditUpdateFailure = (): Action => ({
    type: actionTypes.RECOMMEND_EDIT_UPDATE_FAILURE,
    payload: {
        status: fetchStatus.FAILURE
    }
})

export const recommendEditUpdateSuccess = (response: ResponseAPI): Action => ({
    type: actionTypes.RECOMMEND_EDIT_UPDATE_SUCCESS,
    payload: {
        status: fetchStatus.SUCCESS,
        recommend: response.results,
        message: response.message
    }
})

export const recommendEditShowStarted = (): Action => ({
    type: actionTypes.RECOMMEND_EDIT_SHOW_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const recommendEditShowFailure = (): Action => ({
    type: actionTypes.RECOMMEND_EDIT_SHOW_FAILURE,
    payload: {
        status: fetchStatus.FAILURE
    }
})

export const recommendEditShowSuccess = (response: ResponseAPI): Action => ({
    type: actionTypes.RECOMMEND_EDIT_SHOW_SUCCESS,
    payload: {
        status: fetchStatus.SUCCESS,
        recommend: response.results
    }
})

export const recommendEditShow = (id: string) =>
    fetchWithRedux({
        method: 'get',
        path: `/recommends/${id}`,
        success: recommendEditShowSuccess,
        failure: recommendEditShowFailure,
        started: recommendEditShowStarted
    })

export interface SubmitParams {
    id: string
    recommend: RecommendBase
}

export const recommendEditUpdate = ({ id, recommend }: SubmitParams) =>
    fetchWithRedux({
        method: 'post',
        path: `/recommends/${id}`,
        params: JSON.stringify(recommend),
        started: recommendEditUpdateStarted,
        failure: recommendEditUpdateFailure,
        success: recommendEditUpdateSuccess
    })

export const recommendEditCache = (recommend: RecommendBase): Action => ({
    type: actionTypes.RECOMMEND_EDIT_CACHE,
    payload: {
        recommend
    }
})
