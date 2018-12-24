import { EditAction } from './actions'
import { actionTypes } from './actionTypes'
import { Article } from '../../../models/article'
import { Category } from '../../../models/category'

export interface EditState {
    article: Article
    categories: Category[]
    status: 'success' | 'loading' | 'error'
    message?: string
}

export default (
    state: EditState = { article: {}, categories: [], status: 'loading' },
    action: EditAction
): EditState => {
    switch (action.type) {
        case actionTypes.EDIT_GET_ARTICLE_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case actionTypes.EDIT_GET_ARTICLE_FAILURE: {
            return {
                ...state,
                status: 'error'
            }
        }
        case actionTypes.EDIT_GET_ARTICLE_SUCCESS: {
            return {
                ...state,
                article: action.api ? action.api.results.article : {},
                categories: action.api ? action.api.results.categories : [],
                message: undefined,
                status: 'success'
            }
        }
        case actionTypes.EDIT_UPDATE_ARTICLE_SUCCESS: {
            return {
                ...state,
                status: 'success',
                message: action.api && action.api.message
            }
        }
        case actionTypes.EDIT_CACHE_ARTICLE: {
            return {
                ...state,
                article: action.article ? action.article : {}
            }
        }
        default: {
            return state
        }
    }
}
