import React, { FunctionComponent, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Spin, Col, Row } from 'antd'
import debounce from 'lodash.debounce'
import { StoreState } from '../../../../store'
import { RecommendBase } from '../../../../models/recommend'
import { fetchStatus } from '../../../../utils/fetch'
import {
    recommendPostCreate,
    recommendPostCreateCache,
    recommendCreateInitialize,
    RecommendCreateAction
} from '../actions'
import RecommendForm from '../../../../components/form/RecommendForm'
import { Article } from '../../../../models/article'
import {
    suggestionGet,
    SuggestionAction,
    SuggestionGetParams
} from '../../../../components/suggestion/actions'
import { apiAdminSuffix } from '../../../../utils/fetch-host'
import { useMessagePop } from '../../../../components/hooks'

interface Props extends RouteComponentProps {
    recommend: RecommendBase
    status: fetchStatus
    suggestions: Article[]
    message: string
    recommendPostCreate: (recommend: RecommendBase) => void
    recommendPostCreateCache: (recommend: RecommendBase) => void
    suggestionGet: (params: SuggestionGetParams) => void
    initRecommend: () => void
}

const RecommendCreate: FunctionComponent<Props> = props => {
    useMessagePop(props.message)

    useEffect(() => {
        return () => {
            props.initRecommend()
        }
    }, [])

    const onSuggestionSelectChange = (search: string) => {
        props.suggestionGet({
            path: `/articles${apiAdminSuffix}`,
            qs: { search }
        })
    }

    const onFormValueChange = (value: RecommendBase) => {
        props.recommendPostCreateCache({ ...value })
    }

    const onSubmit = (value: RecommendBase) => {
        props.recommendPostCreate(value)
    }

    return (
        <div>
            <h2>Recommend Create</h2>
            <Spin spinning={props.status === fetchStatus.LOADING}>
                <Row>
                    <Col offset={6} span={12}>
                        <RecommendForm
                            model="create"
                            recommend={props.recommend}
                            recommendArticles={props.suggestions}
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
    recommend: store.recommendCreate.recommend,
    status: store.recommendCreate.status,
    suggestions: store.suggestion.results,
    message: store.recommendCreate.message
})

const mapDispatchToProps = (
    dispath: Dispatch<RecommendCreateAction | SuggestionAction>
) => ({
    recommendPostCreate(recommend: RecommendBase) {
        dispath(recommendPostCreate(recommend))
    },
    recommendPostCreateCache(recommend: RecommendBase) {
        dispath(recommendPostCreateCache(recommend))
    },
    suggestionGet(params: SuggestionGetParams) {
        dispath(suggestionGet(params))
    },
    initRecommend() {
        dispath(recommendCreateInitialize())
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecommendCreate)
)
