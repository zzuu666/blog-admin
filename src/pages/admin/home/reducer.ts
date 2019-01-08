import { HomeAction } from './actions'
import { actionTypes } from './actionTypes'
import { Article } from '../../../models/article'

export interface HomeState {
    articles: Article[]
    total: number
    status: 'success' | 'loading' | 'error'
    error: number
}
export default (
    state: HomeState = { articles: [], total: 0, status: 'loading', error: 0 },
    action: HomeAction
): HomeState => {
    switch (action.type) {
        case actionTypes.HOME_GET_ARTICLES_SUCCESS: {
            return {
                ...state,
                articles: (action.api && action.api.results) || []
            }
        }
        case actionTypes.HOME_GET_ARTICLES_FAILURE: {
            return {
                ...state,
                status: 'error',
                error: (action.api && action.api.error) || -1
            }
        }
        case actionTypes.HOME_GET_ARTICLES_STARTED: {
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}
