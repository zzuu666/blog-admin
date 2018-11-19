import { HomeAction } from './actions'
import { actionTypes } from './actionTypes'
import { fetchStatus } from '../../utils/fetch-status'

export interface HomeState {
    articles: []
    total: number
}

export default (state: HomeState = { articles: [], total: 0 }, action: HomeAction): HomeState => {
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
        default: {
            return state
        }
    }
}
