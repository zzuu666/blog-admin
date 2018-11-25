import { actionTypes } from './actionTypes'
import { fetchWithRedux } from '../../utils/fetch'

export interface HomeAction {
    type: string
    articles: []
    success?: any
    error?: any
}

export const fetchArticlesStarted = (): HomeAction => ({
    type: actionTypes.HOME_GET_ARTICLES_STARTED,
    articles: []
})

export const fetchArticlesSuccess = (success: any): HomeAction => ({
    success,
    articles: success,
    type: actionTypes.HOME_GET_ARTICLES_SUCCESS
})

export const fetchArticlesFailure = (error: any): HomeAction => ({
    error,
    articles: [],
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
