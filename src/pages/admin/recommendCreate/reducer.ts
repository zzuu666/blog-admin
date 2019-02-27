import { actionTypes } from './actionTypes'
import { RecommendBase, Recommend } from '../../../models/recommend'
import { fetchStatus } from '../../../utils/fetch'
import { RecommendCreateAction } from './actions'

export interface RecommendCreateState {
    status: fetchStatus
    recommend: RecommendBase | Recommend
}

export default (
    state: RecommendCreateState = {
        status: fetchStatus.SUCCESS,
        recommend: {
            reason: '',
            article_id: ''
        }
    },
    action: RecommendCreateAction
): RecommendCreateState => {
    switch (action.type) {
        case actionTypes.RECOMMEND_POST_CREATE_STARTED:
        case actionTypes.RECOMMEND_POST_CREATE_FAILURE: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case actionTypes.RECOMMEND_POST_CREATE_SUCCESS: {
            return {
                ...state,
                status: action.payload.status,
                recommend: action.payload.response
                    ? action.payload.response.results
                    : state.recommend
            }
        }
        default: {
            return state
        }
    }
}
