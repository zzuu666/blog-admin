import { createStore, combineReducers, applyMiddleware, compose, Reducer, Middleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import homeReducer, { HomeState } from './pages/admin/home/reducer'
import editReducer, { EditState } from './pages/admin/edit/reducer'
import createReducer, { CreateState } from './pages/admin/create/reducer'
import categoryReducer, { CategoryState } from './pages/admin/category/reducer'
import categoryCreateReducer, { CategoryCreateState } from './pages/admin/categoryCreate/reducer'
import categoryEditReducer, { CategoryEditState } from './pages/admin/categoryEdit/reducer'
import adminReducer, { AdminState } from './pages/admin/reducer'
import loginReducer, { LoginState } from './pages/login/reducer'

export interface StoreState {
    home: HomeState
    edit: EditState
    admin: AdminState
    login: LoginState
    create: CreateState,
    category: CategoryState,
    categoryCreate: CategoryCreateState,
    categoryEdit: CategoryEditState
}

const reducer: Reducer<StoreState> = combineReducers<StoreState>({
    home: homeReducer,
    edit: editReducer,
    admin: adminReducer,
    login: loginReducer,
    create: createReducer,
    category: categoryReducer,
    categoryCreate: categoryCreateReducer,
    categoryEdit: categoryEditReducer
})

const middlewares: [Middleware] = [thunkMiddleware]

const storeEnhancers = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

export default createStore(reducer, {}, storeEnhancers)
