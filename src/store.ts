import { createStore, combineReducers, applyMiddleware, compose, Reducer } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducer as homeReducer } from './pages/home'
import { HomeState } from './pages/home/reducer'

export interface StoreState {
    home: HomeState
}

const reducer: Reducer<StoreState> = combineReducers<StoreState>({
    home: homeReducer
})

const middlewares: [any] = [thunkMiddleware]

const storeEnhancers = compose(
    applyMiddleware(...middlewares)
)

export default createStore(reducer, {}, storeEnhancers)
