import { actionTypes } from './actionTypes'
import { fetchStatus } from '../../utils/fetch-status'
import { fetchWithRedux } from '../../utils/fetch'
import { Article } from '../../models/article'

export interface EditAction {
    type: fetchStatus | actionTypes
    article?: Article
    success?: any
    error?: any
}

export const fetchArticleStarted = (): EditAction => ({
    type: actionTypes.EDIT_GET_ARTICLE_STARTED
})

export const fetchArticleSuccess = (success: any): EditAction => ({
    success,
    type: actionTypes.EDIT_GET_ARTICLE_SUCCESS
})

export const fetchArticleFailure = (error: any): EditAction => ({
    error,
    type: actionTypes.EDIT_GET_ARTICLE_FAILURE
})

export const updateArticleSuccess = (success: any): EditAction => ({
    success,
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
