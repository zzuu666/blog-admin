import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    Reducer,
    Middleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import homeReducer, { HomeState } from './pages/admin/home/reducer'
import editReducer, { EditState } from './pages/admin/edit/reducer'
import createReducer, { CreateState } from './pages/admin/create/reducer'
import categoryReducer, { CategoryState } from './pages/admin/category/reducer'
import categoryCreateReducer, {
    CategoryCreateState
} from './pages/admin/categoryCreate/reducer'
import categoryEditReducer, {
    CategoryEditState
} from './pages/admin/categoryEdit/reducer'
import recommendCreateReducer, {
    RecommendCreateState
} from './pages/admin/recommendCreate/reducer'
import recommendEditReducer, {
    RecommendEditState
} from './pages/admin/recommendEdit/reducer'
import adminReducer, { AdminState } from './pages/admin/reducer'
import loginReducer, { LoginState } from './pages/login/reducer'
import suggestionReducer, {
    SuggestionState
} from './components/suggestion/reducer'

import { recommendsSlice } from './slices/recommendsSlice'

export interface StoreState {
    home: HomeState
    edit: EditState
    admin: AdminState
    login: LoginState
    create: CreateState
    category: CategoryState
    categoryCreate: CategoryCreateState
    categoryEdit: CategoryEditState
    recommends: ReturnType<typeof recommendsSlice.reducer>
    recommendCreate: RecommendCreateState
    recommentEdit: RecommendEditState
    suggestion: SuggestionState
}

const reducer: Reducer<StoreState> = combineReducers<StoreState>({
    home: homeReducer,
    edit: editReducer,
    admin: adminReducer,
    login: loginReducer,
    create: createReducer,
    category: categoryReducer,
    categoryCreate: categoryCreateReducer,
    categoryEdit: categoryEditReducer,
    recommends: recommendsSlice.reducer,
    recommendCreate: recommendCreateReducer,
    recommentEdit: recommendEditReducer,
    suggestion: suggestionReducer
})

const middlewares: [Middleware] = [thunkMiddleware]

const storeEnhancers =
    process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))

export default createStore(reducer, {}, storeEnhancers)
