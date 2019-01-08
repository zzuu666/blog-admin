import { actionTypes } from './actionTypes'
import { CategoryEditAction } from './actions'
import { fetchStatus } from '../../../utils/fetch'
import { Category } from '../../../models/category'
import { Article } from '../../../models/article'

export interface CategoryEditState {
    status: fetchStatus
    category: Category
    categoryFeatures: Article[]
}

export default (
    state: CategoryEditState = {
        status: fetchStatus.SUCCESS,
        category: {},
        categoryFeatures: []
    },
    action: CategoryEditAction
): CategoryEditState => {
    switch (action.type) {
        case actionTypes.CATEGORY_EDIT_GET_STARTED: {
            return {
                ...state,
                status: fetchStatus.LOADING
            }
        }
        case actionTypes.CATEGORY_EDIT_GET_FAILURE: {
            return {
                ...state,
                status: fetchStatus.FAILURE
            }
        }
        case actionTypes.CATEGORY_EDIT_GET_SUCCESS: {
            return {
                ...state,
                status: fetchStatus.SUCCESS,
                category: action.api ? action.api.results : state.category
            }
        }
        case actionTypes.CATEGORY_EDIT_CACHE_SUCCESS: {
            return {
                ...state,
                category: action.category ? action.category : state.category
            }
        }
        case actionTypes.CATEGORY_EDIT_FEATURED_SUCCESS: {
            return {
                ...state,
                categoryFeatures: action.featuredApi
                    ? action.featuredApi.results
                    : []
            }
        }
        default: {
            return state
        }
    }
}
