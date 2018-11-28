import { actionTypes } from './actionTypes'
import { fetchWithRedux, APIBaseResponse } from '../../../utils/fetch'
import { Article } from '../../../models/article'

export interface CreateAction {
    type: actionTypes,
    api?: APIBaseResponse
}

export const createArticleStarted = (): CreateAction => ({
    type: actionTypes.CREATE_ARTICLE_STARTED
})

export const createArticleFailure = (api: APIBaseResponse): CreateAction => ({
    api,
    type: actionTypes.CREATE_ARTICLE_FAILURE
})

export const createArticleSuccess = (api: APIBaseResponse): CreateAction => ({
    api,
    type: actionTypes.CREATE_ARTICLE_SUCCESS
})

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
