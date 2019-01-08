import { actionTypes } from './actionTypes'
import { CategoryCreateAction } from './actions'
import { fetchStatus } from '../../../utils/fetch'
import { Category } from '../../../models/category'

export interface CategoryCreateState {
    status: fetchStatus
    category: Category
}

export default (
    state: CategoryCreateState = {
        status: fetchStatus.SUCCESS,
        category: {
            id: -1,
            desc: '',
            name: '',
            key: ''
        }
    },
    action: CategoryCreateAction
): CategoryCreateState => {
    switch (action.type) {
        case actionTypes.CATEGORY_CREATE_POST_STARTED: {
            return {
                ...state,
                status: fetchStatus.LOADING
            }
        }
        case actionTypes.CATEGORY_CREATE_POST_FAILURE: {
            return {
                ...state,
                status: fetchStatus.FAILURE
            }
        }
        case actionTypes.CATEGORY_CREATE_POST_SUCCESS: {
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
