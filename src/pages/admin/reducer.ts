import { AppAction } from './actions'
import { actionTypes } from './actionTypes'

export interface AdminState {
    authenticate: boolean
}
export default (
    state: AdminState = { authenticate: false },
    action: AppAction
): AdminState => {
    switch (action.type) {
        case actionTypes.APP_GET_AUTH_STARTED: {
            return {
                ...state
            }
        }
        case actionTypes.APP_GET_AUTH_SUCCESS: {
            return {
                ...state,
                authenticate: true
            }
        }
        case actionTypes.APP_GET_AUTH_FAILURE: {
            return {
                ...state,
                authenticate: false
            }
        }
        default: {
            return state
        }
    }
}
