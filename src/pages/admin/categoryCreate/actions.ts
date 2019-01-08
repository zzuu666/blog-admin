import { actionTypes } from './actionTypes'
import { APIBaseResponse, fetchWithRedux } from '../../../utils/fetch'
import { Category } from '../../../models/category'

export interface CategoryCreateAction {
    type: actionTypes
    api?: APIBaseResponse
    category?: Category
}

export const categoryCreateStarted = (): CategoryCreateAction => ({
    type: actionTypes.CATEGORY_CREATE_POST_STARTED
})

export const categoryCreateFailure = (
    api: APIBaseResponse
): CategoryCreateAction => ({
    api,
    type: actionTypes.CATEGORY_CREATE_POST_FAILURE
})

export const categoryCreateSuccess = (
    api: APIBaseResponse
): CategoryCreateAction => ({
    api,
    type: actionTypes.CATEGORY_CREATE_POST_SUCCESS
})

export const categorySetCache = (category: Category): CategoryCreateAction => ({
    category,
    type: actionTypes.CATEGORY_CREATE_SET_CACHE
})

export const categoryCreate = (category: Category) => {
    const params = JSON.stringify(category)

    return fetchWithRedux({
        params,
        method: 'post',
        path: '/categories',
        started: categoryCreateStarted,
        success: categoryCreateSuccess,
        failure: categoryCreateFailure
    })
}
