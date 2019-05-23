import { HomeAction } from './actions'
import { actionTypes } from './actionTypes'
import { Article } from '../../../models/article'
import { fetchStatus } from '../../../utils/fetch'
import { messageType } from '../../../utils/message-type'

export interface HomeState {
    articles: Article[]
    total: number
    status: fetchStatus
    message: string
    messageType: messageType
}
export default (
    state: HomeState = {
        articles: [],
        total: 0,
        status: fetchStatus.SUCCESS,
        message: '',
        messageType: messageType.INFO
    },
    action: HomeAction
): HomeState => {
    switch (action.type) {
        case actionTypes.HOME_GET_ARTICLES_STARTED:
        case actionTypes.HOME_GET_ARTICLES_FAILURE:
        case actionTypes.HOME_GET_ARTICLES_SUCCESS: {
            return {
                ...state,
                articles: action.payload.articles
                    ? action.payload.articles
                    : state.articles,
                status: action.payload.status,
                message: action.payload.message || state.message,
                messageType: action.payload.messageType || state.messageType
            }
        }
        case actionTypes.HOME_DISCARD_ARTICLE_STARTED:
        case actionTypes.HOME_DISCARD_ARTICLE_FAILURE:
        case actionTypes.HOME_DISCARD_ARTICLE_SUCCESS: {
            return {
                ...state,
                articles: action.payload.article
                    ? state.articles.filter(
                          /* eslint-disable @typescript-eslint/no-non-null-assertion */
                          article => article.id !== action.payload.article!.id
                          /* eslint-enable @typescript-eslint/no-non-null-assertion */
                      )
                    : state.articles,
                status: action.payload.status,
                message: action.payload.message || state.message,
                messageType: action.payload.messageType || state.messageType
            }
        }
        default: {
            return state
        }
    }
}
