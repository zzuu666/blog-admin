import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducer as homeReducer } from './pages/home'

const reducer = combineReducers({
    home: homeReducer
})

const middlewares: [any] = [thunkMiddleware]

const storeEnhancers = compose(
    applyMiddleware(...middlewares)
)

export default createStore(reducer, {}, storeEnhancers)
