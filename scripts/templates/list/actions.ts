import { actionTypes } from './actionTypes'
import { <%= pascal-name %> } from '../../../models/<%= name %>'
import { fetchStatus, fetchWithRedux, APIBaseResponse } from '../../../utils/fetch'

interface <%= pascal-name %>API extends APIBaseResponse {
    results: <%= pascal-name %>[]
}

export interface <%= pascal-name %>Action {
    type: actionTypes,
    status: fetchStatus,
    api?: <%= pascal-name %>API
}

export const fetch<%= pascal-plural-name %>Started = (): <%= pascal-name %>Action => ({
    type: actionTypes.<%= const-name %>_GET_LIST_STARTED,
    status: fetchStatus.LOADING
})

export const fetch<%= pascal-plural-name %>Failure = (): <%= pascal-name %>Action => ({
    type: actionTypes.<%= const-name %>_GET_LIST_FAILURE,
    status: fetchStatus.FAILURE
})

export const fetch<%= pascal-plural-name %>Success = (api: <%= pascal-name %>API): <%= pascal-name %>Action => ({
    api,
    type: actionTypes.<%= const-name %>_GET_LIST_SUCCESS,
    status: fetchStatus.SUCCESS
})

export const fetch<%= pascal-plural-name %> = () => {
    return fetchWithRedux({
        method: 'get',
        path: '/categories',
        started: fetch<%= pascal-plural-name %>Started,
        success: fetch<%= pascal-plural-name %>Success,
        failure: fetch<%= pascal-plural-name %>Failure
    })
}
