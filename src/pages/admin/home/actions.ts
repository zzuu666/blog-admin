import { actionTypes } from './actionTypes'
import {
    fetchWithRedux,
    APIBaseResponse,
    fetchStatus
} from '../../../utils/fetch'
import { messageType } from '../../../utils/message-type'
import { Article } from '../../../models/article'

interface GetArticles extends APIBaseResponse {
    results: Article[]
}

interface DiscardArticle extends APIBaseResponse {
    results: Article
}

interface Payload {
    articles?: Article[]
    article?: Article
    status: fetchStatus
    message?: string
    messageType?: messageType
}

export interface HomeAction {
    type: string
    payload: Payload
}

export const fetchArticlesStarted = (): HomeAction => ({
    type: actionTypes.HOME_GET_ARTICLES_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const fetchArticlesSuccess = (api: GetArticles): HomeAction => ({
    type: actionTypes.HOME_GET_ARTICLES_SUCCESS,
    payload: {
        status: fetchStatus.SUCCESS,
        articles: api.results,
        message: api.message,
        messageType: messageType.SUCCESS
    }
})

export const fetchArticlesFailure = (api: GetArticles): HomeAction => ({
    type: actionTypes.HOME_GET_ARTICLES_FAILURE,
    payload: {
        status: fetchStatus.FAILURE,
        message: api.message,
        messageType: messageType.ERROR
    }
})

export const discardArticleStarted = (): HomeAction => ({
    type: actionTypes.HOME_DISCARD_ARTICLE_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const discardArticleSuccess = (
    response: DiscardArticle
): HomeAction => ({
    type: actionTypes.HOME_DISCARD_ARTICLE_SUCCESS,
    payload: {
        status: fetchStatus.SUCCESS,
        message: response.message,
        article: response.results,
        messageType: messageType.SUCCESS
    }
})

export const discardArticleFailure = (
    response: DiscardArticle
): HomeAction => ({
    type: actionTypes.HOME_DISCARD_ARTICLE_FAILURE,
    payload: {
        status: fetchStatus.FAILURE,
        message: response.message,
        messageType: messageType.ERROR
    }
})

export const fetchArticles = () => {
    return fetchWithRedux({
        method: 'get',
        path: '/articles',
        started: fetchArticlesStarted,
        success: fetchArticlesSuccess,
        failure: fetchArticlesFailure
    })
}

export const discardArticle = (id: number) => {
    return fetchWithRedux({
        method: 'delete',
        path: `/articles/${id}/discard`,
        started: discardArticleStarted,
        success: discardArticleSuccess,
        failure: discardArticleFailure
    })
}
