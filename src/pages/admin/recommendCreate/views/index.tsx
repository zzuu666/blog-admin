import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { StoreState } from '../../../../store'
import { RecommendBase } from '../../../../models/recommend'
import { fetchStatus } from '../../../../utils/fetch'
import { recommendPostCreate } from '../actions'
import RecommendForm from '../../../../components/form/RecommendForm'
import { Spin, Col, Row } from 'antd'
import { Article } from '../../../../models/article'
import {
    suggestionGet,
    SuggestionGetParams
} from '../../../../components/suggestion/actions'
import { apiAdminSuffix } from '../../../../utils/fetch-host'

interface Props extends RouteComponentProps {
    recommend: RecommendBase
    status: fetchStatus
    suggestions: Article[]
    recommendPostCreate: (recommend: RecommendBase) => void
    suggestionGet: (params: SuggestionGetParams) => void
}

const RecommendCreate: FunctionComponent<Props> = props => {
    const { recommend, suggestions, suggestionGet } = props

    const onSuggestionSelectChange = (search: string) => {
        suggestionGet({
            path: `/articles${apiAdminSuffix}`,
            qs: { search }
        })
    }

    return (
        <div>
            <h2>Recommend Create</h2>
            <Spin spinning={status === fetchStatus.LOADING}>
                <Row>
                    <Col offset={6} span={12}>
                        <RecommendForm
                            model="create"
                            recommend={recommend}
                            recommendArticles={suggestions}
                            onSuggestionSelectChange={onSuggestionSelectChange}
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
    suggestions: store.suggestion.results
})

const mapDispatchToProps = (dispath: Dispatch<any>) => ({
    recommendPostCreate(recommend: RecommendBase) {
        dispath(recommendPostCreate(recommend))
    },
    suggestionGet(params: SuggestionGetParams) {
        dispath(suggestionGet(params))
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecommendCreate)
)
