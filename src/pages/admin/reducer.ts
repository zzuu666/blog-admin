import { AppAction } from './actions'
import { actionTypes } from './actionTypes'
import { fetchStatus } from '../../utils/fetch'

export interface AdminState {
    authenticate: boolean
    status: fetchStatus
}
export default (
    state: AdminState = { authenticate: false, status: fetchStatus.LOADING },
    action: AppAction
): AdminState => {
    switch (action.type) {
        case actionTypes.APP_GET_AUTH_STARTED: {
            return {
                ...state,
                status: fetchStatus.LOADING
            }
        }
        case actionTypes.APP_GET_AUTH_SUCCESS: {
            return {
                ...state,
                authenticate: true,
                status: fetchStatus.SUCCESS
            }
        }
        case actionTypes.APP_GET_AUTH_FAILURE: {
            return {
                ...state,
                authenticate: false,
                status: fetchStatus.FAILURE
            }
        }
        default: {
            return state
        }
    }
}
