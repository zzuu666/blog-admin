import { HomeAction } from './actions'
import { actionTypes } from './actionTypes'

export interface HomeState {
    articles: []
    total: number
    status: 'success' | 'loading' | 'error'
}

export default (state: HomeState = { articles: [], total: 0, status: 'loading' }, action: HomeAction): HomeState => {
    switch (action.type) {
        case actionTypes.HOME_GET_ARTICLES_SUCCESS: {
            return {
                ...state,
                articles: action.articles
            }
        }
        case actionTypes.HOME_GET_ARTICLES_FAILURE: {
            return {
                ...state
            }
        }
        case actionTypes.HOME_GET_ARTICLES_STARTED: {
            return {
                ...state,
                articles: action.success
            }
        }
        default: {
            return state
        }
    }
}
