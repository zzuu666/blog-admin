import { actionTypes } from './actionTypes'
import { fetchWithRedux, APIBaseResponse } from '../../../utils/fetch'
import { Article } from '../../../models/article'
import { Category } from '../../../models/category'

interface APIResopnse extends APIBaseResponse {
    results: Category[]
}
export interface CreateAction {
    type: actionTypes,
    createAPI?: APIBaseResponse,
    categoryAPI?: APIResopnse
    article?: Article
}

export const createArticleStarted = (): CreateAction => ({
    type: actionTypes.CREATE_ARTICLE_STARTED
})

export const createArticleFailure = (api: APIBaseResponse): CreateAction => ({
    createAPI: api,
    type: actionTypes.CREATE_ARTICLE_FAILURE
})

export const createArticleSuccess = (api: APIBaseResponse): CreateAction => ({
    createAPI: api,
    type: actionTypes.CREATE_ARTICLE_SUCCESS
})

export const createArticleSetCache = (article: Article): CreateAction => ({
    article,
    type: actionTypes.CREATE_ARTICLE_SET_CACHE
})

export const createArticleGetCategoryStarted = (): CreateAction => ({
    type: actionTypes.CREATE_ARTICLE_GET_ATEGORY_STARTED
})

export const createArticleGetCategoryFailure = (api: APIResopnse): CreateAction => ({
    categoryAPI: api,
    type: actionTypes.CREATE_ARTICLE_GET_ATEGORY_FAILURE
})

export const createArticleGetCategorySuccess = (api: APIResopnse): CreateAction => ({
    categoryAPI: api,
    type: actionTypes.CREATE_ARTICLE_GET_ATEGORY_SUCCESS
})

export const createArticleGetCategory = () => {

    return fetchWithRedux({
        method: 'get',
        path: '/categories',
        started: createArticleGetCategoryStarted,
        success: createArticleGetCategorySuccess,
        failure: createArticleGetCategoryFailure
    })
}

export const createArticle = (acticle: Article) => {

    return fetchWithRedux({
        method: 'post',
        path: '/articles',
        params: JSON.stringify(acticle),
        started: createArticleStarted,
        success: createArticleSuccess,
        failure: createArticleFailure
    })
}
