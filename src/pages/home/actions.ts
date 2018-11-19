import { actionTypes } from './actionTypes'
import { fetchStatus } from '../../utils/fetch-status'
import { fetchHost } from '../../utils/fetch-host'

export interface HomeAction {
    type: string
    articles: []
}

export interface FetchArticlesAction {
    type: fetchStatus
    success?: any
    error?: any
}

export const addArticles = (articles: []): HomeAction => ({
    articles,
    type: actionTypes.HOME_ADD_ARTICLES
})

export const fetchArticlesStarted = (): FetchArticlesAction => ({
    type: fetchStatus.FETCH_STATUS_FAILURE
})

export const fetchArticlesSuccess = (success: any): FetchArticlesAction => ({
    success,
    type: fetchStatus.FETCH_STATUS_SUCCESS
})

export const fetchArticlesFailure = (error: any): FetchArticlesAction => ({
    error,
    type: fetchStatus.FETCH_STATUS_FAILURE
})

export const fetchArticles = () => {
    const fetchUrl = `${fetchHost}/api/v1/articles`
    const fetchHeaders: Headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    })
    return (dispatch: any) => {
        dispatch(fetchArticlesStarted())
        fetch(fetchUrl, {
            headers: fetchHeaders
        }).then((response: Response) => {
            if (response.status !== 200) {
                throw new Error(`Fail to get response with status ${response.status}`)
            }
            response.json().then((json: any) => {
                dispatch(fetchArticlesSuccess(json))
            }).catch((error: any) => {
                dispatch(fetchArticlesFailure(error))
            })
        }).catch((error) => {
            dispatch(fetchArticlesFailure(error))
        })
    }
}
