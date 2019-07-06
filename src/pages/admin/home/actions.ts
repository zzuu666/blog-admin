import { actionTypes } from './actionTypes'
import {
    fetchWithRedux,
    APIBaseResponse,
    fetchStatus
} from '../../../utils/fetch'
import { messageType } from '../../../utils/message-type'
import { Article } from '../../../models/article'

export type FetchArticlesOption = {
    status: articleStatus
}
export type articleStatus = 'normal' | 'hide' | 'trash'

export type UpdateArticleStatusOption = {
    id: number
    operation: updateOperation
}
export type updateOperation = 'hide' | 'discard' | 'recover' | 'delete'

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
        message: '',
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

export const updateArticleStatusStarted = (): HomeAction => ({
    type: actionTypes.HOME_DISCARD_ARTICLE_STARTED,
    payload: {
        status: fetchStatus.LOADING
    }
})

export const updateArticleStatusSuccess = (
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

export const updateArticleStatusFailure = (
    response: DiscardArticle
): HomeAction => ({
    type: actionTypes.HOME_DISCARD_ARTICLE_FAILURE,
    payload: {
        status: fetchStatus.FAILURE,
        message: response.message,
        messageType: messageType.ERROR
    }
})

export const fetchArticles = (option: FetchArticlesOption) => {
    return fetchWithRedux({
        method: 'get',
        path: '/articles',
        qs: {
            status: option.status
        },
        started: fetchArticlesStarted,
        success: fetchArticlesSuccess,
        failure: fetchArticlesFailure
    })
}

export const updateArticleStatus = ({
    id,
    operation
}: UpdateArticleStatusOption) => {
    const method = operation === 'delete' ? 'delete' : 'post'
    const path =
        operation === 'delete'
            ? `/articles/${id}`
            : `/articles/${id}/${operation}`

    return fetchWithRedux({
        method,
        path,
        started: updateArticleStatusStarted,
        success: updateArticleStatusSuccess,
        failure: updateArticleStatusFailure
    })
}
