import { actionTypes } from './actionTypes'
import { <%= pascal-name %>Action } from './actions'
import { <%= pascal-name %> } from '../../../models/<%= name %>'
import { fetchStatus } from '../../../utils/fetch'

export interface <%= pascal-name %>State {
    status: fetchStatus
    <%= plural-name %>: <%= pascal-name %>[]
}

export default (
    state: <%= pascal-name %>State = {
        status: fetchStatus.SUCCESS,
        <%= plural-name %>: []
    },
    action: <%= pascal-name %>Action
): <%= pascal-name %>State => {
    switch (action.type) {
        case actionTypes.<%= const-name %>_GET_LIST_STARTED: {
            return {
                ...state,
                status: fetchStatus.LOADING
            }
        }
        case actionTypes.<%= const-name %>_GET_LIST_FAILURE: {
            return {
                ...state,
                status: fetchStatus.FAILURE
            }
        }
        case actionTypes.<%= const-name %>_GET_LIST_SUCCESS: {
            return {
                ...state,
                status: fetchStatus.SUCCESS,
                <%= plural-name %>: action.api ? action.api.results : []
            }
        }
        default: {
            return state
        }
    }
}
