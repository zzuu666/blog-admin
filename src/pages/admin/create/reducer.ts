import { actionTypes } from './actionTypes'
import { Article } from '../../../models/article'
import { Category } from '../../../models/category'
import { fetchStatus } from '../../../utils/fetch'
import { CreateAction } from './actions'

export interface CreateState {
    status: fetchStatus
    article: Article,
    categories: Category[]
}

export default (
    state: CreateState = { status: fetchStatus.SUCCESS, article: {}, categories: [] },
    action: CreateAction
): CreateState => {
    switch (action.type) {
        case actionTypes.CREATE_ARTICLE_STARTED: {
            return {
                ...state,
                status: fetchStatus.LOADING
            }
        }
        case actionTypes.CREATE_ARTICLE_FAILURE: {
            return {
                ...state,
                status: fetchStatus.FAILURE
            }
        }
        case actionTypes.CREATE_ARTICLE_SUCCESS: {
            return {
                ...state,
                status: fetchStatus.SUCCESS
            }
        }
        case actionTypes.CREATE_ARTICLE_SET_CACHE: {
            return {
                ...state,
                article: action.article ? action.article : {}
            }
        }
        case actionTypes.CREATE_ARTICLE_GET_ATEGORY_STARTED: {
            return {
                ...state,
                status: fetchStatus.LOADING,
            }
        }
        case actionTypes.CREATE_ARTICLE_GET_ATEGORY_FAILURE: {
            return {
                ...state,
                status: fetchStatus.FAILURE,
                categories: []
            }
        }
        case actionTypes.CREATE_ARTICLE_GET_ATEGORY_SUCCESS: {
            return {
                ...state,
                status: fetchStatus.SUCCESS,
                categories: action.categoryAPI ? action.categoryAPI.results : []
            }
        }
        default: {
            return state
        }
    }
}
