import { actionTypes } from './actionTypes'
import { Action } from './actions'
import { fetchStatus } from '../../../utils/fetch'
import { RecommendBase } from '../../../models/recommend'

export interface RecommendEditState {
    status: fetchStatus
    recommend: RecommendBase
}

export default (
    state: RecommendEditState = {
        status: fetchStatus.SUCCESS,
        recommend: {
            reason: '',
            article_id: ''
        }
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
                status: action.payload.status
            }
        }
        case actionTypes.RECOMMEND_EDIT_SHOW_SUCCESS:
        case actionTypes.RECOMMEND_EDIT_UPDATE_SUCCESS: {
            return {
                ...state,
                status: action.payload.status,
                recommend: action.payload.recommend
                    ? action.payload.recommend
                    : state.recommend
            }
        }
        default: {
            return state
        }
    }
}
