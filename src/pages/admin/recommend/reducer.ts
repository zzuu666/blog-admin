import { fetchStatus } from '../../../utils/fetch'
import { Recommend } from '../../../models/recommend'
import { Action } from './actions'
import { actionTypes } from './actionTypes'

export interface RecommendState {
    status: fetchStatus
    recommends: Recommend[]
    message: string
}

export default (
    state: RecommendState = {
        status: fetchStatus.SUCCESS,
        recommends: [],
        message: ''
    },
    action: Action
): RecommendState => {
    switch (action.type) {
        case actionTypes.RECOMMEND_DELETE_STARTED:
        case actionTypes.RECOMMEND_DELETE_FAILURE:
        case actionTypes.RECOMMENDS_GET_LIST_STARTED:
        case actionTypes.RECOMMENDS_GET_LIST_FAILURE: {
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message || ''
            }
        }
        case actionTypes.RECOMMENDS_GET_LIST_SUCCESS: {
            return {
                ...state,
                status: action.payload.status,
                recommends: action.payload.response
                    ? action.payload.response.results
                    : state.recommends
            }
        }
        case actionTypes.RECOMMEND_DELETE_SUCCESS: {
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message || '',
                recommends: action.payload.deletedRecommend
                    ? state.recommends.filter(
                          el =>
                              el.article_id !==
                              action.payload.deletedRecommend!.article_id
                      )
                    : state.recommends
            }
        }
        default: {
            return state
        }
    }
}
