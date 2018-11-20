import { HomeAction } from './actions'
import { actionTypes } from './actionTypes'
import { fetchStatus } from '../../utils/fetch-status'

export interface HomeState {
    articles: []
    total: number
    status: 'success' | 'loading' | 'error'
}

export default (state: HomeState = { articles: [], total: 0, status: 'loading' }, action: HomeAction): HomeState => {
    switch (action.type) {
        case actionTypes.HOME_ADD_ARTICLES: {
            return {
                ...state,
                articles: action.articles
            }
        }
        case fetchStatus.FETCH_STATUS_FAILURE: {
            return {
                ...state
            }
        }
        case fetchStatus.FETCH_STATUS_SUCCESS: {
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
