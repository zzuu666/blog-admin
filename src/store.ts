import { createStore, combineReducers, applyMiddleware, compose, Reducer, Middleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer as homeReducer } from './pages/admin/home'
import { reducer as editReducer } from './pages/admin/edit'
import adminReducer, { AdminState } from './pages/admin/reducer'
import { HomeState } from './pages/admin/home/reducer'
import { EditState } from './pages/admin/edit/reducer'

export interface StoreState {
    home: HomeState
    edit: EditState
    admin: AdminState
}

const reducer: Reducer<StoreState> = combineReducers<StoreState>({
    home: homeReducer,
    edit: editReducer,
    admin: adminReducer
})

const middlewares: [Middleware] = [thunkMiddleware]

const storeEnhancers = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

export default createStore(reducer, {}, storeEnhancers)
