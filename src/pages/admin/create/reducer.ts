import { actionTypes } from './actionTypes'
import { Article } from '../../../models/article'
import { fetchStatus } from '../../../utils/fetch'
import { CreateAction } from './actions'

export interface CreateState {
    status: fetchStatus
    article: Article
}

export default (
    state: CreateState = { status: fetchStatus.SUCCESS, article: {} },
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
        default: {
            return state
        }
    }
}
