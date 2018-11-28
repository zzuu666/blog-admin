import { LoginAction } from './actions'
import { actionTypes } from './actionTypes'

export interface LoginState {
    token: string
}
export default (
    state: LoginState = { token: '' },
    action: LoginAction
): LoginState => {
    switch (action.type) {
        case actionTypes.LOGIN_GET_AUTH_STARTED: {
            return {
                ...state,
                token: ''
            }
        }
        case actionTypes.LOGIN_GET_AUTH_FAILURE: {
            return {
                ...state,
                token: ''
            }
        }
        case actionTypes.LOGIN_GET_AUTH_SUCCESS: {
            return {
                ...state,
                token: action.api ? action.api.token : ''
            }
        }
        default: {
            return state
        }
    }
}
