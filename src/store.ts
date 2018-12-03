import { createStore, combineReducers, applyMiddleware, compose, Reducer, Middleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import homeReducer, { HomeState } from './pages/admin/home/reducer'
import editReducer, { EditState } from './pages/admin/edit/reducer'
import createReducer, { CreateState } from './pages/admin/create/reducer'
import adminReducer, { AdminState } from './pages/admin/reducer'
import loginReducer, { LoginState } from './pages/login/reducer'

export interface StoreState {
    home: HomeState
    edit: EditState
    admin: AdminState
    login: LoginState
    create: CreateState
}

const reducer: Reducer<StoreState> = combineReducers<StoreState>({
    home: homeReducer,
    edit: editReducer,
    admin: adminReducer,
    login: loginReducer,
    create: createReducer
})

const middlewares: [Middleware] = [thunkMiddleware]

const storeEnhancers = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

export default createStore(reducer, {}, storeEnhancers)
