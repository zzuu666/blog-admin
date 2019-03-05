import React, { useEffect, FunctionComponent } from 'react'
import {
    recommendEditUpdate,
    recommendEditShow,
    SubmitParams,
    recommendEditCache,
    recommendEditInit
} from '../actions'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { fetchStatus } from '../../../../utils/fetch'
import { RecommendBase } from '../../../../models/recommend'
import { Article } from '../../../../models/article'
import { StoreState } from '../../../../store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Spin, Col, Row, message } from 'antd'
import RecommendForm from '../../../../components/form/RecommendForm'
import {
    suggestionGet,
    SuggestionGetParams
} from '../../../../components/suggestion/actions'
import { useMessagePop } from '../../../../components/hooks'
import { apiAdminSuffix } from '../../../../utils/fetch-host'
import debounce from 'lodash.debounce'

interface RoutePathParams {
    id: string
}
interface Props extends RouteComponentProps<RoutePathParams> {
    status: fetchStatus
    recommend: RecommendBase
    message: string
    suggestions: Article[]
    fetchOriginRecommend: (id: string) => void
    submitNewRecommend: (params: SubmitParams) => void
    fetchSuggestionArticles: (params: SuggestionGetParams) => void
    cacheRecommend: (recommend: RecommendBase) => void
    initRecommend: () => void
}

const RecommendEdit: FunctionComponent<Props> = props => {
    const {
        status,
        recommend,
        suggestions,
        match,
        fetchOriginRecommend,
        submitNewRecommend,
        cacheRecommend,
        fetchSuggestionArticles,
        initRecommend
    } = props

    useMessagePop(props.message)

    useEffect(() => {
        const id = match.params.id
        fetchOriginRecommend(id)

        return () => {
            initRecommend()
        }
    }, [])

    const onSubmit = (value: RecommendBase) => {
        const id = match.params.id
        submitNewRecommend({ id, recommend: value })
    }

    const onFormValueChange = (value: RecommendBase) => {
        cacheRecommend(value)
    }

    const onSuggestionSelectChange = (search: string) => {
        fetchSuggestionArticles({
            path: `/articles${apiAdminSuffix}`,
            qs: { search }
        })
    }

    return (
        <div>
            <h2>Recommend Edit</h2>
            <Spin spinning={status === fetchStatus.LOADING}>
                <Row>
                    <Col offset={6} span={12}>
                        <RecommendForm
                            model="edit"
                            recommend={recommend}
                            recommendArticles={suggestions}
                            onSubmit={onSubmit}
                            onFormValueChange={onFormValueChange}
                            onSuggestionSelectChange={debounce(
                                onSuggestionSelectChange,
                                400
                            )}
                        />
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

const mapStateToProps = (store: StoreState) => ({
    status: store.recommentEdit.status,
    recommend: store.recommentEdit.recommend,
    suggestions: store.suggestion.results,
    message: store.recommentEdit.message
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchOriginRecommend(id: string) {
        dispatch(recommendEditShow(id))
    },
    submitNewRecommend(params: SubmitParams) {
        dispatch(recommendEditUpdate(params))
    },
    fetchSuggestionArticles(params: SuggestionGetParams) {
        dispatch(suggestionGet(params))
    },
    cacheRecommend(params: RecommendBase) {
        dispatch(recommendEditCache(params))
    },
    initRecommend() {
        dispatch(recommendEditInit())
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecommendEdit)
)
