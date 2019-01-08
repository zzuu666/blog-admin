import { actionTypes } from './actionTypes'
import { Category } from '../../../models/category'
import {
    fetchStatus,
    fetchWithRedux,
    APIBaseResponse
} from '../../../utils/fetch'

interface CategoryAPI extends APIBaseResponse {
    results: Category[]
}

export interface CategoryAction {
    type: actionTypes
    status: fetchStatus
    api?: CategoryAPI
}

export const fetchCategoriesStarted = (): CategoryAction => ({
    type: actionTypes.CATEGORY_GET_LIST_STARTED,
    status: fetchStatus.LOADING
})

export const fetchCategoriesFailure = (): CategoryAction => ({
    type: actionTypes.CATEGORY_GET_LIST_FAILURE,
    status: fetchStatus.FAILURE
})

export const fetchCategoriesSuccess = (api: CategoryAPI): CategoryAction => ({
    api,
    type: actionTypes.CATEGORY_GET_LIST_SUCCESS,
    status: fetchStatus.SUCCESS
})

export const fetchCategories = () => {
    return fetchWithRedux({
        method: 'get',
        path: '/categories',
        started: fetchCategoriesStarted,
        success: fetchCategoriesSuccess,
        failure: fetchCategoriesFailure
    })
}
