import { actionTypes } from './actionTypes'
import { fetchWithRedux, APIBaseResponse } from '../../../utils/fetch'
import { Article } from '../../../models/article'

interface APIResponse extends APIBaseResponse {
    results?: Article[]
}

export interface HomeAction {
    type: string
    api?: APIResponse | null
}

export const fetchArticlesStarted = (): HomeAction => ({
    type: actionTypes.HOME_GET_ARTICLES_STARTED,
    api: null
})

export const fetchArticlesSuccess = (api: APIResponse): HomeAction => ({
    api,
    type: actionTypes.HOME_GET_ARTICLES_SUCCESS
})

export const fetchArticlesFailure = (api: APIResponse): HomeAction => ({
    api,
    type: actionTypes.HOME_GET_ARTICLES_FAILURE
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
