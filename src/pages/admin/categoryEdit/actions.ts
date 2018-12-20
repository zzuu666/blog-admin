import { actionTypes } from './actionTypes'
import { APIBaseResponse, fetchWithRedux } from '../../../utils/fetch'
import { apiAdminSuffix } from '../../../utils/fetch-host'
import { Category } from '../../../models/category'
import { Article } from '../../../models/article'

interface GetAPIResponse extends APIBaseResponse {
    results: Category
}

interface FeaturedAPIResponse extends APIBaseResponse {
    results: Article[]
}

export interface CategoryEditAction {
    type: actionTypes
    api?: GetAPIResponse
    featuredApi?: FeaturedAPIResponse
    category?: Category
}

export const categoryEditGetStarted = (): CategoryEditAction => ({
    type: actionTypes.CATEGORY_EDIT_GET_STARTED
})

export const categoryEditGetFailure = (api: GetAPIResponse): CategoryEditAction => ({
    api,
    type: actionTypes.CATEGORY_EDIT_GET_FAILURE
})

export const categoryEditGetSuccess = (api: GetAPIResponse): CategoryEditAction => ({
    api,
    type: actionTypes.CATEGORY_EDIT_GET_SUCCESS
})

export const categoryEditPostStarted = (): CategoryEditAction => ({
    type: actionTypes.CATEGORY_EDIT_POST_STARTED
})

export const categoryEditPostFailure = (api: GetAPIResponse): CategoryEditAction => ({
    api,
    type: actionTypes.CATEGORY_EDIT_POST_FAILURE
})

export const categoryEditPostSuccess = (api: GetAPIResponse): CategoryEditAction => ({
    api,
    type: actionTypes.CATEGORY_EDIT_POST_SUCCESS
})

export const categoryEditFeaturedStarted = (): CategoryEditAction => ({
    type: actionTypes.CATEGORY_EDIT_FEATURED_STARTED
})

export const categoryEditFeaturedFailure = (featuredApi: FeaturedAPIResponse): CategoryEditAction => ({
    featuredApi,
    type: actionTypes.CATEGORY_EDIT_FEATURED_FAILURE
})

export const categoryEditFeaturedSuccess = (featuredApi: FeaturedAPIResponse): CategoryEditAction => ({
    featuredApi,
    type: actionTypes.CATEGORY_EDIT_FEATURED_SUCCESS
})

export const categoryEditCacheSuccess = (category: Category): CategoryEditAction => ({
    category,
    type: actionTypes.CATEGORY_EDIT_CACHE_SUCCESS
})

export const categoryEditGet = (id: string) => {

    return fetchWithRedux({
        method: 'get',
        path: `/categories/${id}`,
        started: categoryEditGetStarted,
        success: categoryEditGetSuccess,
        failure: categoryEditGetFailure
    })
}

export const categoryEditPost = (id: string, value: Category) => {
    const params: string = JSON.stringify(value)

    return fetchWithRedux({
        params,
        method: 'post',
        path: `/categories/${id}`,
        started: categoryEditPostStarted,
        success: categoryEditPostSuccess,
        failure: categoryEditPostFailure
    })
}

export const categoryEditFeatured = (category: string, search: string) => {
    const qs = { search, category_id: category }

    return fetchWithRedux({
        qs,
        method: 'get',
        path: `/articles${apiAdminSuffix}`,
        started: categoryEditFeaturedStarted,
        success: categoryEditFeaturedSuccess,
        failure: categoryEditFeaturedFailure
    })
}
