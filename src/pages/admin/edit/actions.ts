import { actionTypes } from './actionTypes'
import { fetchWithRedux, APIBaseResponse } from '../../../utils/fetch'
import { Article } from '../../../models/article'

interface APIResponse extends APIBaseResponse {
    results: Article
}

export interface EditAction {
    type: actionTypes
    api?: APIResponse
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
    const params = { article: content }
    return fetchWithRedux({
        method: 'post',
        path: `/articles/${id}`,
        params: JSON.stringify(params),
        success: updateArticleSuccess,
        started: fetchArticleStarted,
        failure: fetchArticleFailure
    })
}
