import { actionTypes } from './actionTypes'
import { RecommendBase } from '../../../models/recommend'
import { fetchStatus } from '../../../utils/fetch'
import { RecommendCreateAction } from './actions'

export interface RecommendCreateState {
    status: fetchStatus
    recommend: RecommendBase
    message: string
}

export default (
    state: RecommendCreateState = {
        status: fetchStatus.SUCCESS,
        recommend: {
            reason: '',
            article_id: ''
        },
        message: ''
    },
    action: RecommendCreateAction
): RecommendCreateState => {
    switch (action.type) {
        case actionTypes.RECOMMEND_POST_CREATE_STARTED:
        case actionTypes.RECOMMEND_POST_CREATE_FAILURE:
        case actionTypes.RECOMMEND_POST_CREATE_CACHE:
        case actionTypes.RECOMMEND_POST_CREATE_SUCCESS: {
            return {
                ...state,
                status: action.payload.status
                    ? action.payload.status
                    : state.status,
                recommend: action.payload.recommend
                    ? action.payload.recommend
                    : state.recommend,
                message: action.payload.message || ''
            }
        }
        case actionTypes.RECOMMEND_CREATE_INITIALIZE: {
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
