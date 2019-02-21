import { fetchStatus } from '../../../utils/fetch'
import { Recommend } from '../../../models/recommend'
import { RecommendAction } from './actions'
import { actionTypes } from './actionTypes'

export interface RecommendState {
    status: fetchStatus
    recommends: Recommend[]
}

export default (
    state: RecommendState = {
        status: fetchStatus.SUCCESS,
        recommends: []
    },
    action: RecommendAction
): RecommendState => {
    switch (action.type) {
        case actionTypes.RECOMMENDS_GET_LIST_STARTED: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case actionTypes.RECOMMENDS_GET_LIST_FAILURE: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case actionTypes.RECOMMENDS_GET_LIST_SUCCESS: {
            return {
                status: action.payload.status,
                recommends: action.payload.response
                    ? action.payload.response.results
                    : state.recommends
            }
        }
        default: {
            return state
        }
    }
}
