import { actionTypes } from './actionTypes'
import { fetchWithRedux, APIBaseResponse } from '../../../utils/fetch'
import { Article } from '../../../models/article'
import { Category } from '../../../models/category'

interface APIResponse extends APIBaseResponse {
    results: {
        article: Article,
        categories: Category[]
    }
}

export interface EditAction {
    type: actionTypes
    api?: APIResponse
    article?: Article
}

export const fetchArticleStarted = (): EditAction => ({
    type: actionTypes.EDIT_GET_ARTICLE_STARTED
})

export const fetchArticleSuccess = (api: APIResponse): EditAction => ({
    api,
    type: actionTypes.EDIT_GET_ARTICLE_SUCCESS
})

export const fetchArticleFailure = (api: APIResponse): EditAction => ({
    api,
    type: actionTypes.EDIT_GET_ARTICLE_FAILURE
})

export const updateArticleSuccess = (api: APIResponse): EditAction => ({
    api,
    type: actionTypes.EDIT_UPDATE_ARTICLE_SUCCESS
})

export const cacheArticle = (article: Article): EditAction => ({
    article,
    type: actionTypes.EDIT_CACHE_ARTICLE
})

export const fetchArticle = (id: string) => {
    return fetchWithRedux({
        method: 'get',
        path: `/articles/${id}`,
        success: fetchArticleSuccess,
        started: fetchArticleStarted,
        failure: fetchArticleFailure
    })
}

export const updateArticle = (id: string, content: Article) => {
    return fetchWithRedux({
        method: 'post',
        path: `/articles/${id}`,
        params: JSON.stringify(content),
        success: updateArticleSuccess,
        started: fetchArticleStarted,
        failure: fetchArticleFailure
    })
}
