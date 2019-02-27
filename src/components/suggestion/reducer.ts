import { actionTypes } from './actionTypes'
import { SuggestionAction } from './actions'
import { fetchStatus } from '../../utils/fetch'

export interface SuggestionState {
    status: fetchStatus
    results: []
}

export default (
    state: SuggestionState = {
        status: fetchStatus.SUCCESS,
        results: []
    },
    action: SuggestionAction
): SuggestionState => {
    switch (action.type) {
        case actionTypes.COMPONENT_SUGGESTION_GET_STARTED:
        case actionTypes.COMPONENT_SUGGESTION_GET_FAILURE: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case actionTypes.COMPONENT_SUGGESTION_GET_SUCCESS: {
            return {
                ...state,
                status: action.payload.status,
                results: action.payload.response
                    ? action.payload.response.results
                    : state.results
            }
        }
        default: {
            return state
        }
    }
}
