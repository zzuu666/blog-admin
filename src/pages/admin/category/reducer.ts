import { actionTypes } from './actionTypes'
import { CategoryAction } from './actions'
import { Category } from '../../../models/category'
import { fetchStatus } from '../../../utils/fetch'

export interface CategoryState {
    status: fetchStatus
    categories: Category[]
}

export default (
    state: CategoryState = {
        status: fetchStatus.SUCCESS,
        categories: []
    },
    action: CategoryAction
): CategoryState => {
    switch (action.type) {
        case actionTypes.CATEGORY_GET_LIST_STARTED: {
            return {
                ...state,
                status: fetchStatus.LOADING
            }
        }
        case actionTypes.CATEGORY_GET_LIST_FAILURE: {
            return {
                ...state,
                status: fetchStatus.FAILURE
            }
        }
        case actionTypes.CATEGORY_GET_LIST_SUCCESS: {
            return {
                ...state,
                status: fetchStatus.SUCCESS,
                categories: action.api ? action.api.results : []
            }
        }
        default: {
            return state
        }
    }
}
