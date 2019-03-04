import { actionTypes } from './actionTypes'
import { Action } from './actions'
import { fetchStatus } from '../../../utils/fetch'
import { RecommendBase } from '../../../models/recommend'
import { message } from 'antd'

export interface RecommendEditState {
    status: fetchStatus
    recommend: RecommendBase
    message: string
}

export default (
    state: RecommendEditState = {
        status: fetchStatus.SUCCESS,
        recommend: {
            reason: '',
            article_id: ''
        },
        message: ''
    },
    action: Action
): RecommendEditState => {
    switch (action.type) {
        case actionTypes.RECOMMEND_EDIT_SHOW_STARTED:
        case actionTypes.RECOMMEND_EDIT_SHOW_FAILURE:
        case actionTypes.RECOMMEND_EDIT_UPDATE_STARTED:
        case actionTypes.RECOMMEND_EDIT_UPDATE_FAILURE: {
            return {
                ...state,
                message: action.payload.message ? action.payload.message : '',
                status: action.payload.status
                    ? action.payload.status
                    : state.status
            }
        }
        case actionTypes.RECOMMEND_EDIT_CACHE:
        case actionTypes.RECOMMEND_EDIT_SHOW_SUCCESS:
        case actionTypes.RECOMMEND_EDIT_UPDATE_SUCCESS: {
            return {
                ...state,
                status: action.payload.status
                    ? action.payload.status
                    : state.status,
                recommend: action.payload.recommend
                    ? action.payload.recommend
                    : state.recommend,
                message: action.payload.message ? action.payload.message : ''
            }
        }
        case actionTypes.RECOMMEND_EDIT_INIT: {
            return {
                status: fetchStatus.SUCCESS,
                recommend: {
                    reason: '',
                    article_id: ''
                },
                message: ''
            }
        }
        default: {
            return state
        }
    }
}
