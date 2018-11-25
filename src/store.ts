import { createStore, combineReducers, applyMiddleware, compose, Reducer, Middleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer as homeReducer } from './pages/home'
import { reducer as editReducer } from './pages/edit'
import { HomeState } from './pages/home/reducer'
import { EditState } from './pages/edit/reducer'

export interface StoreState {
    home: HomeState,
    edit: EditState
}

const reducer: Reducer<StoreState> = combineReducers<StoreState>({
    home: homeReducer,
    edit: editReducer
})

const middlewares: [Middleware] = [thunkMiddleware]

const storeEnhancers = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

export default createStore(reducer, {}, storeEnhancers)
